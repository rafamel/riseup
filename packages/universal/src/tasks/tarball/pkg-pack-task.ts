import fs from 'node:fs';
import path from 'node:path';

import {
  type Task,
  context,
  create,
  exec,
  isCancelled,
  log,
  move,
  series,
  tmp
} from 'kpo';

export interface PkgPackOptions {
  name: null | string;
  source: string;
  destDir: null | string;
  destFile: null | string;
}

export function pkgPackTask(options: PkgPackOptions): Task.Async {
  const task = create((ctx) => {
    return tmp(null, ({ directory }) => {
      return series(
        log('debug', 'Pack' + (options.name ? `: ${options.name}` : '')),
        exec('npm', ['pack', path.resolve(ctx.cwd, options.source)], {
          cwd: directory
        }),
        create(async (ctx) => {
          if (isCancelled(ctx)) return;

          const files = await new Promise<string[]>((resolve, reject) => {
            return fs.readdir(directory, null, (err, data) => {
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

          return move(path.resolve(directory, file), outputFile, {
            glob: true,
            single: true,
            strict: true,
            exists: 'overwrite'
          });
        })
      );
    });
  });

  return context({ args: [] }, task);
}
