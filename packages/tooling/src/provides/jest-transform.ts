/* eslint-disable unicorn/prefer-module */
import { SyncTransformer } from '@jest/transform';

import { Transpiler } from '../utils';

const transpiler = Transpiler.deserialize(
  process.env.TRANSPILER_SETTINGS || '{}',
  null
);

const transformer: SyncTransformer = {
  canInstrument: false,
  process(contents, filename) {
    const transpilation = transpiler.transpile(filename, contents);
    return { code: transpilation, map: null };
  }
};

const _module: any = module;
_module.exports = transformer;
