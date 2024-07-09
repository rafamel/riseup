import path from 'node:path';

import { TypeGuard } from 'type-core';
import { type Task, create, exec, log, print, series } from 'kpo';

import { paths } from '../paths';
import { defaults } from '../defaults';
import { getRecursiveFiles } from './helpers/get-recursive-files';
import { ensureProjectBuilt } from './helpers/ensure-project-built';

export interface SizeParams {
  dir?: string | null;
  limit?: string | null;
  exclude?: RegExp | null;
}

export function size(params: SizeParams | null): Task.Async {
  const opts = {
    dir: params?.dir || defaults.size.dir,
    limit: params?.limit || defaults.size.limit,
    exclude: TypeGuard.isUndefined(params?.exclude)
      ? defaults.size.exclude
      : params?.exclude
  };

  return create(async (ctx) => {
    if (!opts.dir) {
      return print('Skipped size: unspecified source directory');
    }
    if (!opts.limit) {
      return print('Skipped size: unspecified limit');
    }

    const dir = path.resolve(ctx.cwd, opts.dir);
    await ensureProjectBuilt(dir);

    const files = await getRecursiveFiles(null, opts.exclude || null, [dir]);

    return series(
      log(
        'debug',
        'Checking aggregate size of: ' +
          files.map((file) => path.relative(ctx.cwd, file)).join(', ')
      ),
      exec(
        process.execPath,
        [paths.sizeLimitBin, ...['--limit', opts.limit], ...files],
        { cwd: paths.rootDir }
      )
    );
  });
}
