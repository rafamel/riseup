import path from 'node:path';

import { type Callable, type Serial, TypeGuard } from 'type-core';
import { type Task, copy, create, edit, mkdir, remove, series } from 'kpo';

import { defaults } from '../defaults';

export interface ContentsParams {
  /** Destination folder for assets and/or package.json */
  destination?: null | string;
  /** Clean destination folder before */
  clean?: boolean;
  /** Path of assets to copy into destination folder */
  assets?: null | string | string[];
  /** Copy package.json and optionally override its properties */
  package?:
    | boolean
    | { [key: string]: Serial }
    | Callable<{ [key: string]: Serial }, { [key: string]: Serial }>;
}

export function contents(params: ContentsParams | null): Task.Async {
  const opts = {
    destination: TypeGuard.isUndefined(params?.destination)
      ? defaults.contents.destination
      : params?.destination,
    clean: TypeGuard.isBoolean(params?.clean)
      ? params?.clean
      : defaults.contents.clean,
    assets: TypeGuard.isUndefined(params?.assets)
      ? defaults.contents.assets
      : params?.assets,
    package: TypeGuard.isUndefined(params?.package)
      ? defaults.contents.package
      : params?.package
  };

  return create(async (ctx) => {
    const destination = opts.destination;
    const assets = opts.assets
      ? Array.isArray(opts.assets)
        ? opts.assets
        : [opts.assets]
      : [];
    const pkg = opts.package;

    if (!destination) {
      throw new Error('Contents requires a destination folder');
    }

    return series(
      mkdir(destination, { ensure: true }),
      opts.clean
        ? remove(path.join(destination, '*'), {
            glob: true,
            recursive: true
          })
        : null,
      ...assets.map((asset) => {
        return copy(asset, destination, {
          glob: false,
          single: false,
          strict: false,
          exists: 'overwrite'
        });
      }),
      pkg
        ? series(
            copy(path.join(ctx.cwd, 'package.json'), destination, {
              glob: false,
              single: false,
              strict: true,
              exists: 'ignore'
            }),
            TypeGuard.isBoolean(pkg)
              ? null
              : edit(
                  path.join(destination, 'package.json'),
                  ({ buffer }) => {
                    const contents = JSON.parse(String(buffer));
                    return TypeGuard.isFunction(pkg)
                      ? { ...contents, ...(pkg(contents) as any) }
                      : { ...contents, ...pkg };
                  },
                  { glob: false, strict: true }
                )
          )
        : null
    );
  });
}
