/* eslint-disable no-template-curly-in-string */
import type { Serial } from 'type-core';

import { paths } from '../../paths';

export interface ConfigureOptions {
  push: boolean;
  isMonorepoRoot: boolean;
  runBefore: null | string | string[];
  runAfter: null | string | string[];
}

export function configure(options: ConfigureOptions): Serial {
  const before = options.runBefore
    ? Array.isArray(options.runBefore)
      ? options.runBefore
      : [options.runBefore]
    : [];
  const after = options.runAfter
    ? Array.isArray(options.runAfter)
      ? options.runAfter
      : [options.runAfter]
    : [];

  return {
    hooks: {
      'before:init': before.map((script) => `npm run ${script}`),
      'after:release': after.map((script) => `npm run ${script}`)
    },
    git: {
      push: options.push,
      requireUpstream: false,
      requireCleanWorkingDir: false,
      commitMessage: 'chore: release v${version}'
    },
    npm: {
      publish: false,
      skipChecks: true,
      allowSameVersion: options.isMonorepoRoot
    },
    plugins: {
      [paths.releaseItPluginChangelog]: {
        preset: 'angular',
        infile: 'CHANGELOG.md'
      },
      ...(options.isMonorepoRoot
        ? {
            [paths.releaseItPluginWorkspaces]: {
              publish: false,
              skipChecks: true
            }
          }
        : {})
    }
  };
}
