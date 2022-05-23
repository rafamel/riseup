import { Deep } from 'type-core';

import { Universal } from './Universal';
import { paths } from './paths';

export const defaults: Deep.Required<Universal.Options> = {
  lintmd: {
    include: './',
    exclude: '{CHANGELOG.md,node_modules/**/*,pkg/**/*,build/**/*,dist/**/*}',
    overrides: {}
  },
  commit: {
    path: paths.conventionalChangelogDir
  },
  release: {
    preset: 'angular',
    changelog: true
  }
};
