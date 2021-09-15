import { Empty, Deep } from 'type-core';
import { series, Task, exec, confirm, context, progress } from 'kpo';
import { shallow } from 'merge-strategies';
import path from 'path';
import { defaults } from '../defaults';
import { hydrateLibraryGlobal } from '../global';

export interface DistributeParams {
  push?: boolean;
}

export interface DistributeOptions extends DistributeParams {
  output?: string;
}

export function hydrateDistribute(
  options: DistributeOptions | Empty
): Deep.Required<DistributeOptions> {
  const { output } = hydrateLibraryGlobal(options);
  return shallow(
    {
      output,
      push: defaults.distribute.push
    },
    options || undefined
  );
}

export function distribute(options: DistributeOptions | Empty): Task.Async {
  const opts = hydrateDistribute(options);

  return context(
    (ctx) => ({ ...ctx, cwd: path.resolve(ctx.cwd, opts.output) }),
    series(
      exec('npm', ['publish', '--dry-run']),
      confirm(
        { message: 'Continue?', default: true },
        series(
          progress({ message: 'Publish package' }, exec('npm', ['publish'])),
          opts.push
            ? progress(
                { message: 'Push to remote' },
                context({ args: [] }, exec('git', ['push', '--follow-tags']))
              )
            : null
        )
      )
    )
  );
}
