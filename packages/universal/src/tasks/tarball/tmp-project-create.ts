import path from 'node:path';
import fs from 'node:fs';

import { type Task, copy, create, series, tmp } from 'kpo';

// TODO: deal with monorepos
export function tmpProjectCreate(
  callback: (directory: string) => Task
): Task.Async {
  return tmp(null, ({ directory }) => {
    return series(
      // Copy project on temp directory
      copy('./!(node_modules)', directory, {
        glob: true,
        single: false,
        strict: true,
        exists: 'error'
      }),
      // Link node_modules
      create(async (ctx) => {
        const nodeModulesPath = path.resolve(ctx.cwd, 'node_modules');
        const nodeModulesDest = path.resolve(directory, 'node_modules');
        const nodeModulesExist = await fs.promises
          .access(nodeModulesPath, fs.constants.F_OK)
          .then(
            () => true,
            () => false
          );

        if (nodeModulesExist) {
          await fs.promises.symlink(nodeModulesPath, nodeModulesDest, 'dir');
        }
      }),
      // Run callback's Task
      create(() => callback(directory))
    );
  });
}
