import { Deep, Serial, UnaryFn } from 'type-core';
import path from 'node:path';
import { buildSync, BuildOptions } from 'esbuild';

import { Transpile } from './@definitions';
import { Extensions } from './Extensions';
import { createPositiveRegex, getExternalPatterns } from './helpers/patterns';
import { SHIMS_ESM_PATH } from './constants';

export declare namespace Transpiler {
  interface Settings {
    params: Params;
    options: Options;
  }
  interface Params {
    format?: Format;
    include?: string[] | null;
    exclude?: string[];
  }
  interface Options {
    platform?: Transpile.Platform;
    loaders?: Transpile.Loaders;
    stubs?: Stubs;
    jsx?: Transpile.JSX;
  }
  type Format = 'module' | 'commonjs';
  type Stubs = { [extensions: string]: Serial.Type };
}

export class Transpiler implements Transpiler.Settings {
  public static options: Deep.Required<Transpiler.Options> = {
    platform: 'neutral',
    loaders: {
      '.js,.cjs,.mjs': 'js',
      '.jsx': 'jsx',
      '.ts,.cts,.mts': 'ts',
      '.tsx': 'tsx',
      '.json': 'json'
    },
    stubs: {},
    jsx: {
      factory: 'React.createElement',
      fragment: 'React.Fragment'
    }
  };
  public static params: Deep.Required<Transpiler.Params> = {
    format: 'commonjs',
    include: ['*'],
    exclude: []
  };
  public static serialize(instance: Transpiler | Transpiler.Settings): string {
    const { params, options } = instance;

    return JSON.stringify({ params, options });
  }
  public static deserialize<T = Transpiler>(
    serialization: string,
    projection: UnaryFn<Transpiler.Settings, T> | null
  ): T {
    const { params, options } = JSON.parse(serialization);
    const settings = { params, options };
    return (
      projection
        ? projection(settings)
        : new Transpiler(settings.params, settings.options)
    ) as T;
  }
  #extensions: Extensions<Transpile.Loader | 'stub'>;
  #resolves: BuildOptions;
  #transpiles: BuildOptions;
  #exclude: UnaryFn<string, boolean>;
  #stub: UnaryFn<string, string | null>;
  public params: Required<Transpiler.Params>;
  public options: Required<Transpiler.Options>;
  public constructor(
    params: Transpiler.Params,
    options: Transpiler.Options | null
  ) {
    const defaultParams = Transpiler.params;
    const defaultOptions = Transpiler.options;

    this.params = Object.freeze({
      format: params.format || defaultParams.format,
      include:
        params.include === null
          ? null
          : params.include || defaultParams.include,
      exclude: params.exclude || defaultParams.exclude
    });

    this.options = Object.freeze({
      platform: options?.platform || defaultOptions.platform,
      loaders: new Extensions({
        ...defaultOptions.loaders,
        ...options?.loaders
      }).rules(),
      stubs: new Extensions({
        ...defaultOptions.stubs,
        ...options?.stubs
      }).rules(),
      jsx: options?.jsx || defaultOptions.jsx
    });

    // Extensions
    this.#extensions = Extensions.merge(
      new Extensions(this.options.loaders),
      new Extensions(this.options.stubs).map(() => 'stub' as const)
    );

