import { catches, create, exec, finalize, lift, recreate, series } from 'kpo';

import project from './config/project.config.mjs';
import riseup from './config/riseup.config.mjs';

export default recreate({ announce: true }, () => {
  const tasks = {
    start: exec('node', [project.build.destination]),
    watch: exec('tsx', ['--watch', './src']),
    build: exec('tsup', ['--config', './config/tsup.config.mts']),
    tarball: riseup.tasks.tarball,
    docs: exec('typedoc', ['--options', './config/typedoc.config.json']),
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
      lift({ purge: true, mode: 'audit' }, () => tasks),
      catches({ level: 'silent' }, exec('npm', ['audit']))
    ),
    /* Hooks */
    version: series(
      create(() => tasks.validate),
      create(() => tasks.build),
      create(() => series(tasks.docs, exec('git', ['add', '.'])))
    )
  };
  return tasks;
});
