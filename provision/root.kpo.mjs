import { recreate, lift, exec, catches, series, create } from 'kpo';

import riseup from './root.riseup.mjs';

export default recreate({ announce: true }, () => {
  const tasks = {
    build: series(
      exec('npm', ['run', 'build'], { cwd: './utils' }),
      exec('npm', ['run', 'build'], { cwd: './universal' }),
      exec('npm', ['run', 'build'], { cwd: './web' }),
      exec('npm', ['run', 'build'], { cwd: './cli' })
    ),
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
      catches({ level: 'silent' }, exec('npm', ['audit']))
    ),
  };
  return tasks;
});
