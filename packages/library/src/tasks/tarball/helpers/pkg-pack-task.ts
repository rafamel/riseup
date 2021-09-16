import { v4 as uuid } from 'uuid';
import path from 'path';
import fs from 'fs';
import {
  create,
  exec,
  finalize,
  mkdir,
  move,
  remove,
  series,
  log,
  isCancelled,
  Task,
  context
} from 'kpo';
import { constants } from '@riseup/utils';

export interface PkgPackOptions {
  name: null | string;
  source: string;
  destDir: null | string;
  destFile: null | string;
}

export function pkgPackTask(options: PkgPackOptions): Task.Async {
  return context(
    { args: [] },
    create((ctx) => {
      const tmpDir = path.resolve(constants.tmp, uuid());

      return finalize(
        series(
          log('debug', 'Pack' + (options.name ? `: ${options.name}` : '')),
          mkdir(constants.tmp, { ensure: true }),
          mkdir(tmpDir, { ensure: false }),
          exec('npm', ['pack', path.resolve(ctx.cwd, options.source)], {
            cwd: tmpDir
          }),
          create(async (ctx) => {
            if (await isCancelled(ctx)) return;

            const files = await new Promise<string[]>((resolve, reject) => {
              return fs.readdir(tmpDir, null, (err, data) => {
                return err ? reject(err) : resolve(data);
              });
            });

            if (files.length !== 1) {
              throw Error(`Pack failed to produce a tarball`);
            }

            const file = files[0];
            const outputDir = options.destDir
              ? path.resolve(ctx.cwd, options.destDir)
              : ctx.cwd;
            const outputFile = path.resolve(
              outputDir,
              options.destFile ? `${options.destFile}.tgz` : file
            );

            return move(path.resolve(tmpDir, file), outputFile, {
              glob: true,
              single: true,
              strict: true,
              exists: 'overwrite'
            });
          })
        ),
        remove(tmpDir, { strict: true, recursive: true })
      );
    })
  );
}
