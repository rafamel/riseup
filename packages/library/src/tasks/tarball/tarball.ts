import { Empty, Deep, TypeGuard } from 'type-core';
import { merge } from 'merge-strategies';
import { v4 as uuid } from 'uuid';
import path from 'path';
import {
  copy,
  create,
  edit,
  finalize,
  progress,
  remove,
  run,
  series,
  Task
} from 'kpo';
import { constants } from '@riseup/utils';
import { defaults } from '../../defaults';
import { hydrateLibraryGlobal } from '../../global';
import { pkgPackTask } from './helpers/pkg-pack-task';
import { resolvePkgMonorepoDeps } from './helpers/resolve-pkg-monorepo-deps';

export interface TarballParams {
  destination?: null | string;
  monorepo?: {
    contents?: null | string;
    allowPrivate?: boolean;
  };
}

export interface TarballOptions extends TarballParams {
  output?: string;
}

export function hydrateTarball(
  options: TarballOptions | Empty
): Deep.Required<TarballOptions> {
  const { output } = hydrateLibraryGlobal(options);

  return merge(
    {
      output,
      destination: defaults.tarball.destination,
      monorepo: defaults.tarball.monorepo
    },
    options || undefined
  );
}

export function tarball(options: TarballOptions | Empty): Task.Async {
  const opts = hydrateTarball(options);

  return progress(
    { message: 'Build tarball' },
    !opts.monorepo.contents
      ? // No monorepo
        pkgPackTask({
          name: null,
          source: opts.output,
          destDir: opts.destination ? null : opts.output,
          destFile: opts.destination
        })
      : // Monorepo resolution
        create(async (ctx) => {
          const tmpDir = path.resolve(constants.tmp, 'tarball-' + uuid());
          const resArr = await resolvePkgMonorepoDeps(ctx, {
            contents: String(opts.monorepo.contents),
            allowPrivate: opts.monorepo.allowPrivate
          });
          const tmpFilesRecord: Record<string, string> = {};
          const depsArr = resArr.map((item) => {
            if (Object.hasOwnProperty.call(tmpFilesRecord, item.name)) {
              return { ...item, tmpFile: tmpFilesRecord[item.name] };
            } else {
              const tmpFile = 'pkg-' + uuid();
              tmpFilesRecord[item.name] = tmpFile;
              return { ...item, tmpFile };
            }
          });

          return finalize(
            series(
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
                      source: path.resolve(
                        dep.path,
                        String(opts.monorepo.contents)
                      ),
                      destDir: tmpDir,
                      destFile: dep.tmpFile
                    })
                  );
                }
              }),
              copy(path.join(opts.output, '*'), tmpDir, {
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
                destDir: opts.destination ? null : opts.output,
                destFile: opts.destination
              })
            ),
            remove(tmpDir, { strict: true, recursive: true })
          );
        })
  );
}
