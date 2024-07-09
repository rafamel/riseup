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

import { getMonorepoRootDir, getPackageRootDir } from '@riseup/utils';

import { defaults } from '../defaults';

export interface DistributeParams {
  /** Push to remote */
  push?: boolean;
  /** Package registry */
  registry?: string | null;
}

export function distribute(params: DistributeParams | null): Task.Async {
  const opts = {
    push: TypeGuard.isBoolean(params?.push)
      ? params?.push
      : defaults.distribute.push,
    registry: TypeGuard.isUndefined(params?.registry)
      ? defaults.distribute.registry
      : params?.registry
  };

  return create((ctx) => {
    const packageRoot = getPackageRootDir(ctx.cwd);
    const monorepoRoot = getMonorepoRootDir(ctx.cwd);
    const isMonorepoRoot = monorepoRoot && monorepoRoot === packageRoot;
    const isMonorepoChild = monorepoRoot && monorepoRoot !== packageRoot;

    if (isMonorepoChild) {
      throw new Error(`Distribute should be run at monorepo root`);
    }

    const args = isMonorepoRoot ? ['publish', '-ws'] : ['publish'];
    const env = opts.registry ? { npm_config_registry: opts.registry } : {};
    return context(
      { args: [] },
      series(
        exec('npm', [...args, '--dry-run', ...ctx.args], { env }),
        confirm(
          { message: 'Continue?', default: true },
          atValue({
            true: series(
              log('info', 'Run publish'),
              exec('npm', [...args, ...ctx.args], { env }),
              opts.push
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
