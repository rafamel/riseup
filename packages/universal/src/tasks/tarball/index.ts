import { Serial, UnaryFn, TypeGuard } from 'type-core';
import path from 'node:path';
import fs from 'node:fs';
import {
  Task,
  copy,
  create,
  edit,
  mkdir,
  progress,
  run,
  series,
  tmp
} from 'kpo';

import { defaults } from '../../defaults';
import { pkgPackTask } from './helpers/pkg-pack-task';
import { resolvePkgMonorepoDeps } from './helpers/resolve-pkg-monorepo-deps';

export interface TarballParams {
  destination?: null | string;
  monorepo?: boolean | { contents?: string; noPrivate?: boolean };
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
      : tmp(null, ({ directory }) => {
          return series(
            mkdir(directory, { ensure: true }),
            // Copy project on temp directory
            copy('./!(node_modules)', directory, {
              glob: true,
              single: false,
              strict: true,
              exists: 'error'
            }),
            // Link node_modules
            create(async (ctx) => {
              const nodeModulesPath = path.resolve(ctx.cwd, 'node_modules');
              const nodeModulesDest = path.resolve(directory, 'node_modules');
              const nodeModulesExist = await fs.promises
                .access(nodeModulesPath, fs.constants.F_OK)
                .then(
                  () => true,
                  () => false
                );

              if (nodeModulesExist) {
                await fs.promises.symlink(
                  nodeModulesPath,
                  nodeModulesDest,
                  'dir'
                );
              }
            }),
            // Package deep merges
            opts.package
              ? edit(
                  path.join(directory, 'package.json'),
                  (buffer) => {
                    const contents = JSON.parse(String(buffer));
                    return TypeGuard.isFunction(opts.package)
                      ? opts.package(contents)
                      : { ...contents, ...opts.package };
                  },
                  { glob: false, strict: true }
                )
              : null,
            // Monorepo resolution
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
                      (buffer) => {
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
