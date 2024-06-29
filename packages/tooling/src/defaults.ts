import { Deep } from 'type-core';

import { Tooling } from './Tooling';
import { paths } from './paths';

export const defaults: Deep.Required<Tooling.Options> = {
  commit: {
    path: paths.conventionalChangelogDir
  },
  coverages: {
    infile: './coverage/*.info',
    outfile: './coverage/lcov.info'
  },
  distribute: {
    push: true,
    contents: null,
    registry: null
  },
  release: {
    preset: 'angular',
    changelog: true
  },
  tarball: {
    destination: null,
    monorepo: false,
    package: null
  }
};
