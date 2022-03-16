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
    exec('npm', ['run', 'build'], { cwd: './utils' }),
    exec('npm', ['run', 'build'], { cwd: './universal' }),
    exec('npm', ['run', 'build'], { cwd: './tooling' }),
    exec('npm', ['run', 'build'], { cwd: './monorepo' }),
    exec('npm', ['run', 'build'], { cwd: './library' }),
    exec('npm', ['run', 'build'], { cwd: './web' }),
    exec('npm', ['run', 'build'], { cwd: './cli' })
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
