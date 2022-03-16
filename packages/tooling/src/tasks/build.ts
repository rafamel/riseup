import path from 'node:path';
import { context, series, mkdir, remove, exec, Task } from 'kpo';

import { Builder } from '../utils';
import { paths } from '../paths';

export type BuildParams = Builder.Params | Builder.Params[];

export type BuildOptions = Builder.Options;

export function build(
  params: BuildParams | null,
  options: BuildOptions | null
): Task.Async {
  const arr = Array.isArray(params) ? params : [params || Builder.params];

  return context(
    { args: [] },
    series(
      arr.map((item) => {
        const outdir = item.outdir || Builder.params.outdir;
        const clean =
          typeof item.clean === 'boolean' ? item.clean : Builder.params.clean;

        return series(
          mkdir(outdir, { ensure: true }),
          clean
            ? remove(path.join(outdir, '*'), {
                glob: true,
                strict: false,
                recursive: true
              })
            : null,
          exec(process.execPath, [paths.buildBin], {
            env: {
              BUILDER_SETTINGS: Builder.serialize({
                params: { ...item, clean: false },
                options: options || {}
              })
            }
          })
        );
      })
    )
  );
}
