import { create } from 'kpo';
import { Preset } from '@riseup/utils';

import {
  commit,
  CommitParams,
  coverages,
  CoveragesParams,
  distribute,
  DistributeParams,
  release,
  ReleaseParams,
  tarball,
  TarballParams
} from './tasks';

export declare namespace Universal {
  type Tasks = 'commit' | 'coverages' | 'distribute' | 'release' | 'tarball';

  interface Options {
    commit?: CommitParams;
    coverages?: CoveragesParams;
    distribute?: DistributeParams;
    release?: ReleaseParams;
    tarball?: TarballParams;
  }
}

export class Universal extends Preset<Universal.Tasks> {
  public constructor(options: Universal.Options | null) {
    super(
      {
        commit: create(() => commit(options?.commit || null)),
        coverages: create(() => coverages(options?.coverages || null)),
        distribute: create(() => distribute(options?.distribute || null)),
        release: create(() => release(options?.release || null)),
        tarball: create(() => tarball(options?.tarball || null))
      },
      {}
    );
  }
}
