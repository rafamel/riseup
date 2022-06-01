/* eslint-disable unicorn/prefer-module */
import path from 'node:path';
import resolve from 'resolve-from';

import { Transpiler } from '../transpile';

const transpiler = Transpiler.deserialize(
  process.env.TRANSPILER_SETTINGS || '{}',
  null
);

interface Options {
  basedir: string;
  moduleDirectory: string[];
  paths: string[];
  rootDir: string[];
  defaultResolver(request: string, options: Options): string;
}

function resolver(request: string, options: Options): string {
  try {
    return options.basedir
      ? resolve(options.basedir, request)
      : require.resolve(request);
  } catch (_) {
    const resolution = transpiler.resolve(
      request,
      options.basedir ? path.join(options.basedir, 'parent') : null
    );
    return resolution
      ? resolution.path
      : options.defaultResolver(request, options);
  }
}

const _module: any = module;
_module.exports = resolver;
