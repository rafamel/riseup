import { catches, create, exec, finalize, lift, recreate, series } from 'kpo';

import project from './config/project.config.mjs';
import riseup from './config/riseup.config.mjs';

import { build as swc } from './config/swc.config.mjs';

export default recreate({ announce: true }, () => {
  const tasks = {
    start: exec('node', [project.build.destination]),
    watch: exec('tsx', ['--watch', './src']),
    build: series(riseup.tasks.contents, swc),
    tarball: riseup.tasks.tarball,
    docs: exec('typedoc', ['--options', './config/typedoc.config.json']),
    lint: finalize(exec('eslint', ['.']), exec('tsc', ['--noEmit'])),
    fix: exec('eslint', ['.', '--fix']),
    test: exec('jest', ['-c', './config/jest.config.mjs']),
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
