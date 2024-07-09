import { create } from 'kpo';

import { Preset } from '@riseup/utils';

import {
  type CommitParams,
  type ContentsParams,
  type CoverageParams,
  type DistributeParams,
  type ReleaseParams,
  type TarballParams,
  commit,
  contents,
  coverage,
  distribute,
  release,
  tarball
} from './tasks';

export declare namespace Universal {
  type Tasks =
    | 'commit'
    | 'contents'
    | 'coverage'
    | 'distribute'
    | 'release'
    | 'tarball';

  interface Options {
    commit?: CommitParams;
    contents?: ContentsParams;
    coverage?: CoverageParams;
    distribute?: DistributeParams;
    release?: ReleaseParams;
    tarball?: TarballParams;
  }
}

export class Universal extends Preset<Universal.Tasks> {
  public constructor(options: Universal.Options | null) {
    super({
      commit: create(() => commit(options?.commit || null)),
      contents: create(() => contents(options?.contents || null)),
      coverage: create(() => coverage(options?.coverage || null)),
      distribute: create(() => distribute(options?.distribute || null)),
      release: create(() => release(options?.release || null)),
      tarball: create(() => tarball(options?.tarball || null))
    });
  }
}
