import { Serial, TypeGuard } from 'type-core';
import path from 'node:path';
import { mkdir, remove, series, print, create, Task, exec } from 'kpo';
import { safeJsonSerialize, tmpTask } from '@riseup/utils';

import { defaults } from '../defaults';
import { paths } from '../paths';

export interface DocsParams {
  build?: boolean;
  source?: string;
  destination?: string;
}

export interface DocsConfigurations {
  typedoc: Serial.Object;
}

export function docs(
  params: DocsParams | null,
  configurations: DocsConfigurations
): Task.Async {
  const opts = {
    build: TypeGuard.isBoolean(params?.build)
      ? params?.build
      : defaults.docs.build,
    source: params?.source || defaults.docs.source,
    destination: params?.destination || defaults.docs.destination
  };

  return create(() => {
    if (!opts.build) return print('Skipped docs build');

    return series(
      mkdir(opts.destination, { ensure: true }),
      remove(path.join(opts.destination, '*'), {
        glob: true,
        strict: false,
        recursive: true
      }),
      tmpTask(
        {
          ext: 'json',
          content: safeJsonSerialize(configurations.typedoc),
          overrides: { name: 'typedoc.json', ext: false }
        },
        ([file]) => {
          return exec(process.execPath, [
            paths.typedocBin,
            opts.source,
            ...['--out', opts.destination],
            ...['--options', file]
          ]);
        }
      )
    );
  });
}
