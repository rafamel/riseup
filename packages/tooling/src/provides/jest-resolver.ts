/* eslint-disable unicorn/prefer-module */
import path from 'node:path';

import { Transpiler } from '../utils';

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
  const response = transpiler.resolve(
    request,
    options.basedir ? path.join(options.basedir, 'parent') : null
  );
  return response || options.defaultResolver(request, options);
}

const _module: any = module;
_module.exports = resolver;
