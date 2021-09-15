import { Serial, Empty, TypeGuard, Deep } from 'type-core';
import { shallow } from 'merge-strategies';
import { v4 as uuid } from 'uuid';
import path from 'path';
import {
  create,
  context,
  exec,
  finalize,
  mkdir,
  move,
  remove,
  series,
  progress,
  Task
} from 'kpo';
import { constants, intercept } from '@riseup/utils';
import { paths } from '../paths';
import { defaults } from '../defaults';
import { hydrateLibraryGlobal } from '../global';

export interface BuildParams {
  tarball?: boolean;
}

export interface BuildOptions extends BuildParams {
  output?: string;
}

export interface BuildConfig {
  pika: Serial.Array;
  babel: Serial.Object;
}

export function hydrateBuild(
  options: BuildOptions | Empty
): Deep.Required<BuildOptions> {
  const { output } = hydrateLibraryGlobal(options);
  return shallow(
    {
      output,
      tarball: defaults.build.tarball
    },
    options || undefined
  );
}

export function build(
  options: BuildOptions | Empty,
  config: BuildConfig
): Task.Async {
  const opts = hydrateBuild(options);

  return create((ctx) => {
    return series(
      intercept(
        {
          path: path.resolve(ctx.cwd, '.babelrc'),
          content: JSON.stringify(config.babel),
          require: 'json'
        },
        paths.bin.pika,
        [
          ...['--out', opts.output],
          ...['--pipeline', JSON.stringify(config.pika)]
        ]
      ),
      create((ctx) => {
        if (!opts.tarball) return;

        const custom = TypeGuard.isString(opts.tarball);
        const dir = custom ? path.resolve(constants.tmp, uuid()) : opts.output;
        return context(
          { args: [] },
          progress(
            { message: 'Build tarball' },
            finalize(
              series(
                custom ? mkdir(dir, { ensure: false }) : null,
                exec('npm', ['pack', path.resolve(ctx.cwd, opts.output)], {
                  cwd: dir
                }),
                custom
                  ? move(
                      path.resolve(dir, '*.tgz'),
                      path.resolve(ctx.cwd, String(opts.tarball) + '.tgz'),
                      {
                        glob: true,
                        single: true,
                        strict: true,
                        exists: 'overwrite'
                      }
                    )
                  : null
              ),
              custom ? remove(dir, { strict: true, recursive: true }) : null
            )
          )
        );
      })
    );
  });
}
