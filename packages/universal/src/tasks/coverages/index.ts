import path from 'node:path';
import {
  Task,
  remove,
  progress,
  context,
  mkdir,
  series,
  create,
  finalize,
  exec
} from 'kpo';
import { tmpPath } from '@riseup/utils';

import { paths } from '../../paths';
import { defaults } from '../../defaults';

export interface CoveragesParams {
  /** Relative to each package. Can be a glob. */
  infile?: string;
  /** Relative to the monorepo root. */
  outfile?: string;
}

export function coverages(params: CoveragesParams | null): Task.Async {
  const opts = {
    infile: params?.infile || defaults.coverages.infile,
    outfile: params?.outfile || defaults.coverages.outfile
  };

  return create((ctx) => {
    const infile = opts.infile;
    const outfile = path.resolve(ctx.cwd, opts.outfile);
    const outdir = path.dirname(outfile);
    const tempdir = tmpPath(null, null);

    const task = finalize(
      series(
        mkdir(tempdir, { ensure: true }),
        mkdir(outdir, { ensure: true }),
        remove(outfile, { glob: false, strict: false, recursive: false }),
        exec(process.execPath, [
          paths.lernaBin,
          'exec',
          process.platform === 'win32' ? 'node' : process.execPath,
          paths.coverageBin,
          '--',
          infile,
          tempdir
        ]),
        exec(process.execPath, [
          paths.lcovResultMergerBin,
          path.join(tempdir, '*.info'),
          outfile
        ])
      ),
      remove(tempdir, { glob: false, strict: false, recursive: true })
    );

    return progress(
      { message: 'Compile coverage' },
      context({ args: [] }, task)
    );
  });
}
