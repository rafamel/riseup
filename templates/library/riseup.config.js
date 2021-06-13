const { library } = require('@riseup/library');

module.exports = library(
  {
    global: {
      prettier: true,
      alias: { '@root': './src' }
    },
    build: {
      assets: [],
      types: true,
      tarball: false,
      destination: 'pkg/',
      targets: { node: '12.0.0' },
      multitarget: true,
      manifest: {}
    },
    docs: {
      build: true,
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
      coverage: 'auto',
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
