import { recreate, lift, exec, catches, series, context, create } from 'kpo';

import riseup from './riseup.config.mjs';

export default recreate({ announce: true }, () => {
  const tasks = {
    run: riseup.tasks.run,
    execute: riseup.tasks.execute,
    build: series(
      exec('lerna', ['link']),
      exec('kpo', ['build'], { cwd: './utils' }),
      exec('kpo', ['build'], { cwd: './universal' }),
      exec('kpo', ['build'], { cwd: './tooling' }),
      exec('kpo', ['build'], { cwd: './monorepo' }),
      exec('kpo', ['build'], { cwd: './library' }),
      exec('kpo', ['build'], { cwd: './web' }),
      exec('kpo', ['build'], { cwd: './cli' })
    ),
    lint: riseup.tasks.lintmd,
    coverage: riseup.tasks.coverage,
    commit: riseup.tasks.commit,
    release: context({ args: ['--no-verify'] }, riseup.tasks.release),
    distribute: riseup.tasks.distribute,
    validate: series(
      exec('lerna', ['link']),
      context({ args: ['validate'] }, riseup.tasks.run),
      create(() => tasks.version)
    ),
    /* Hooks */
    postinstall: series(
      exec('lerna', ['bootstrap', '--ci']),
      create(() => tasks.build)
    ),
    version: series(
      create(() => tasks.lint),
      create(() => tasks.coverage),
      lift({ purge: true, mode: 'audit' }, () => tasks),
      catches({ level: 'silent' }, exec('npm', ['outdated']))
    )
  };
  return tasks;
});
