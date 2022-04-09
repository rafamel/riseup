import { Deep } from 'type-core';

import { Tooling } from './Tooling';
import { Builder, Transpiler } from './transpile';

export const defaults: Deep.Required<Tooling.Options> = {
  global: {
    prettier: true,
    ...Builder.options,
    ...Transpiler.options
  },
  node: {
    ...Transpiler.params
  },
  build: {
    ...Builder.params
  },
  tarball: {
    destination: null,
    monorepo: false,
    package: null
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
