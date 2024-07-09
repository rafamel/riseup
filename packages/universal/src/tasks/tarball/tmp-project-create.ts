import path from 'node:path';
import fs from 'node:fs';

import { type Serial, TypeGuard, type UnaryFn } from 'type-core';
import { type Task, copy, create, edit, series, tmp } from 'kpo';

export interface TmpProjectCreateOptions {
  package: null | Serial.Object | UnaryFn<Serial.Object, Serial.Object>;
}

// TODO: deal with monorepos
export function tmpProjectCreate(
  options: TmpProjectCreateOptions,
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
      // Package deep merges
      options.package
        ? edit(
            path.join(directory, 'package.json'),
            ({ buffer }) => {
              const contents = JSON.parse(String(buffer));
              return TypeGuard.isFunction(options.package)
                ? options.package(contents)
                : { ...contents, ...options.package };
            },
            { glob: false, strict: true }
          )
        : null,
      // Run callback's Task
      create(() => callback(directory))
    );
  });
}
