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
          'version',
          '--no-push',
          '--conventional-commits'
        ]),
        distribute,
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
          lift(
            {
              purge: { keep: ['postinstall'] },
              mode: 'audit',
              bin: '../provision/node_modules/.bin/kpo'
            },
            () => tasks
          ),
          catches({ level: 'silent' }, exec('npm', ['audit']))
        )
      };
      return recreate({ announce: true }, tasks);
    };
  });
