import path from 'node:path';
import fs from 'node:fs';

import { glob } from 'glob';
import { type Task, copy, create, isCancelled, series, tmp } from 'kpo';

import { getMonorepoRootDir, getPackageRootDir } from '@riseup/utils';

export function tmpProjectCreate(
  callback: (directory: string) => Task
): Task.Async {
  return create(async (ctx) => {
    const packageRoot = getPackageRootDir(ctx.cwd);
    const projectRoot = getMonorepoRootDir(ctx.cwd) || packageRoot;
    if (!packageRoot || !projectRoot) {
      throw new Error(`Could not locate project root directory: ${ctx.cwd}`);
    }
    if (path.relative(ctx.cwd, packageRoot)) {
      throw new Error(`Could not locate package at: ${ctx.cwd}`);
    }

    const projectFiles = await glob('**/*', {
      cwd: projectRoot,
      absolute: true,
      nodir: true,
      ignore: {
        childrenIgnored: (location) => location.name === 'node_modules'
      }
    });

    return tmp(null, ({ directory }) => {
      return series(
        // Copy project on temp directory
        copy(projectFiles, directory, {
          glob: true,
          single: false,
          strict: true,
          exists: 'error',
          from: projectRoot
        }),
        // Link node_modules
        create(async (ctx) => {
          const locations = await glob('**/node_modules', {
            absolute: false,
            cwd: projectRoot,
            ignore: {
              childrenIgnored: (location) => location.name === 'node_modules'
            }
          });
          if (isCancelled(ctx)) return;

          for (const location of locations) {
            const nodeModulesPath = path.resolve(projectRoot, location);
            const nodeModulesDest = path.resolve(directory, location);
            const nodeModulesExist = await fs.promises
              .access(nodeModulesPath, fs.constants.F_OK)
              .then(
                () => true,
                () => false
              );
            if (isCancelled(ctx)) return;

            if (nodeModulesExist) {
              await fs.promises.symlink(
                nodeModulesPath,
                nodeModulesDest,
                'dir'
              );
              if (isCancelled(ctx)) return;
            }
          }
        }),
        // Run callback's Task
        create(() => {
          return callback(
            path.join(directory, path.relative(projectRoot, packageRoot))
          );
        })
      );
    });
  });
}
