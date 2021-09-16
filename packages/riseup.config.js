const { monorepo } = require('@riseup/monorepo');

module.exports = monorepo(
  {
    lintmd: {
      // Glob of markdown files to lint
      include: '../README.md',
      // Configuration overrides for markdownlint
      overrides: {}
    },
    release: {
      // Conventional commits preset
      preset: 'angular',
      // Generate changelog upon release (version bump)
      changelog: true
    },
    distribute: {
      // Push repository and tags upon distribution (publication)
      push: true,
      // Folder to publish -for all packages
      contents: 'pkg/',
      // Package registry for publication
      registry: null
    }
  },
  { markdownlint: (config) => config }
);