    // Resolution options
    this.#resolves = {
      ...this.configure(this.params, {
        ...this.options,
        platform: 'neutral',
        stubs: {},
        loaders: this.#extensions.map(() => 'text' as const).rules()
      }),
      bundle: true,
      metafile: true,
      sourcemap: false
    };

    // Transpilation options
    this.#transpiles = {
      ...this.configure(this.params, {
        ...this.options,
        stubs: {},
        loaders: this.#extensions.exclude('stub').exclude('file').rules()
      }),
      bundle: false,
      metafile: false,
      sourcemap: 'inline'
    };

    // Excludes
    const include = this.params.include
      ? createPositiveRegex(this.params.include, this.params.exclude)
      : createPositiveRegex(
          ['*'],
          [...this.params.exclude, ...getExternalPatterns('*', '*')]
        );
    this.#exclude = (filename) => !include.test(filename);

    // Stubs
    const stubs = {
      ...this.#extensions
        .select(['file'], null)
        .map(() => {
          return this.params.format === 'commonjs'
            ? `module.exports = __filename;`
            : `
                import { fileURLToPath } from 'node:url';
                export default fileURLToPath(import.meta.url);
              `;
        })
        .rules(),
      ...new Extensions(this.options.stubs)
        .map((_, stub) => {
          const source = JSON.stringify(stub);
          const str = `JSON.parse(${JSON.stringify(source)})`;
          return this.params.format === 'commonjs'
            ? `module.exports = ${str};`
            : `export default ${str};`;
        })
        .rules()
    };
    this.#stub = (filename) => {
      const ext = path.extname(filename);
      const stub = stubs[ext];
      return typeof stub === 'string' ? stub : null;
    };
  }
  public extensions(
    include: Array<Transpile.Loader | 'stub'> | null,
    exclude: Array<Transpile.Loader | 'stub'> | null
  ): string[] {
    return this.#extensions.select(include, exclude).extensions();
  }
  public resolve(request: string, parent: string | null): string | null {
    let cwd: string;
    let specifier: string;

    if (parent) {
      cwd = path.dirname(parent);
      specifier = request;
    } else {
      if (!path.isAbsolute(request)) {
        throw new Error(
          `Request must be an absolute path when no parent is provided`
        );
      }
      cwd = path.dirname(request);
      specifier = './' + path.basename(request);
    }

    let result: ReturnType<typeof buildSync>;
    try {
      result = buildSync({
        ...this.#resolves,
        absWorkingDir: cwd,
        stdin: {
          loader: 'js',
          contents: `import ${JSON.stringify(specifier)};`,
          resolveDir: cwd
        }
      });
    } catch (_) {
      return null;
    }

    const relatives = Object.getOwnPropertyNames(result.metafile?.inputs || {});
    if (relatives.length !== 2) {
      throw new Error(`Required input metadata mismatch: ${relatives.length}`);
    }

    const filename = cwd ? path.resolve(cwd, relatives[0]) : relatives[0];
    return this.#exclude(filename) ? null : filename;
  }
  public transpile<T extends string | null>(
    filename: string,
    contents: T
  ): string | T {
    if (this.#exclude(filename)) return contents;

    const stub = this.#stub(filename);
    if (stub !== null) return stub;

    const result = buildSync({
      ...this.#transpiles,
      ...(typeof contents === 'string'
        ? {
            stdin: {
              contents,
              sourcefile: filename,
              loader:
                (this.#transpiles.loader || {})[path.extname(filename)] ||
                undefined
            }
          }
        : { entryPoints: [filename] }),
      ...(this.params.format === 'commonjs'
        ? { define: { 'import.meta.url': '__IMPORT_META_URL__' } }
        : { inject: [SHIMS_ESM_PATH] })
    });

    const warn = result.warnings[0];
    if (warn) {
      throw new Error(`${warn.text}\n\t${warn.location}`);
    }

    if (!result.outputFiles || result.outputFiles.length !== 1) {
      const length = result.outputFiles?.length || 0;
      throw new Error(`Required transpilation mismatch: ${length}`);
    }

    return this.shims(result.outputFiles[0].text);
  }
  private shims(contents: string): string {
    switch (this.params.format) {
      case 'commonjs': {
        return contents
          .replace(
            /__IMPORT_META_URL__/g,
            `require('node:url').pathToFileURL(__filename).href`
          )
          .replace(
            /^ *var __toESM *=/m,
            `var __toESM = (mod, ...args) => typeof mod === 'object' &&
              mod.__esModule ? mod : __rToESM(mod,...args); var __rToESM =`
          );
      }
      default: {
        return contents;
      }
    }
  }
  private configure(
    params: Required<Transpiler.Params>,
    options: Required<Transpiler.Options>
  ): BuildOptions {
    return {
      // Resets
      bundle: false,
      metafile: false,
      sourcemap: false,
      absWorkingDir: undefined,
      entryPoints: undefined,
      external: undefined,
      stdin: undefined,
      // Defaults
      write: false,
      outdir: undefined,
      splitting: false,
      logLevel: 'silent',
      target: [`node${process.versions.node}`],
      minify: false,
      treeShaking: false,
      // Params
      format: params.format === 'commonjs' ? 'cjs' : 'esm',
      // Options
      platform: options.platform === 'browser' ? 'neutral' : options.platform,
      loader: options.loaders,
      ...(options.jsx?.factory ? { jsxFactory: options.jsx.factory } : {}),
      ...(options.jsx?.fragment ? { jsxFragment: options.jsx.fragment } : {})
    };
  }
}
