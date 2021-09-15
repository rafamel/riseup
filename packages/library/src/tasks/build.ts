import { Serial, Empty, Deep } from 'type-core';
import { shallow } from 'merge-strategies';
import path from 'path';
import { create, Task } from 'kpo';
import { intercept } from '@riseup/utils';
import { hydrateLibraryGlobal } from '../global';
import { paths } from '../paths';

export interface BuildOptions {
  output?: string;
}

export interface BuildConfig {
  pika: Serial.Array;
  babel: Serial.Object;
}

export function hydrateBuild(
  options: BuildOptions | Empty
): Deep.Required<BuildOptions> {
  const { output } = hydrateLibraryGlobal(options);
  return shallow({ output }, options || undefined);
}

export function build(
  options: BuildOptions | Empty,
  config: BuildConfig
): Task.Async {
  const opts = hydrateBuild(options);

  return create((ctx) => {
    return intercept(
      {
        path: path.resolve(ctx.cwd, '.babelrc'),
        content: JSON.stringify(config.babel),
        require: 'json'
      },
      paths.bin.pika,
      [
        ...['--out', opts.output],
        ...['--pipeline', JSON.stringify(config.pika)]
      ]
    );
  });
}
