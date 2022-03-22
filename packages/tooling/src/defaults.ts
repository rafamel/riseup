import { Deep } from 'type-core';

import { Tooling } from './Tooling';
import { Builder, Transpiler } from './transpile';

export const defaults: Deep.Required<Tooling.Options> = {
  global: {
    prettier: true,
    ...Builder.options,
    ...Transpiler.options
  },
  build: {
    ...Builder.params
  },
  node: {
    ...Transpiler.params
  },
  lint: {
    dir: ['src/', 'test/'],
    types: true,
    react: true,
    highlight: ['fixme', 'todo', 'refactor'],
    rules: {}
  },
  test: {
    verbose: false,
    ignore: [],
    require: [],
    coverage: 'auto',
    threshold: null,
    overrides: {},
    ...Transpiler.params
  }
};
