import fs from 'node:fs';
import path from 'node:path';
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
import { getTmpDir } from '@riseup/utils';

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
      // TODO: remove on cancellation
      const tmpDir = getTmpDir();

      return finalize(
        series(
          log('debug', 'Pack' + (options.name ? `: ${options.name}` : '')),
          mkdir(tmpDir, { ensure: false }),
          exec('npm', ['pack', path.resolve(ctx.cwd, options.source)], {
            cwd: tmpDir
          }),
          create(async (ctx) => {
            if (isCancelled(ctx)) return;

            const files = await new Promise<string[]>((resolve, reject) => {
              return fs.readdir(tmpDir, null, (err, data) => {
                return err ? reject(err) : resolve(data);
              });
            });

            if (files.length !== 1) {
              throw new Error(`Pack failed to produce a tarball`);
            }

            const file = files[0];
            const outputDir = options.destDir
              ? path.resolve(ctx.cwd, options.destDir)
              : ctx.cwd;
            const outputFile = path.resolve(
              outputDir,
              options.destFile ? options.destFile : file
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
