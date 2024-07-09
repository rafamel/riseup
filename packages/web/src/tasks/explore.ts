import path from 'node:path';

import { type Task, create, exec, print } from 'kpo';

import { paths } from '../paths';
import { defaults } from '../defaults';
import { ensureProjectBuilt } from './helpers/ensure-project-built';
import { getRecursiveFiles } from './helpers/get-recursive-files';

export interface ExploreParams {
  dir?: string | null;
}

export function explore(params: ExploreParams | null): Task.Async {
  const opts = {
    dir: params?.dir || defaults.explore.dir
  };

  return create(async (ctx) => {
    if (!opts.dir) {
      return print('Skipped exploration: unspecified directory');
    }

    const dir = path.resolve(ctx.cwd, opts.dir);
    await ensureProjectBuilt(dir);

    const maps = await getRecursiveFiles(['.map'], null, [dir]);

    if (maps.length <= 0) {
      throw new Error(`No source maps found for exploration: ${opts.dir}`);
    }

    return exec(process.execPath, [
      paths.sourceMapExplorerBin,
      path.join(dir, '**/*.*')
    ]);
  });
}
