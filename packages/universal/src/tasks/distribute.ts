import path from 'node:path';

import { TypeGuard } from 'type-core';
import {
  type Task,
  atValue,
  confirm,
  context,
  create,
  exec,
  log,
  series
} from 'kpo';

import {
  fetchMonorepoPackages,
  getMonorepoRootDir,
  getPackageRootDir
} from '@riseup/utils';

import { defaults } from '../defaults';

export interface DistributeParams {
  /** Push to remote */
  push?: boolean;
  /** Package registry */
  registry?: string | null;
  /** Subdirectory to publish for all packages */
  contents?: string | null;
}

export function distribute(params: DistributeParams | null): Task.Async {
  const opts = {
    push: TypeGuard.isBoolean(params?.push)
      ? (params?.push as boolean)
      : defaults.distribute.push,
    registry: TypeGuard.isUndefined(params?.registry)
      ? defaults.distribute.registry
      : (params?.registry as string),
    contents: TypeGuard.isUndefined(params?.contents)
      ? defaults.distribute.contents
      : params?.contents
  };

  return create(async (ctx) => {
    const packageRoot = getPackageRootDir(ctx.cwd);
    const monorepoRoot = getMonorepoRootDir(ctx.cwd);
    const isMonorepoRoot = monorepoRoot && monorepoRoot === packageRoot;
    const isMonorepoChild = monorepoRoot && monorepoRoot !== packageRoot;

    if (isMonorepoChild) {
      throw new Error(`Distribute should be run at monorepo root`);
    }

    if (!opts.contents) {
      return publish([ctx.cwd], isMonorepoRoot ? ['-ws'] : [], {
        push: opts.push,
        registry: opts.registry
      });
    }

    if (!isMonorepoRoot) {
      return publish([path.resolve(ctx.cwd, opts.contents || '')], [], {
        push: opts.push,
        registry: opts.registry
      });
    }

    const pkgs = await fetchMonorepoPackages(ctx.cwd);
    return publish(
      pkgs.map(({ location }) => path.resolve(location, opts.contents || '')),
      [],
      { push: opts.push, registry: opts.registry }
    );
  });
}

function publish(
  publishCwds: string[],
  midArgs: string[],
  options: { push: boolean; registry: string | null }
): Task.Async {
  const env = options.registry ? { npm_config_registry: options.registry } : {};

  return create((ctx) => {
    return context(
      { args: [] },
      series(
        ...publishCwds.map((publishCwd) => {
          return exec(
            'npm',
            ['publish', ...midArgs, '--dry-run', ...ctx.args],
            { env, cwd: publishCwd }
          );
        }),
        confirm(
          { message: 'Continue?', default: true },
          atValue({
            true: series(
              log('info', 'Run publish'),
              ...publishCwds.map((publishCwd) => {
                return exec('npm', ['publish', ...midArgs, ...ctx.args], {
                  env,
                  cwd: publishCwd
                });
              }),
              options.push
                ? series(
                    log('info', 'Push to remote'),
                    exec('git', ['push', '--follow-tags'])
                  )
                : null
            )
          })
        )
      )
    );
  });
}
