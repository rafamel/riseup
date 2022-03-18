import { Deep, Dictionary, UnaryFn } from 'type-core';
import { Options, build } from 'tsup';

import { Transpile } from './@definitions';
import { Extensions } from './Extensions';
import { Transpiler } from './Transpiler';

export declare namespace Builder {
  interface Settings {
    params: Params;
    options: Options;
  }
  interface Params {
    clean?: boolean;
    outdir?: string;
    entries?: string[] | Dictionary<string>;
    formats?: Format[];
    targets?: string[];
    bundle?: boolean;
    minify?: boolean;
    splitting?: boolean;
    sourcemap?: Sourcemap;
    exclude?: RegExp | boolean;
    env?: Dictionary<string>;
  }
  interface Options {
    platform?: Transpile.Platform;
    loaders?: Transpile.Loaders;
    jsx?: Transpile.JSX | null;
  }
  type Format = 'module' | 'commonjs' | 'iife';
  type Sourcemap = 'inline' | 'external' | 'none';
}

export class Builder implements Builder.Settings {
  public static options: Deep.Required<Builder.Options> = {
    platform: Transpiler.options.platform,
    loaders: Transpiler.options.loaders,
    jsx: Transpiler.options.jsx
  };
  public static params: Deep.Required<Builder.Params> = {
    clean: false,
    outdir: 'build/',
    entries: [],
    formats: ['commonjs', 'module'],
    targets: ['node16'],
    bundle: true,
    minify: false,
    splitting: false,
    sourcemap: 'external',
    exclude: true,
    env: {}
  };
  public static serialize(instance: Builder | Builder.Settings): string {
    const { params, options } = instance;

    return JSON.stringify({
      params: {
        ...params,
        exclude:
          params.exclude instanceof RegExp
            ? [params.exclude.source, params.exclude.flags]
            : params.exclude
      },
      options
    });
  }
  public static deserialize<T = Builder>(
    serialization: string,
    projection: UnaryFn<Builder.Settings, T> | null
  ): T {
    const { params, options } = JSON.parse(serialization);
    const settings = {
      params: {
        ...params,
        exclude: Array.isArray(params.exclude)
          ? new RegExp(params.exclude[0], params.exclude[1])
          : params.exclude
      },
      options
    };
    return (
      projection
        ? projection(settings)
        : new Builder(settings.params, settings.options)
    ) as T;
  }
  #loaders: Extensions<Transpile.Loader>;
  #configuration: Options;
  public params: Required<Builder.Params>;
  public options: Required<Builder.Options>;
  public constructor(params: Builder.Params, options: Builder.Options | null) {
    const defaultParams = Builder.params;
    const defaultOptions = Builder.options;

    this.params = Object.freeze({
      clean:
        typeof params.clean === 'boolean' ? params.clean : defaultParams.clean,
      outdir: params.outdir || defaultParams.outdir,
      entries: params.entries || defaultParams.entries,
      formats: params.formats || defaultParams.formats,
      targets: params.targets || defaultParams.targets,
      bundle:
        typeof params.bundle === 'boolean'
          ? params.bundle
          : defaultParams.bundle,
      minify:
        typeof params.minify === 'boolean'
          ? params.minify
          : defaultParams.minify,
      splitting:
        typeof params.splitting === 'boolean'
          ? params.splitting
          : defaultParams.splitting,
      sourcemap: params.sourcemap || defaultParams.sourcemap,
      exclude:
        params.exclude === undefined ? defaultParams.exclude : params.exclude,
      env: params.env || defaultParams.env
    });

    const loaders = new Extensions({
      ...defaultOptions.loaders,
      ...options?.loaders
    });
    this.options = Object.freeze({
      platform: options?.platform || defaultOptions.platform,
      loaders: loaders.rules(),
      jsx: options?.jsx || defaultOptions.jsx
    });

    this.#loaders = loaders;
    this.#configuration = this.configure(this.params, this.options);
  }
  public extensions(
    include: Transpile.Loader[] | null,
    exclude: Transpile.Loader[] | null
  ): string[] {
    return this.#loaders.select(include, exclude).extensions();
  }
  public async build(): Promise<void> {
    await build(this.#configuration);
  }
  private configure(
    params: Required<Builder.Params>,
    options: Required<Builder.Options>
  ): Options {
    const arr = Array.isArray(params.entries)
      ? params.entries
      : Object.keys(params.entries);
    if (arr.length <= 0) {
      throw new Error(`Missing build entries`);
    }
    if (params.formats.length <= 0) {
      throw new Error(`Missing build formats`);
    }
    if (params.targets.length <= 0) {
      throw new Error(`Missing build targets`);
    }

    return {
      // Defaults
      dts: true,
      watch: false,
      // Options
      platform: options.platform as 'node',
      loader: options.loaders,
      ...(options.jsx?.factory ? { jsxFactory: options.jsx.factory } : {}),
      ...(options.jsx?.fragment ? { jsxFragment: options.jsx.fragment } : {}),
      // Params
      clean: params.clean,
      outDir: params.outdir,
      entry: params.entries,
      format: params.formats.map((format) => {
        return format === 'commonjs'
          ? 'cjs'
          : format === 'module'
          ? 'esm'
          : format;
      }),
      target: params.targets,
      bundle: params.bundle,
      minify: params.minify,
      splitting: params.splitting,
      sourcemap:
        params.sourcemap === 'external'
          ? true
          : params.sourcemap === 'none'
          ? false
          : params.sourcemap,
      skipNodeModulesBundle: params.exclude === true,
      external:
        typeof params.exclude === 'boolean'
          ? undefined
          : [
              new RegExp(
                '.*(' + params.exclude.source + ').*',
                params.exclude.flags
              )
            ],
      noExternal:
        typeof params.exclude === 'boolean'
          ? params.exclude === true
            ? undefined
            : [/.*/]
          : [
              new RegExp(
                '^(?!(.*(' + params.exclude.source + ').*)$)',
                params.exclude.flags
              )
            ],
      env: params.env
    };
  }
}
