import { Serial, TypeGuard } from 'type-core';
import path from 'node:path';
import up from 'find-up';
import { context, exec, Task, silence, finalize, create } from 'kpo';
import { getOverridePath, safeJsonSerialize } from '@riseup/utils';

import { defaults } from '../defaults';
import { paths } from '../paths';
import { Extensions, Transpile } from '../transpile';

export interface FixParams {
  dir?: string | string[];
}

export interface FixOptions {
  prettier?: boolean;
  loaders?: Transpile.Loaders;
}

export interface FixConfigurations {
  eslint: Serial.Object;
}

export function fix(
  params: FixParams | null,
  options: FixOptions | null,
  configurations: FixConfigurations
): Task.Async {
  const opts = {
    dir: params?.dir || defaults.lint.dir,
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
            ...[paths.eslintBin, '--fix'],
            ...(Array.isArray(opts.dir) ? opts.dir : [opts.dir]),
            ...['--config', overridePath || paths.eslintConfig],
            ...['--ext', extcode.join(',')]
          ],
          { env: { ESLINT_CONFIG: safeJsonSerialize(configurations.eslint) } }
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

            const ignore = await up('.prettierignore', {
              cwd: ctx.cwd,
              type: 'file'
            });

            return silence(
              exec(process.execPath, [
                paths.prettierBin,
                ...['--write', '--ignore-unknown'],
                ...(ignore ? ['--ignore-path', ignore] : []),
                ...dirs
              ])
            );
          })
        : null
    )
  );
}
