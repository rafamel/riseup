import { catches, create, exec, lift, recreate, series } from 'kpo';

import defaults from './riseup.config.mjs';

export default Promise.resolve(defaults)
  .then(({ tasks }) => tasks)
  .then(({ commit, coverage, distribute }) => {
    const tasks = {
      build: exec('npm', ['run', 'build', '-ws']),
      commit,
      coverage,
      release: exec('lerna', [
        ...['version', '--no-push', '--conventional-commits'],
        ...['--concurrency', '1']
      ]),
      distribute,
      validate: series(
        create(() => tasks['validate:root']),
        exec('npm', ['run', 'validate', '-ws'])
      ),
      'validate:root': series(
        create(() => tasks.coverage),
        lift({ purge: true, mode: 'audit' }, () => tasks),
        catches({ level: 'silent' }, exec('npm', ['audit']))
      ),
      /* Hooks */
      postinstall: create(() => tasks.build),
      version: series(
        create(() => tasks['validate:root']),
        exec('npm', ['run', 'version', '-ws'])
      )
    };
    return recreate({ announce: true }, tasks);
  });
