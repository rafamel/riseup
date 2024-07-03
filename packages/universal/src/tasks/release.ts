/* eslint-disable no-template-curly-in-string */
import { TypeGuard } from 'type-core';
import isGitDirty from 'is-git-dirty';
import { Task, create, exec, series, raises, tmp } from 'kpo';
import { getMonorepoRootDir, getPackageRootDir } from '@riseup/utils';

import { defaults } from '../defaults';
import { paths } from '../paths';

export interface ReleaseParams {
  /** Push to remote */
  push?: boolean;
  /** Generate changelog upon release */
  changelog?: boolean;
  /** Require git working dir to be clean */
  requireCleanWorkingDir?: boolean;
  /** Scripts to run before and after release */
  scripts?: ReleaseScriptsParams | null;
}

export interface ReleaseScriptsParams {
  before?: null | string | string[];
  after?: null | string | string[];
}

export function release(params: ReleaseParams | null): Task.Async {
  const opts = {
    push: TypeGuard.isBoolean(params?.push)
      ? params?.push
      : defaults.release.push,
    changelog: TypeGuard.isBoolean(params?.changelog)
      ? params?.changelog
      : defaults.release.changelog,
    requireCleanWorkingDir: TypeGuard.isBoolean(params?.requireCleanWorkingDir)
      ? params?.requireCleanWorkingDir
      : defaults.release.requireCleanWorkingDir,
    scripts: params?.scripts ? params?.scripts : defaults.release.scripts
  };

  return create((ctx) => {
    const packageRoot = getPackageRootDir(ctx.cwd);
    const monorepoRoot = getMonorepoRootDir(ctx.cwd);
    const isMonorepoRoot = monorepoRoot && monorepoRoot === packageRoot;
    const isMonorepoChild = monorepoRoot && monorepoRoot !== packageRoot;

    if (isMonorepoChild) {
      throw new Error(`Release should be run at monorepo root`);
    }

    const before = opts.scripts?.before
      ? Array.isArray(opts.scripts.before)
        ? opts.scripts.before
        : [opts.scripts.before]
      : [];
    const after = opts.scripts?.after
      ? Array.isArray(opts.scripts.after)
        ? opts.scripts.after
        : [opts.scripts.after]
      : [];

    return series(
      opts.requireCleanWorkingDir && isGitDirty(ctx.cwd)
        ? raises(`Git working directory not clean`)
        : null,
      tmp(
        () => ({
          hooks: {
            'before:init': before.map((script) => `npm run ${script}`),
            'after:release': after.map((script) => `npm run ${script}`)
          },
          git: {
            push: opts.push,
            requireCleanWorkingDir: false,
            commitMessage: 'chore: release v${version}'
          },
          npm: {
            publish: false,
            skipChecks: true,
            allowSameVersion: Boolean(isMonorepoRoot)
          },
          plugins: {
            ...(Boolean(isMonorepoRoot)
              ? {
                  [paths.releaseItPluginWorkspaces]: {
                    publish: false,
                    skipChecks: true
                  }
                }
              : {}),
            ...(opts.changelog
              ? {
                  [paths.releaseItPluginChangelog]: {
                    preset: 'angular',
                    infile: 'CHANGELOG.md'
                  }
                }
              : {})
          }
        }),
        (file) => exec('release-it', ['-c', file, '--verbose']),
        { ext: 'json' }
      )
    );
  });
}
