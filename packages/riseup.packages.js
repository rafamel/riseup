const { library } = require('@riseup/library');

module.exports = library(
  {
    global: {
      prettier: true,
      alias: {}
    },
    build: {
      assets:
        process.cwd().endsWith('tooling') || process.cwd().endsWith('next')
          ? ['static/']
          : [],
      types: true,
      tarball: 'pkg/tarball',
      destination: 'pkg/',
      targets: { node: '12.0.0' },
      multitarget: false,
      manifest: {}
    },
    docs: {
      build: false,
      destination: 'docs/',
      overrides: { exclude: [] }
    },
    fix: {
      dir: ['src/', 'test/']
    },
    lint: {
      types: true,
      dir: ['src/', 'test/'],
      highlight: ['fixme', 'todo', 'refactor'],
      rules: {}
    },
    lintmd: {
      include: './README.md',
      overrides: {}
    },
    test: {
      verbose: false,
      ignore: [],
      require: [],
      coverage: 'all',
      threshold: 0,
      overrides: {}
    },
    release: {
      preset: 'angular',
      changelog: true
    },
    distribute: {
      push: true,
      contents: 'pkg/'
    }
  },
  {
    babel: (config) => config,
    typescript: (config) => config,
    eslint: (config) => config,
    jest: (config) => config,
    pika: (config) => config,
    typedoc: (config) => config,
    markdownlint: (config) => config
  }
);
