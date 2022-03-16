const {
  recreate,
  context,
  create,
  series,
  lift,
  exec,
  catches,
  log,
  remove,
  mkdir,
  move
} = require('kpo');
const riseup = require('./riseup.packages');

const tasks = {
  node: riseup.node,
  build: series(
    mkdir('build', { ensure: true }),
    remove('build/*', { glob: true, recursive: true }),
    exec('tsup'),
    exec('npm', ['pack']),
    move('./riseup-*.tgz', './tarball.tgz', {
      glob: true,
      single: true,
      exists: 'overwrite'
    })
  ),
  docs: riseup.docs,
  fix: riseup.fix,
  lint: series(riseup.lintmd, riseup.lint),
  test: create((ctx) => {
    return ctx.cwd.endsWith('react')
      ? log('warn', 'Skip test for react package')
      : riseup.test;
  }),
  commit: riseup.commit,
  release: context({ args: ['--no-verify'] }, riseup.release),
  distribute: riseup.distribute,
  validate: series(
    create(() => tasks.lint),
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

module.exports = recreate({ announce: true }, tasks);
