import { create } from 'kpo';

import { Preset } from '@riseup/utils';

import {
  type AssetsParams,
  type ExploreParams,
  type SizeParams,
  assets,
  explore,
  size
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
    super({
      assets: create(() => assets(options?.assets || null)),
      explore: create(() => explore(options?.explore || null)),
      size: create(() => size(options?.size || null))
    });
  }
}
