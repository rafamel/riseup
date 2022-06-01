import { NullaryFn } from 'type-core';
import module from 'node:module';
import { addHook } from 'pirates';

import { Transpiler } from '../Transpiler';

export declare namespace Register {
  type Params = Omit<Transpiler.Params, 'format'>;
  type Options = Transpiler.Options;
}

export class Register {
  #transpiler: Transpiler;
  #teardowns: NullaryFn[];
  #extensions: string[];
  public constructor(
    params: Register.Params,
    options: Register.Options | null
  ) {
    this.#transpiler = new Transpiler(
      { ...params, format: 'commonjs' },
      options
    );
    this.#teardowns = [];
    this.#extensions = this.#transpiler.extensions();
  }
  public register = (): void => {
    this.unregister();

    this.#teardowns.push(this.registerResolve(), this.registerTranspile());
  };
  public unregister = (): void => {
    const teardowns = this.#teardowns;

    while (teardowns.length > 0) {
      const fn = teardowns.shift();
      if (fn) fn();
    }
  };
  private registerResolve = (): NullaryFn => {
    const transpiler = this.#transpiler;
    const resolve = transpiler.resolve.bind(transpiler);
    const { Module } = module as any;

    const resolveFilename = Module._resolveFilename;
    Module._resolveFilename = function (
      request: string,
      parent?: { filename?: string; path?: string },
      ...args: any[]
    ): string {
      try {
        return resolveFilename.call(this, request, parent, ...args);
      } catch (err) {
        const resolution = resolve(
          request,
          (parent && parent.filename) || null
        );
        if (!resolution) throw err;

        return resolution.path;
      }
    };

    return () => {
      Module._resolveFilename = resolveFilename;
    };
  };
  private registerTranspile = (): NullaryFn => {
    const transpiler = this.#transpiler;
    const extensions = this.#extensions;

    const results: Record<string, string | null> = {};

    const revertHook = addHook(
      (code, filename) => {
        return results[filename] === code
          ? code
          : transpiler.transpile(filename, code) || code;
      },
      { exts: extensions, ignoreNodeModules: false }
    );

    const { Module } = module as any;
    const extensionsJs = Module._extensions['.js'];

    Module._extensions['.js'] = function (
      module: any,
      filename: string,
      ...args: any[]
    ) {
      try {
        return extensionsJs.call(this, module, filename, ...args);
      } catch (err: any) {
        if (err.code !== 'ERR_REQUIRE_ESM') throw err;

        const result = transpiler.transpile(filename, null);
        if (!result) throw err;

        results[filename] = result;
        module._compile(result, filename);
      }
    };

    return () => {
      revertHook();
      Module._extensions['.js'] = extensionsJs;
    };
  };
}
