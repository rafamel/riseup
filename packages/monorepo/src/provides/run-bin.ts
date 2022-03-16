#!/usr/bin/env node

import { create, run, series, log, style, exec, context } from 'kpo';
import { getScopeDisplayName, getPackageJson } from '@riseup/utils';

run(
  {
    cwd: process.cwd(),
    args: process.argv.slice(2)
  },
  create((ctx) => {
    const [script, args] = [ctx.args[0], ctx.args.slice(1)];
    const scope = getScopeDisplayName(ctx.cwd);
    const pkg = getPackageJson(ctx.cwd, false);
    if (!pkg) {
      return log('debug', 'File package.json not found in scope:', scope);
    }
    if (!pkg.scripts) {
      return log('debug', 'No scripts found in scope:', scope);
    }
    if (!Object.hasOwnProperty.call(pkg.scripts, script)) {
      return log('debug', `Script ${script} not found in scope:`, scope);
    }

    return context(
      { args: [] },
      series(
        log('info', 'Scope:', style(scope, { bold: true })),
        exec('npm', ['run', ...['--loglevel', 'silent'], script, '--', ...args])
      )
    );
  })
).catch((err) => {
  return Promise.resolve()
    .then(() => run(null, log('error', err.message)))
    .finally(() => process.exit(1));
});
