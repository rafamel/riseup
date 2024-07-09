import type { Deep } from 'type-core';

import type { Universal } from './Universal';
import { paths } from './paths';

export const defaults: Deep.Required<Universal.Options> = {
  commit: {
    path: paths.conventionalChangelogDir
  },
  contents: {
    destination: null,
    clean: true,
    assets: null,
    package: false
  },
  coverage: {
    files: [],
    destination: './coverage/lcov.info',
    passWithoutFiles: false
  },
  distribute: {
    push: true,
    registry: null,
    contents: null
  },
  release: {
    push: false,
    requireCleanWorkingDir: true,
    scripts: null
  },
  tarball: {
    destination: null,
    contents: null,
    monorepo: false
  }
};
