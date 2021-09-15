import { Deep, Serial } from 'type-core';
import { ensure } from 'errorish';
import { context, copy, create, exec, mkdir, run, series, Task } from 'kpo';
import path from 'path';
import fs from 'fs';
import { BuilderOptions } from '@pika/types';
import { reconfigureBabelEnv } from '@riseup/tooling';
import {
  constants,
  getTypeScriptPath,
  intercept,
  temporal
} from '@riseup/utils';
import { paths } from '../../paths';
import {
  ConfigurePikaConfig,
  ConfigurePikaOptions,
  hydrateConfigurePika
} from './index';

const OUTPUT = 'dist/';

export function manifest(
  manifest: Serial.Object,
  { cwd, options: { options } }: BuilderOptions
): void {
  const opts = hydrateConfigurePika(options);
  const isTypeScript = Boolean(opts.types && getTypeScriptPath(cwd));

  manifest.main = OUTPUT;
  if (isTypeScript) manifest.types = OUTPUT;

  manifest.files = ((manifest.files || []) as string[])
    .concat(OUTPUT)
    .filter((x, i, arr) => arr.indexOf(x) === i);
}

export async function build({
  cwd,
  options: { options, config }
}: BuilderOptions): Promise<void> {
  try {
    const task = transpile(OUTPUT, hydrateConfigurePika(options), config);
    await run({ cwd }, task);
  } catch (err) {
    throw ensure(err, null, { capture: true });
  }
}

function transpile(
  dir: string,
  options: Deep.Required<ConfigurePikaOptions>,
  config: ConfigurePikaConfig
): Task.Async {
  const destination = path.join(options.output, dir);
  return context(
    { args: [] },
    series(
      mkdir(destination, { ensure: true }),
      temporal(
        {
          ext: 'json',
          content: JSON.stringify(config.babel),
          overrides: [
            'babel.config.json',
            'babel.config.js',
            'babel.config.cjs',
            'babel.config.mjs',
            '.babelrc',
            '.babelrc.json',
            '.babelrc.js',
            '.babelrc.cjs',
            '.babelrc.mjs'
          ]
        },
        ([basefile]) => {
          return temporal(
            {
              ext: 'json',
              content: JSON.stringify(
                reconfigureBabelEnv(
                  { targets: options.targets },
                  JSON.parse(String(fs.readFileSync(basefile)))
                )
              ),
              overrides: []
            },
            ([file]) => {
              return exec(constants.node, [
                paths.bin.babelCli,
                'src',
                ...['--config-file', file],
                ...['--source-maps', 'inline'],
                ...['--out-dir', destination],
                ...[
                  '--extensions',
                  [...options.extensions.js, ...options.extensions.ts]
                    .map((x) => '.' + x)
                    .join(',')
                ]
              ]);
            }
          );
        }
      ),
      create((ctx) => {
        const project = path.resolve(ctx.cwd, 'tsconfig.build.json');

        return options.types && getTypeScriptPath(ctx.cwd)
          ? intercept(
              {
                path: project,
                content: JSON.stringify(config.typescript),
                require: 'json'
              },
              paths.bin.typescript,
              [
                '--declaration',
                '--emitDeclarationOnly',
                ...['--noEmit', 'false'],
                ...['--project', project],
                ...['--outDir', destination]
              ]
            )
          : null;
      }),
      options.types
        ? copy('src/**/*.d.ts', destination, {
            glob: true,
            single: false,
            strict: false,
            exists: 'error'
          })
        : null
    )
  );
}
