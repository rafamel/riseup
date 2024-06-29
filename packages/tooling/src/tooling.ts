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

export declare namespace Tooling {
  type Tasks = 'commit' | 'coverages' | 'distribute' | 'release' | 'tarball';

  interface Options {
    commit?: CommitParams;
    coverages?: CoveragesParams;
    distribute?: DistributeParams;
    release?: ReleaseParams;
    tarball?: TarballParams;
  }
}

export class Tooling extends Preset<Tooling.Tasks> {
  public constructor(options: Tooling.Options | null) {
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
