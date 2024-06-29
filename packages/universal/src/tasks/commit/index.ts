import { create, exec, Task } from 'kpo';
import { safeJsonSerialize } from '@riseup/utils';

import { defaults } from '../../defaults';
import { paths } from '../../paths';

export interface CommitParams {
  /** See: https://github.com/commitizen/cz-cli */
  path?: string;
}

export function commit(params: CommitParams | null): Task {
  const opts = {
    path: params?.path || defaults.commit.path
  };

  return create(async () => {
    return exec(process.execPath, [paths.commitizenBin], {
      env: {
        COMMITIZEN_CONFIG: safeJsonSerialize(opts)
      }
    });
  });
}
