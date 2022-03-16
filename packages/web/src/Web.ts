import { create } from 'kpo';
import { Preset } from '@riseup/utils';

import {
  assets,
  AssetsParams,
  explore,
  ExploreParams,
  size,
  SizeParams
} from './tasks';

export declare namespace Web {
  type Tasks = 'assets' | 'explore' | 'size';

  interface Options {
    assets?: AssetsParams;
    explore?: ExploreParams;
    size?: SizeParams;
  }
}

export class Web extends Preset<Web.Tasks> {
  public constructor(options: Web.Options | null) {
    super(
      {
        assets: create(() => {
          return assets(options?.assets || null);
        }),
        explore: create(() => {
          return explore(options?.explore || null);
        }),
        size: create(() => {
          return size(options?.size || null);
        })
      },
      {}
    );
  }
}
