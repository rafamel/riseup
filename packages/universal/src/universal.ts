import { create } from 'kpo';
import { Preset } from '@riseup/utils';

import {
  configureMarkdownlint,
  ConfigureMarkdownlintParams
} from './configure';
import {
  commit,
  lintmd,
  release,
  CommitParams,
  LintMdParams,
  ReleaseParams,
  LintMdConfigurations
} from './tasks';

export declare namespace Universal {
  type Tasks = 'commit' | 'release' | 'lintmd';
  type Configurations = LintMdConfigurations;

  interface Options {
    lintmd?: ConfigureMarkdownlintParams & LintMdParams;
    commit?: CommitParams;
    release?: ReleaseParams;
  }
}

export class Universal extends Preset<
  Universal.Tasks,
  Universal.Configurations
> {
  public constructor(options: Universal.Options | null) {
    super(
      {
        lintmd: create(() => {
          return lintmd(options?.lintmd || null, {
            markdownlint: this.retrieve('markdownlint')
          });
        }),
        commit: create(() => commit(options?.commit || null)),
        release: create(() => release(options?.release || null))
      },
      {
        markdownlint: () => configureMarkdownlint(options?.lintmd || null)
      }
    );
  }
}
