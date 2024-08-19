import {
  catches,
  create,
  exec,
  finalize,
  lift,
  recreate,
  remove,
  series
} from 'kpo';

import defaults from './config/riseup.config.mjs';

export default Promise.resolve(defaults)
  .then(({ tasks }) => tasks)
  .then(({ assets, commit, explore, size, tarball }) => {
    const tasks = {
      start: exec('next', ['start'], {
        env: { NODE_NO_WARNINGS: 1, NEXT_TELEMETRY_DISABLED: 1 }
      }),
      watch: series(
        remove('.next/*', { glob: true, recursive: true }),
        exec('next', ['dev'], {
          env: { NODE_NO_WARNINGS: 1, NEXT_TELEMETRY_DISABLED: 1 }
        })
      ),
      build: series(
        create(() => tasks.assets),
        remove('build/*', { glob: true, recursive: true }),
        exec('next', ['build'], {
          env: { NODE_NO_WARNINGS: 1, NEXT_TELEMETRY_DISABLED: 1 }
        })
      ),
      tarball,
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
      assets,
      explore,
      size,
      commit,
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
    return recreate({ announce: true }, tasks);
  });
