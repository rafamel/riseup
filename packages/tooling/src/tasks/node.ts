import { TypeGuard } from 'type-core';
import { create, exec, Task } from 'kpo';
import { getPackageJson } from '@riseup/utils';

import { paths } from '../paths';
import { Transpiler } from '../utils';
import { defaults } from '../defaults';

export type NodeParams = Transpiler.Params;
export type NodeOptions = Transpiler.Options;

export function node(
  params: NodeParams | null,
  options: NodeOptions | null
): Task.Async {
  const opts: Required<NodeParams> = {
    format: params?.format || defaults.node.format,
    exclude: TypeGuard.isUndefined(params?.exclude)
      ? defaults.node.exclude
      : params?.exclude || false
  };

  return create((ctx) => {
    const pkg = getPackageJson(ctx.cwd, false);
    if (!pkg) throw Error(`package.json not found for: ${ctx.cwd}`);

    return exec(
      process.execPath,
      [
        ...['--require', paths.transpileRegister],
        // TODO: remove --no-warnings flags once loader api is stable
        ...['--no-warnings', '--loader', paths.transpileLoader]
      ],
      {
        env: {
          NODE_ENV: ctx.env.NODE_ENV || 'development',
          TRANSPILER_SETTINGS: Transpiler.serialize({
            params: opts,
            options: options || {}
          })
        }
      }
    );
  });
}
