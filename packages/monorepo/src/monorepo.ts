import { create } from 'kpo';
import { Preset } from '@riseup/utils';

import {
  coverage,
  CoverageParams,
  distribute,
  DistributeParams,
  execute,
  run
} from './tasks';

export declare namespace Monorepo {
  type Tasks = 'run' | 'execute' | 'coverage' | 'distribute';

  interface Options {
    coverage?: CoverageParams;
    distribute?: DistributeParams;
  }
}

export class Monorepo extends Preset<Monorepo.Tasks> {
  public constructor(options: Monorepo.Options | null) {
    super(
      {
        run: create(() => {
          return run();
        }),
        execute: create(() => {
          return execute();
        }),
        coverage: create(() => {
          return coverage(options?.coverage || null);
        }),
        distribute: create(() => {
          return distribute(options?.distribute || null);
        })
      },
      {}
    );
  }
}
