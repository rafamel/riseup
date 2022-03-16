#!/usr/bin/env node

import path from 'node:path';
import { create, run, log, exec } from 'kpo';

import { paths } from '../paths';

run(
  {
    cwd: process.cwd(),
    args: process.argv.slice(2)
  },
  create((ctx) => {
    const infile = ctx.args[0];
    const outdir = ctx.args[1];
    const tempfile = path.join(
      outdir,
      Math.random().toString().slice(2) + '.info'
    );
    return exec(process.execPath, [
      paths.lcovResultMergerBin,
      infile,
      tempfile
    ]);
  })
).catch((err) => {
  return Promise.resolve()
    .then(() => run(null, log('error', err.message)))
    .finally(() => process.exit(1));
});
