import { Serial, TypeGuard } from 'type-core';
import path from 'node:path';
import { findUp } from 'find-up';
import { context, exec, finalize, create, Task, isLevelActive } from 'kpo';
import {
  getTypescriptConfigPath,
  getOverridePath,
  safeJsonSerialize
} from '@riseup/utils';

import { defaults } from '../defaults';
import { paths } from '../paths';
import { Extensions, Transpile } from '../transpile';

export interface LintParams {
  dir?: string | string[];
  types?: boolean;
}

export interface LintOptions {
  prettier?: boolean;
  loaders?: Transpile.Loaders;
}

export interface LintConfigurations {
  eslint: Serial.Object;
}

export function lint(
  params: LintParams | null,
  options: LintOptions | null,
  configurations: LintConfigurations
): Task.Async {
  const opts = {
    dir: params?.dir || defaults.lint.dir,
    types: TypeGuard.isBoolean(params?.types)
      ? params?.types
      : defaults.lint.types,
    prettier: TypeGuard.isBoolean(options?.prettier)
      ? options?.prettier
      : defaults.global.prettier,
    loaders: { ...defaults.global.loaders, ...options?.loaders }
  };

  const extcode = new Extensions(opts.loaders)
    .select(['js', 'jsx', 'ts', 'tsx'], null)
    .extensions();

  return context(
    { args: [] },
    finalize(
      create((ctx) => {
        const overridePath = getOverridePath(ctx.cwd, [
          { name: '.eslintrc', ext: false },
          { name: '.eslintrc', ext: true }
        ]);
        return exec(
          process.execPath,
          [
            paths.eslintBin,
            ...(Array.isArray(opts.dir) ? opts.dir : [opts.dir]),
            ...['--config', overridePath || paths.eslintConfig],
            ...['--ext', extcode.join(',')]
          ],
          {
            env: {
              ESLINT_CONFIG: safeJsonSerialize(configurations.eslint)
            }
          }
        );
      }),
      opts.prettier
        ? create(async (ctx) => {
            const dirs = (Array.isArray(opts.dir) ? opts.dir : [opts.dir]).map(
              (dir) => {
                return dir.endsWith(path.posix.sep)
                  ? dir.slice(0, dir.lastIndexOf(path.posix.sep))
                  : dir.endsWith(path.win32.sep)
                  ? dir.slice(0, dir.lastIndexOf(path.win32.sep))
                  : dir;
              }
            );

            const ignore = await findUp('.prettierignore', {
              cwd: ctx.cwd,
              type: 'file'
            });

            return exec(process.execPath, [
              paths.prettierBin,
              ...['--check', '--ignore-unknown'],
              ...(ignore ? ['--ignore-path', ignore] : []),
              ...(isLevelActive('debug', ctx) ? [] : ['--loglevel=warn']),
              ...dirs
            ]);
          })
        : null,
      create((ctx) => {
        const tsconfig = opts.types
          ? getTypescriptConfigPath(null, ctx.cwd, false)
          : null;
        if (!tsconfig) return null;

        return exec(process.execPath, [
          paths.typescriptBin,
          ...[
            '--noEmit',
            ...['--emitDeclarationOnly', 'false'],
            ...['--incremental', 'false']
          ]
        ]);
      })
    )
  );
}
