import { TypeGuard } from 'type-core';
import { Task, create, context } from 'kpo';
import { getMonorepoRootDir, getLernaConfig } from '@riseup/utils';

import { defaults } from '../../defaults';
import { DistributeParams } from './definitions';
import { multiple } from './multiple';
import { single } from './single';

export function distribute(params: DistributeParams | null): Task.Async {
  const opts = {
    push: TypeGuard.isBoolean(params?.push)
      ? params?.push
      : defaults.distribute.push,
    contents: TypeGuard.isUndefined(params?.contents)
      ? defaults.distribute.contents
      : params?.contents,
    registry: TypeGuard.isUndefined(params?.registry)
      ? defaults.distribute.registry
      : params?.registry
  };

  return create((ctx) => {
    const isMonorepoRoot = Boolean(getLernaConfig(ctx.cwd));
    const isMonorepoChild = Boolean(getMonorepoRootDir(ctx.cwd));

    if (isMonorepoChild) {
      throw new Error(`Distribute should be run at monorepo root`);
    }

    return context(
      { args: [] },
      isMonorepoRoot ? multiple(opts) : single(opts)
    );
  });
}
