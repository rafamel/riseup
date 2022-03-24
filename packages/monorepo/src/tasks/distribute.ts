import { TypeGuard } from 'type-core';
import { Task, exec, series, progress } from 'kpo';

import { defaults } from '../defaults';
import { paths } from '../paths';

export interface DistributeParams {
  /** Whether to push repository after publish */
  push?: boolean;
  /** Subdirectory to publish for all packages */
  contents?: string | null;
  /** Package registry for publication */
  registry?: string | null;
}

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

  return series(
    exec(
      process.execPath,
      [
        paths.lernaBin,
        ...['publish', 'from-package'],
        ...(opts.contents ? ['--contents', opts.contents] : [])
      ],
      opts.registry ? { env: { npm_config_registry: opts.registry } } : {}
    ),
    opts.push
      ? progress(
          { message: 'Push to remote' },
          series(exec('git', ['push']), exec('git', ['push', '--tags']))
        )
      : null
  );
}
