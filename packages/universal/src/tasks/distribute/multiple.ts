import { Task, exec, series, progress } from 'kpo';

import { DistributeParams } from './definitions';
import { paths } from '../../paths';

// TODO Required<DistributeParams>
export function multiple(params: DistributeParams): Task.Async {
  return series(
    exec(
      process.execPath,
      [
        paths.lernaBin,
        ...['publish', 'from-package'],
        ...(params.contents ? ['--contents', params.contents] : [])
      ],
      params.registry ? { env: { npm_config_registry: params.registry } } : {}
    ),
    params.push
      ? progress(
          { message: 'Push to remote' },
          series(exec('git', ['push']), exec('git', ['push', '--tags']))
        )
      : null
  );
}
