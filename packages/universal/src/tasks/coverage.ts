import path from 'node:path';
import { TypeGuard } from 'type-core';
import { globSync } from 'glob';
import {
  Task,
  copy,
  remove,
  progress,
  context,
  mkdir,
  series,
  create,
  exec,
  tmp
} from 'kpo';

import { paths } from '../paths';
import { defaults } from '../defaults';

export interface CoverageParams {
  /** Paths for coverage info files to merge -can be glob patterns. */
  files?: string | string[];
  /** Path for the merged output file. */
  destination?: string;
  /** Don't error when no input files exist. */
  passWithoutFiles?: boolean;
}

export function coverage(params: CoverageParams | null): Task.Async {
  const opts = {
    files: params?.files || defaults.coverage.files,
    destination: params?.destination || defaults.coverage.destination,
    passWithoutFiles: TypeGuard.isBoolean(params?.passWithoutFiles)
      ? params?.passWithoutFiles
      : defaults.coverage.passWithoutFiles
  };

  return create((ctx) => {
    const arr = Array.isArray(opts.files) ? opts.files : [opts.files];
    const infiles = globSync(
      arr.map((x) => path.resolve(ctx.cwd, x)),
      { nodir: true }
    );
    if (!infiles && !opts.passWithoutFiles) {
      throw new Error('No coverage files found to merge');
    }

    const nonInfo = infiles.find(
      (x) => path.extname(x).toLowerCase() !== '.info'
    );
    if (nonInfo) {
      throw new Error(`Non .info file passed for coverage merge: ${nonInfo}`);
    }

    const outFile = path.resolve(ctx.cwd, opts.destination);
    const outDir = path.dirname(outFile);
    const task = tmp(null, ({ directory }) => {
      return series(
        mkdir(outDir, { ensure: true }),
        remove(outFile, { glob: false, strict: false, recursive: false }),
        ...infiles.map((file, i) => {
          return copy(file, path.join(directory, `coverage-${i}.info`), {
            glob: false,
            single: true,
            strict: true,
            exists: 'error'
          });
        }),
        exec(process.execPath, [
          paths.lcovResultMergerBin,
          path.join(directory, '*.info'),
          outFile
        ])
      );
    });

    return progress(
      { message: 'Compile coverage' },
      context({ args: [] }, task)
    );
  });
}
