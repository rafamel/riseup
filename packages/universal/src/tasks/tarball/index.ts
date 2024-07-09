import path from 'node:path';

import { type Serial, TypeGuard, type UnaryFn } from 'type-core';
import { type Task, create, edit, progress, run, series } from 'kpo';

import { defaults } from '../../defaults';
import { pkgPackTask } from './pkg-pack-task';
import { resolvePkgMonorepoDeps } from './resolve-pkg-monorepo-deps';
import { tmpProjectCreate } from './tmp-project-create';

export interface TarballParams {
  /** Package tarball file name */
  destination?: null | string;
  /** Enable monorepo dependencies inclusion in tarball */
  monorepo?: boolean | { contents?: string; noPrivate?: boolean };
  /** Override package.json properties */
  package?: Serial.Object | UnaryFn<Serial.Object, Serial.Object> | null;
}

export function tarball(params: TarballParams | null): Task.Async {
  const opts = {
    destination: TypeGuard.isUndefined(params?.destination)
      ? defaults.tarball.destination
      : params?.destination,
    monorepo: TypeGuard.isUndefined(params?.monorepo)
      ? defaults.tarball.monorepo
      : params?.monorepo,
    package: params?.package || defaults.tarball.package
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

  return progress(
    { message: 'Build tarball' },
    !monorepo && !opts.package
      ? pkgPackTask({
          name: null,
          source: './',
          destDir: destination ? null : './',
          destFile: destination
        })
      : tmpProjectCreate({ package: opts.package }, (directory) => {
          return series(
            monorepo
              ? create(async (ctx) => {
                  const resArr = await resolvePkgMonorepoDeps(ctx, {
                    contents: monorepo.contents,
                    noPrivate: monorepo.noPrivate
                  });

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
                            destDir: directory,
                            destFile: dep.tmpFile
                          })
                        );
                      }
                    }),
                    edit(
                      path.join(directory, 'package.json'),
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
                })
              : null,
            pkgPackTask({
              name: null,
              source: directory,
              destDir: destination ? null : './',
              destFile: destination
            })
          );
        })
  );
}
