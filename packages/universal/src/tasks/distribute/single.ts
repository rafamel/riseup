import { series, Task, exec, confirm, log } from 'kpo';

import { DistributeParams } from './definitions';

// TODO Required<DistributeParams>
export function single(params: DistributeParams): Task.Async {
  const options = {
    cwd: params.contents || './',
    env: params.registry ? { npm_config_registry: params.registry } : {}
  };
  return series(
    exec('npm', ['publish', '--dry-run'], options),
    confirm(
      { message: 'Continue?', default: true },
      series(
        log('info', 'Publish package'),
        exec('npm', ['publish'], options),
        params.push
          ? series(
              log('info', 'Push to remote'),
              series(exec('git', ['push']), exec('git', ['push', '--tags']))
            )
          : null
      )
    )
  );
}
