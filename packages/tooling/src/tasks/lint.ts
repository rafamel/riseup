import { Deep, Empty, Serial } from 'type-core';
import { merge } from 'merge-strategies';
import { context, exec, finalize, create, Task, isLevelActive } from 'kpo';
import up from 'find-up';
import path from 'path';
import {
  getTypeScriptPath,
  temporal,
  constants,
  intercept
} from '@riseup/utils';
import { hydrateToolingGlobal } from '../global';
import { defaults } from '../defaults';
import { paths } from '../paths';

export interface LintParams {
  dir?: string | string[];
  types?: boolean;
}

export interface LintOptions extends LintParams {
  prettier?: boolean;
  extensions?: {
    js?: string[];
    ts?: string[];
  };
}

export interface LintConfig {
  eslint: Serial.Object;
  typescript: Serial.Object;
}

export function hydrateLint(
  options: LintOptions | Empty
): Deep.Required<LintOptions> {
  return merge(
    {
      ...hydrateToolingGlobal(options),
      dir: defaults.lint.dir,
      types: defaults.lint.types
    },
    options || undefined
  );
}

export function lint(
  options: LintOptions | Empty,
  config: LintConfig
): Task.Async {
  const opts = hydrateLint(options);

  return context(
    { args: [] },
    finalize(
      temporal(
        {
          ext: 'json',
          content: JSON.stringify(config.eslint),
          overrides: [
            '.eslintrc.js',
            '.eslintrc.cjs',
            '.eslintrc.yaml',
            '.eslintrc.yml',
            '.eslintrc.json'
          ]
        },
        async ([file]) => {
          return exec(constants.node, [
            paths.bin.eslint,
            ...(Array.isArray(opts.dir) ? opts.dir : [opts.dir]),
            ...['--config', file],
            ...[
              '--ext',
              [...opts.extensions.js, ...opts.extensions.ts]
                .map((x) => '.' + x)
                .join(',')
            ],
            ...['--resolve-plugins-relative-to', paths.riseup.tooling]
          ]);
        }
      ),
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

            return exec(constants.node, [
              paths.bin.prettier,
              ...['--check', '--ignore-unknown'],
              ...(ignore ? ['--ignore-path', ignore] : []),
              ...(isLevelActive('debug', ctx) ? [] : ['--loglevel=warn']),
              ...dirs
            ]);
          })
        : null,
      create((ctx) => {
        if (!opts.types || !getTypeScriptPath(ctx.cwd)) {
          return null;
        }

        const dir = Array.isArray(opts.dir) ? opts.dir : [opts.dir];
        const tsconfig = {
          ...config.typescript,
          include: dir.map((x) => path.resolve(ctx.cwd, x))
        };
        const project = path.resolve(ctx.cwd, 'tsconfig.lint.json');
        return intercept(
          {
            path: project,
            content: JSON.stringify(tsconfig),
            require: 'json'
          },
          paths.bin.typescript,
          [
            ...['--noEmit', '--emitDeclarationOnly', 'false'],
            ...['--project', project]
          ]
        );
      })
    )
  );
}
