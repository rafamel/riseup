import path from 'node:path';

import { TypeGuard } from 'type-core';
import { type Task, create, edit, progress, raises, run, series } from 'kpo';

import { defaults } from '../../defaults';
import { pkgPackTask } from './pkg-pack-task';
import { resolvePkgMonorepoDeps } from './resolve-pkg-monorepo-deps';
import { tmpProjectCreate } from './tmp-project-create';

export interface TarballParams {
  /** Package tarball file name */
  destination?: null | string;
  /** Subdirectory to tarball */
  contents?: string | null;
  /** Enable monorepo dependencies inclusion in tarball */
  monorepo?: boolean | { contents?: string; noPrivate?: boolean };
}

export function tarball(params: TarballParams | null): Task.Async {
  const opts = {
    destination: TypeGuard.isUndefined(params?.destination)
      ? defaults.tarball.destination
      : params?.destination,
    contents: TypeGuard.isUndefined(params?.contents)
      ? defaults.tarball.contents
      : params?.contents,
    monorepo: TypeGuard.isUndefined(params?.monorepo)
      ? defaults.tarball.monorepo
      : params?.monorepo
  };

  const destination = opts.destination
    ? opts.destination.endsWith('.tgz')
      ? opts.destination
      : `${opts.destination}.tgz`
    : null;

  const monorepo =
    opts.monorepo === true
      ? { contents: './', noPrivate: false }
      : opts.monorepo
        ? {
            contents: opts.monorepo.contents || './',
            noPrivate: opts.monorepo.noPrivate || false
          }
        : null;

  const task = series(
    opts.contents &&
      (path.isAbsolute(opts.contents) || opts.contents.startsWith('..'))
      ? raises(
          new Error(
            'Tarball contents option must be a relative path: ' + opts.contents
          )
        )
      : null,
    monorepo &&
      monorepo.contents &&
      (path.isAbsolute(monorepo.contents) || monorepo.contents.startsWith('..'))
      ? raises(
          new Error(
            'Tarball monorepo contents option must be a relative path: ' +
              monorepo.contents
          )
        )
      : null,
    !monorepo
      ? pkgPackTask({
          name: null,
          source: opts.contents || './',
          destDir: destination ? null : './',
          destFile: destination
        })
      : tmpProjectCreate((directory) => {
          return series(
            create(async (ctx) => {
              const resArr = await resolvePkgMonorepoDeps(
                {
                  packageDir: ctx.cwd,
                  packageContentsDir: path.join(ctx.cwd, opts.contents || '')
                },
                {
                  contents: monorepo.contents,
                  noPrivate: monorepo.noPrivate
                }
              );

              const tmpFilesRecord: Record<string, string> = {};
              const depsArr = resArr.map((item) => {
                if (Object.hasOwnProperty.call(tmpFilesRecord, item.name)) {
                  return { ...item, tmpFile: tmpFilesRecord[item.name] };
                } else {
                  const tmpFile =
                    'pkg-' + String(Math.random()).slice(2) + '.tgz';
                  tmpFilesRecord[item.name] = tmpFile;
                  return { ...item, tmpFile };
                }
              });

              return series(
                create(async (ctx) => {
                  const builtArr: string[] = [];

                  // Build dependencies
                  for (const dep of depsArr) {
                    if (builtArr.includes(dep.name)) continue;

                    builtArr.push(dep.name);
                    await run(
                      ctx,
                      pkgPackTask({
                        name: dep.name,
                        source: path.resolve(dep.path, monorepo.contents),
                        destDir: path.join(directory, opts.contents || ''),
                        destFile: dep.tmpFile
                      })
                    );
                  }
                }),
                edit(
                  path.join(directory, opts.contents || '', 'package.json'),
                  ({ buffer }) => {
                    const json = JSON.parse(String(buffer));
                    if (!TypeGuard.isArray(json.files)) {
                      throw new TypeError(
                        `Compulsory files field in package.json not found`
                      );
                    }

                    const response = {
                      ...json,
                      files: [
                        ...json.files,
                        ...depsArr
                          .map((item) => item.tmpFile)
                          .filter((x, i, arr) => arr.indexOf(x) === i)
                      ],
                      dependencies: json.dependencies || {},
                      devDependencies: json.devDependencies || {},
                      optionalDependencies: json.optionalDependencies || {}
                    };

                    for (const dep of depsArr) {
                      response[dep.placement] = {
                        ...response[dep.placement],
                        [dep.name]: 'file:./' + dep.tmpFile
                      };
                    }

                    return response;
                  },
                  { glob: false, strict: true }
                )
              );
            }),
            pkgPackTask({
              name: null,
              source: path.join(directory, opts.contents || ''),
              destDir: destination ? null : './',
              destFile: destination
            })
          );
        })
  );

  return progress({ message: 'Build tarball' }, task);
}
