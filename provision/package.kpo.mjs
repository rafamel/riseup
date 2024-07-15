import { catches, create, exec, finalize, lift, recreate, series } from 'kpo';

import project from './package.project.mjs';
import riseup from './package.riseup.mjs';

export default recreate({ announce: true }, () => {
  const tasks = {
    start: exec('node', [project.build.destination]),
    watch: exec('tsx', ['--watch', './src']),
    build: series(
      riseup.tasks.contents,
      exec('tsup', ['--config', './config/tsup.config.mts']),
      riseup.tasks.tarball
    ),
    lint: finalize(
      exec('eslint', ['.']),
      exec('tsc', ['--noEmit']),
      exec('prettier', ['.', '--log-level', 'warn', '--cache', '--check'])
    ),
    fix: series(
      exec('eslint', ['.', '--fix']),
      exec('prettier', ['.', '--log-level', 'warn', '--write'])
    ),
    test: exec('vitest', ['-c', './config/vitest.config.mts']),
    commit: riseup.tasks.commit,
    release: riseup.tasks.release,
    distribute: riseup.tasks.distribute,
    validate: series(
      create(() => tasks.lint),
      create(() => tasks.test),
      lift(
        {
          purge: true,
          mode: 'audit',
          bin: '../../provision/node_modules/.bin/kpo',
        },
        () => tasks
      ),
      catches({ level: 'silent' }, exec('npm', ['audit']))
    ),
    /* Hooks */
    version: series(
      create(() => tasks.validate),
      create(() => tasks.build),
      exec('git', ['add', '.'])
    ),
  };
  return tasks;
});
