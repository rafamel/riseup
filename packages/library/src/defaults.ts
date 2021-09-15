import { Deep } from 'type-core';
import { LibraryParams } from './definitions';

export const defaults: Deep.Required<LibraryParams> = {
  global: {
    output: 'pkg/'
  },
  build: {
    assets: [],
    types: true,
    targets: { node: '12.0.0' },
    multitarget: true,
    manifest: {}
  },
  tarball: {
    destination: null,
    monorepo: {
      contents: null,
      allowPrivate: true
    }
  },
  docs: {
    build: true,
    name: null,
    version: null,
    destination: 'docs/',
    overrides: {}
  },
  distribute: {
    push: true
  }
};
