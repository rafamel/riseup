import defaults from './riseup.config.mjs';

export default Promise.resolve(defaults)
  .then(({ tasks }) => tasks)
  .then(({ commit, coverage, distribute }) => {
    return ({ catches, create, exec, lift, recreate, series }) => {
      const tasks = {
        build: series(
          exec('npm', ['run', 'build'], { cwd: './utils' }),
          exec('npm', ['run', 'build'], { cwd: './universal' }),
          exec('npm', ['run', 'build'], { cwd: './web' }),
          exec('npm', ['run', 'build'], { cwd: './cli' })
        ),
        commit,
        coverage,
        release: exec('lerna', [
          ...['version', '--no-push', '--conventional-commits'],
          ...['--concurrency', '1']
        ]),
        distribute,
        validate: series(
          exec('npm', ['run', 'validate', '-ws']),
          create(() => tasks['validate:root'])
        ),
        'validate:root': series(
          create(() => tasks.coverage),
          lift(
            {
              purge: { keep: ['postinstall'] },
              mode: 'audit',
              bin: '../provision/node_modules/.bin/kpo'
            },
            () => tasks
          ),
          catches({ level: 'silent' }, exec('npm', ['audit']))
        ),
        /* Hooks */
        version: series(
          create(() => tasks['validate:root']),
          exec('npm', ['run', 'version', '-ws'])
        )
      };
      return recreate({ announce: true }, tasks);
    };
  });
