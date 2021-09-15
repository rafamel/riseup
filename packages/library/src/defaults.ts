import { Deep } from 'type-core';
import { LibraryParams } from './definitions';

export const defaults: Deep.Required<LibraryParams> = {
  global: {
    output: 'pkg/'
  },
  build: {
    assets: [],
    types: true,
    tarball: false,
    targets: { node: '12.0.0' },
    multitarget: true,
    manifest: {}
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
