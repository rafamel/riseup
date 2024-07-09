import type { Deep } from 'type-core';

import type { Universal } from './Universal';
import { paths } from './paths';

export const defaults: Deep.Required<Universal.Options> = {
  commit: {
    path: paths.conventionalChangelogDir
  },
  coverage: {
    files: [],
    destination: './coverage/lcov.info',
    passWithoutFiles: false
  },
  distribute: {
    push: true,
    registry: null
  },
  release: {
    push: false,
    requireCleanWorkingDir: true,
    scripts: null
  },
  tarball: {
    destination: null,
    monorepo: false,
    package: null
  }
};
