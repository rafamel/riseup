/* eslint-disable regexp/no-super-linear-backtracking */
import path from 'node:path';

import { edit, exec, series, tmp } from 'kpo';
import { convert } from 'tsconfig-to-swcconfig';

import project from './project.config.mjs';

const swc = convert();
const options = {
  ...swc,
  $schema: 'https://swc.rs/schema.json',
  minify: false,
  sourceMaps: true,
  module: {
    ...swc.module,
    resolveFully: false,
    ignoreDynamic: true
  },
  jsc: {
    ...swc.jsc,
    paths: {},
    keepClassNames: true,
    externalHelpers: false,
    preserveAllComments: true,
    experimental: {
      emitIsolatedDts: false
    }
  }
};

const build = series(
  tmp({ name: 'swc.json', content: options }, ({ files }) => {
    return exec('swc', [
      ...['./src', '-d', project.build.destination],
      ...['--delete-dir-on-start', '--strip-leading-paths', '--copy-files'],
      ...['--config-file', files[0]]
    ]);
  }),
  exec('tsc', [
    ...['--noEmit', 'false', '--emitDeclarationOnly', 'true'],
    ...['--declaration', '--declarationMap', 'false'],
    ...['--project', './config/tsconfig.build.json'],
    ...['--outDir', project.build.destination]
  ]),
  exec('tsc-alias', [
    ...['--resolve-full-paths'],
    ...['--project', './tsconfig.json'],
    ...['--outDir', project.build.destination]
  ]),
  edit(
    path.join(project.build.destination, '**/*.js'),
    ({ buffer }) => {
      return String(buffer)
        .replace(
          /(import\s+.+\s+from\s+['"])(.+\.json)(['"]);/g,
          `$1$2$3 with { type: "json" };`
        )
        .replace(
          /import\((["'].*\.json["'])\)/g,
          'import($1, { with: { type: "json" } })'
        );
    },
    { glob: true }
  )
);

export { options as default, build };
