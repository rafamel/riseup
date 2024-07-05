import { TypeGuard } from 'type-core';
import isGitDirty from 'is-git-dirty';
import {
  Task,
  create,
  exec,
  confirm,
  interactive,
  select,
  series,
  raises,
  tmp,
  log
} from 'kpo';
import { getMonorepoRootDir, getPackageRootDir } from '@riseup/utils';

import { defaults } from '../../defaults';
import { configure } from './configure';
import { bumps, cli } from './cli';

export interface ReleaseParams {
  /** Push to remote */
  push?: boolean;
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

    return cli((options) => {
      let bump: string | null = options.bump;
      return series(
        opts.requireCleanWorkingDir && isGitDirty(ctx.cwd)
          ? raises(`Git working directory not clean`)
          : null,
        !bump && !options.noInteractive
          ? interactive(
              series(
                log('info', 'Recommended version:'),
                tmp(
                  () => {
                    return configure({
                      push: false,
                      isMonorepoRoot: Boolean(isMonorepoRoot),
                      runBefore: null,
                      runAfter: null
                    });
                  },
                  (file) => {
                    return exec('release-it', [
                      ...['-c', file],
                      '--release-version'
                    ]);
                  },
                  { ext: 'json' }
                ),
                confirm(
                  {
                    message: `Release with recommended version?`,
                    default: true
                  },
                  null,
                  select(
                    { message: 'Select version bump:' },
                    Object.fromEntries(
                      bumps.map((version) => [
                        version[0].toUpperCase() + version.slice(1),
                        () => {
                          bump = version;
                        }
                      ])
                    )
                  )
                )
              ),
              create(() => null)
            )
          : null,
        tmp(
          () => {
            return configure({
              push: Boolean(opts.push),
              isMonorepoRoot: Boolean(isMonorepoRoot),
              runBefore: opts?.scripts?.before || null,
              runAfter: opts?.scripts?.after || null
            });
          },
          (file) => {
            return exec('release-it', [
              ...['-c', file],
              ...(bump ? ['--increment', bump] : []),
              ...(options.noInteractive ? ['--ci'] : []),
              '--verbose'
            ]);
          },
          { ext: 'json' }
        )
      );
    });
  });
}
