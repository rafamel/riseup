import { Deep } from 'type-core';

import { Library } from './Library';

export const defaults: Deep.Required<Library.Options> = {
  docs: {
    name: null,
    build: true,
    source: 'src/',
    destination: 'docs/',
    overrides: {}
  },
  distribute: {
    push: true
  }
};
