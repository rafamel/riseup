import { fileURLToPath, pathToFileURL } from 'node:url';

import { Transpiler } from './Transpiler';

export declare namespace Loader {
  type Resolve<R = Resolve.Response | Promise<Resolve.Response>> = (
    specifier: string,
    context: Resolve.Context,
    resolve: Resolve<R>
  ) => R;
  namespace Resolve {
    type Context = { parentURL?: string; conditions: string[] };
    type Response = { url: string; format?: Format | null };
    type Source = string | ArrayBuffer | Int8Array;
    type Format = 'builtin' | 'commonjs' | 'json' | 'module' | 'wasm';
  }

  type Load<R = Load.Response | Promise<Load.Response>> = (
    url: string,
    context: Load.Context,
    load: Load<R>
  ) => R;
  namespace Load {
    type Context = { format?: Format | null };
    type Response<S extends Source = Source> = {
      source: S;
      format: Format;
    };
    type Source = Resolve.Source;
    type Format = Resolve.Format;
  }
}

export class Loader {
  #transpiler: Transpiler;
  public constructor(
    params: Transpiler.Params,
    options: Transpiler.Options | null
  ) {
    this.#transpiler = new Transpiler(params, options);
  }
  public resolve = <R = Loader.Resolve.Response>(
    specifier: string,
    context: Loader.Resolve.Context,
    resolve: Loader.Resolve<R>
  ): Loader.Resolve.Response | R => {
    const transpiler = this.#transpiler;
    const response = context.parentURL
      ? transpiler.resolve(specifier, fileURLToPath(context.parentURL))
      : transpiler.resolve(fileURLToPath(specifier), null);
    if (!response) return resolve(specifier, context, resolve);

    const url = pathToFileURL(response).href;
    return { url, format: transpiler.params.format };
  };
  public load = <R = Loader.Load.Response>(
    url: string,
    context: Loader.Load.Context,
    load: Loader.Load<R>
  ): Loader.Load.Response<string> | R => {
    const { format } = this.#transpiler.params;

    if (format !== context.format) return load(url, context, load);

    const source = this.#transpiler.transpile(fileURLToPath(url), null);
    return source === null ? load(url, context, load) : { format, source };
  };
}
