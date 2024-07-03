import { Preset } from '@riseup/utils';
import { Library } from '@riseup/library';
import { Tooling } from '@riseup/tooling';
import { Universal } from '@riseup/universal';

export default (build) => {
  return Preset.combine(
    new Library({
      docs: {
        // Build typedoc documentation
        build: false,
        // Documentation build folder
        destination: 'docs/',
        // Typedoc configuration overrides
        overrides: {}
      },
      distribute: {
        // Push repository and tags upon distribution (publication)
        push: true
      }
    }),
    new Tooling({
      global: {
        // Enable prettier
        prettier: true,
        // Project platform: node, browser, neutral
        platform: 'neutral',
        // Transpile loaders
        loaders: {},
        // Runtime stubs
        stubs: {}
      },
      node: {
        // Transpilation format for runtime: module, commonjs
        format: 'commonjs',
        // Paths to include in transpilation
        // Set to null to skip external modules
        include: ['*'],
        // Paths to override transpilation inclusions
        exclude: []
      },
      build: build.map((opts, i) => ({
        // Clean directory upon build
        clean: i === 0,
        // Output directory
        outdir: 'build/',
        // Entrypoints
        entries: ['src/index.ts'],
        // Formats: module, commonjs, iife
        formats: ['module'],
        // Build targets
        targets: ['node18'],
        // Enable minification
        minify: false,
        // Enable code splitting
        splitting: true,
        // Sourcemap mode: external, inline, none
        sourcemap: 'external',
        // Specifiers to include in bundle
        // Set to null to skip external modules
        include: null,
        // Specifiers to override bundle inclusions
        exclude: [],
        // Environment variables injection
        env: {},
        ...opts
      })),
      tarball: {
        // Package tarball file name
        destination: 'tarball',
        // Enable monorepo dependencies inclusion in tarball
        monorepo: false,
        // Override package.json properties
        package: null
      },
      lint: {
        // Directories to lint
        dir: ['src/', 'test/'],
        // Run type checks
        types: true,
        // Enable react presets
        react: true,
        // Keywords that should output warnings
        highlight: ['fixme', 'todo', 'refactor'],
        // ESLint rules overwrites
        rules: {
          'no-extra-boolean-cast': 0,
          '@typescript-eslint/no-use-before-define': 0
        }
      },
      test: {
        // Whether to print all passed tests
        verbose: false,
        // RegExp array of files to ignore
        ignore: [],
        // Array of setup files
        require: [],
        // Files to include in coverage: auto, all, none
        coverage: 'auto',
        // Fail when coverage is under the threshold
        threshold: null,
        // Jest configuration overrides
        overrides: {},
        // Paths to include in transpilation
        // Set to null to skip external modules
        include: ['*'],
        // Paths to override transpilation inclusions
        exclude: []
      }
    }),
    new Universal({
      lintmd: {
        // Glob of markdown files to lint
        include: './**/*.md',
        // Glob of markdown files to exclude
        exclude:
          '{CHANGELOG.md,node_modules/**/*,pkg/**/*,build/**/*,dist/**/*}',
        // Markdownlint configuration overrides
        overrides: {}
      },
      release: {
        // Conventional commits preset
        preset: 'angular',
        // Generate changelog upon release (version bump)
        changelog: true
      }
    })
  );
};
