import { TypeGuard } from 'type-core';
import { series, Task, exec, confirm, context, progress } from 'kpo';

import { defaults } from '../defaults';

export interface DistributeParams {
  push?: boolean;
}

export function distribute(params: DistributeParams | null): Task.Async {
  const opts = {
    push: TypeGuard.isBoolean(params?.push)
      ? params?.push
      : defaults.distribute.push
  };

  return series(
    exec('npm', ['publish', '--dry-run']),
    confirm(
      { message: 'Continue?', default: true },
      series(
        progress({ message: 'Publish package' }, exec('npm', ['publish'])),
        opts.push
          ? progress(
              { message: 'Push to remote' },
              context(
                { args: [] },
                series(exec('git', ['push']), exec('git', ['push', '--tags']))
              )
            )
          : null
      )
    )
  );
}
