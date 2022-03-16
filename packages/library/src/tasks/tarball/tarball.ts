import { TypeGuard } from 'type-core';
import path from 'node:path';
import {
  copy,
  create,
  edit,
  finalize,
  mkdir,
  progress,
  remove,
  run,
  series,
  Task
} from 'kpo';
import { tmpPath } from '@riseup/utils';

import { defaults } from '../../defaults';
import { pkgPackTask } from './helpers/pkg-pack-task';
import { resolvePkgMonorepoDeps } from './helpers/resolve-pkg-monorepo-deps';

export interface TarballParams {
  destination?: null | string;
  monorepo?: boolean | { contents?: string; noPrivate?: boolean };
}

export function tarball(params: TarballParams | null): Task.Async {
  const opts = {
    destination: TypeGuard.isUndefined(params?.destination)
      ? defaults.tarball.destination
      : params?.destination,
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

  return progress(
    { message: 'Build tarball' },
    !monorepo
      ? // No monorepo
        pkgPackTask({
          name: null,
          source: './',
          destDir: destination ? null : './',
          destFile: destination
        })
      : // Monorepo resolution
        create(async (ctx) => {
          const tmpDir = tmpPath(null, null);
          const resArr = await resolvePkgMonorepoDeps(ctx, {
            contents: monorepo.contents,
            noPrivate: monorepo.noPrivate
          });
          const tmpFilesRecord: Record<string, string> = {};
          const depsArr = resArr.map((item) => {
            if (Object.hasOwnProperty.call(tmpFilesRecord, item.name)) {
              return { ...item, tmpFile: tmpFilesRecord[item.name] };
            } else {
              const tmpFile = 'pkg-' + Math.random().toString().slice(2);
              tmpFilesRecord[item.name] = tmpFile;
              return { ...item, tmpFile };
            }
          });

          return finalize(
            series(
              mkdir(tmpDir, { ensure: true }),
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
                      destDir: tmpDir,
                      destFile: dep.tmpFile
                    })
                  );
                }
              }),
              copy(path.join('./', '*'), tmpDir, {
                glob: true,
                single: false,
                strict: true,
                exists: 'error'
              }),
              edit(
                path.join(tmpDir, 'package.json'),
                (buffer) => {
                  const json = JSON.parse(String(buffer));
                  if (!TypeGuard.isArray(json.files)) {
                    throw Error(
                      `Compulsory files field in package.json not found`
                    );
                  }

                  const response = {
                    ...json,
                    files: [
                      ...json.files,
                      ...depsArr
                        .map((item) => item.tmpFile + '.tgz')
                        .filter((x, i, arr) => arr.indexOf(x) === i)
                    ],
                    dependencies: json.dependencies || {},
                    devDependencies: json.devDependencies || {},
                    optionalDependencies: json.optionalDependencies || {}
                  };

                  for (const dep of depsArr) {
                    response[dep.placement] = {
                      ...response[dep.placement],
                      [dep.name]: 'file:./' + dep.tmpFile + '.tgz'
                    };
                  }

                  return response;
                },
                { glob: false, strict: true }
              ),
              pkgPackTask({
                name: null,
                source: tmpDir,
                destDir: destination ? null : './',
                destFile: destination
              })
            ),
            remove(tmpDir, { strict: true, recursive: true })
          );
        })
  );
}
