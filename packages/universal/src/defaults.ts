import { Deep } from 'type-core';

import { Universal } from './Universal';
import { paths } from './paths';

export const defaults: Deep.Required<Universal.Options> = {
  commit: {
    path: paths.conventionalChangelogDir
  },
  coverage: {
    infiles: [],
    outfile: './coverage/lcov.info',
    passWithoutFiles: false
  },
  distribute: {
    push: true,
    registry: null
  },
  release: {
    push: false,
    changelog: true,
    requireCleanWorkingDir: true,
    scripts: null
  },
  tarball: {
    destination: null,
    monorepo: false,
    package: null
  }
};
