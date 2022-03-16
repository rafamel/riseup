import {
  recreate,
  context,
  create,
  series,
  lift,
  exec,
  catches,
  silence
} from 'kpo';

import riseup from './riseup.config.mjs';

export default recreate({ announce: true }, () => {
  const tasks = {
    node: riseup.tasks.node,
    start: create(() => context({ args: ['start'] }, tasks.watch)),
    watch: series(
      context({ args: [] }, silence(exec('next', ['telemetry', 'disable']))),
      exec('next')
    ),
    build: series(
      create(() => tasks.lint),
      create(() => context({ args: ['build', '--no-lint'] }, tasks.watch)),
      create(() => tasks.size)
    ),
    export: create(() => context({ args: ['export'] }, tasks.watch)),
    assets: riseup.tasks.assets,
    explore: riseup.tasks.explore,
    size: riseup.tasks.size,
    fix: riseup.tasks.fix,
    lint: series(riseup.tasks.lintmd, riseup.tasks.lint),
    test: riseup.tasks.test,
    commit: riseup.tasks.commit,
    release: context({ args: ['--no-verify'] }, riseup.tasks.release),
    validate: series(
      create(() => tasks.lint),
      create(() => tasks.test),
      lift({ purge: true, mode: 'audit' }, () => tasks),
      catches({ level: 'silent' }, exec('npm', ['outdated']))
    ),
    /* Hooks */
    prepare: riseup.tasks.assets,
    version: create(() => tasks.validate)
  };
  return tasks;
});
