import { recreate, lift, exec, catches, series, create } from 'kpo';

import riseup from './riseup.config.mjs';

export default recreate({ announce: true }, () => {
  const tasks = {
    build: exec('npm', ['run', 'build', '-ws']),
    commit: riseup.tasks.commit,
    coverage: riseup.tasks.coverage,
    release: exec('lerna', ['version', '--no-push', '--conventional-commits']),
    distribute: riseup.tasks.distribute,
    validate: series(
      create(() => tasks.checks),
      exec('npm', ['run', 'validate', '-ws'])
    ),
    /* Hooks */
    postinstall: create(() => tasks.build),
    version: series(
      create(() => tasks.checks),
      exec('npm', ['run', 'version', '-ws'])
    ),
    /* Reusable */
    checks: series(
      create(() => tasks.coverage),
      lift({ purge: true, mode: 'audit' }, () => tasks),
      catches({ level: 'silent' }, exec('npm', ['audit']))
    )
  };
  return tasks;
});
