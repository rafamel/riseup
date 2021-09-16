const {
  recreate,
  lift,
  exec,
  catches,
  series,
  context,
  create
} = require('kpo');
const riseup = require('./riseup.config');

const tasks = {
  run: riseup.run,
  execute: riseup.execute,
  build: series(
    exec('lerna', ['link']),
    exec('kpo', ['build'], { cwd: './utils' }),
    exec('kpo', ['build'], { cwd: './universal' }),
    exec('kpo', ['build'], { cwd: './tooling' }),
    exec('kpo', ['build'], { cwd: './monorepo' }),
    exec('kpo', ['build'], { cwd: './library' }),
    exec('kpo', ['build'], { cwd: './next' }),
    exec('kpo', ['build'], { cwd: './cli' })
  ),
  lint: riseup.lintmd,
  coverage: riseup.coverage,
  commit: riseup.commit,
  release: context({ args: ['--no-verify'] }, riseup.release),
  distribute: riseup.distribute,
  validate: series(
    exec('lerna', ['link']),
    context({ args: ['validate'] }, riseup.run),
    create(() => tasks.version)
  ),
  /* Hooks */
  postinstall: series(
    catches(null, exec('simple-git-hooks')),
    exec('lerna', ['bootstrap', '--ci']),
    create(() => tasks.build)
  ),
  version: series(
    create(() => tasks.lint),
    create(() => tasks.coverage),
    lift({ purge: true, mode: 'audit' }, () => tasks),
    catches({ level: 'silent' }, exec('npm', ['outdated']))
  )
};

module.exports = recreate({ announce: true }, tasks);
