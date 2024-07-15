import { TypeGuard } from 'type-core';
import isGitDirty from 'is-git-dirty';
import {
  type Task,
  atValue,
  confirm,
  create,
  exec,
  interactive,
  log,
  raises,
  select,
  series,
  tmp
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
                  () => ({
                    name: 'release-it.json',
                    content: configure({
                      push: false,
                      isMonorepoRoot: Boolean(isMonorepoRoot),
                      runBefore: null,
                      runAfter: null
                    })
                  }),
                  ({ files }) => {
                    return exec('release-it', [
                      ...['-c', files[0]],
                      '--release-version'
                    ]);
                  }
                ),
                confirm(
                  {
                    message: `Release with recommended version?`,
                    default: true
                  },
                  atValue({
                    false: select(
                      { message: 'Select version bump:' },
                      bumps,
                      (selection) => {
                        bump = selection;
                        return null;
                      }
                    )
                  })
                )
              ),
              create(() => null)
            )
          : null,
        tmp(
          () => ({
            name: 'release-it.json',
            content: configure({
              push: Boolean(opts.push),
              isMonorepoRoot: Boolean(isMonorepoRoot),
              runBefore: opts?.scripts?.before || null,
              runAfter: opts?.scripts?.after || null
            })
          }),
          ({ files }) => {
            return exec('release-it', [
              ...['-c', files[0]],
              ...(bump ? ['--increment', bump] : []),
              ...(options.noInteractive ? ['--ci'] : []),
              '--verbose'
            ]);
          }
        )
      );
    });
  });
}
