import { recreate, context, create, series, lift, exec, catches } from 'kpo';

import presets from './riseup.packages.mjs';

export default (build) => {
  const riseup = presets(build);
  return recreate({ announce: true }, () => {
    const tasks = {
      node: riseup.tasks.node,
      build: series(riseup.tasks.build, riseup.tasks.tarball),
      docs: riseup.tasks.docs,
      fix: riseup.tasks.fix,
      lint: series(riseup.tasks.lintmd, riseup.tasks.lint),
      test: riseup.tasks.test,
      commit: riseup.tasks.commit,
      release: context({ args: ['--no-verify'] }, riseup.tasks.release),
      distribute: riseup.tasks.distribute,
      validate: series(
        create(() => tasks.lint),
        create(() => tasks.test),
        lift({ purge: true, mode: 'audit' }, () => tasks),
        catches({ level: 'silent' }, exec('npm', ['outdated']))
      ),
      /* Hooks */
      version: series(
        create(() => tasks.validate),
        create(() => tasks.build),
        create(() => tasks.docs)
      )
    };
    return tasks;
  });
};
