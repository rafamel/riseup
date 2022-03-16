import { TypeGuard } from 'type-core';
import { create, Task } from 'kpo';

import { defaults } from '../../defaults';
import { cli } from './cli';

export interface ReleaseParams {
  preset?: string | null;
  changelog?: boolean;
}

export function release(params: ReleaseParams | null): Task.Async {
  const opts = {
    preset:
      params?.preset === null
        ? null
        : params?.preset || defaults.release.preset,
    changelog: TypeGuard.isBoolean(params?.changelog)
      ? params?.changelog
      : defaults.release.changelog
  };

  return create(() => {
    return cli(
      TypeGuard.isString(opts.preset)
        ? { preset: opts.preset, changelog: opts.changelog || false }
        : null
    );
  });
}
