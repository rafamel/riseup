import path from 'node:path';

import type { Options } from 'tsup';
import { exec, run } from 'kpo';
import { glob } from 'glob';

import project from './project.config.mjs';
import riseup from './riseup.config.mjs';

const extensions = project.extensions;
const destination = project.build.destination;
export default async (): Promise<Options> => ({
  entry: await glob([`./src/**/*.{${extensions.source.join(',')}}`], {
    ignore: ['**/*.{test,spec}.*'],
    nodir: true
  }),
  outDir: destination,
  target: 'es2022',
  format: 'esm',
  dts: true,
  clean: false,
  watch: false,
  minify: false,
  bundle: true,
  sourcemap: true,
  splitting: true,
  skipNodeModulesBundle: true,
  esbuildPlugins: [
    {
      name: 'bundle-content',
      setup(build) {
        build.onResolve({ filter: /.*/ }, async ({ path: file, importer }) => {
          if (!importer) return;
          const extension = path.extname(file).substring(1);
          const external = !extension || extensions.source.includes(extension);
          return { external };
        });
      }
    }
  ],
  plugins: [
    {
      name: 'contents',
      buildStart: () => run(null, riseup.tasks.contents)
    },
    {
      name: 'paths-resolve',
      buildEnd() {
        const task = exec('tsc-alias', [
          ...['--project', './tsconfig.json', '--outDir', this.options.outDir],
          ...['--resolve-full-paths']
        ]);
        return run(null, task);
      }
    }
  ]
});
