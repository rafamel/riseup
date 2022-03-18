import { Preset } from '@riseup/utils';
import { Library } from '@riseup/library';
import { Tooling } from '@riseup/tooling';
import { Universal } from '@riseup/universal';

export default (build) => {
  return Preset.combine(
    new Library({
      tarball: {
        // Package tarball file name
        destination: 'tarball',
        // Enable monorepo dependencies inclusion in tarball
        monorepo: false
      },
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
        targets: ['node16'],
        // Enable minification
        minify: false,
        // Enable code splitting
        splitting: false,
        // Sourcemap mode: external, inline, none
        sourcemap: 'external',
        // RegExp of files to exclude from bundle.
        // Set to true to exclude external modules.
        exclude: true,
        // Environment variables injection
        env: {},
        ...opts
      })),
      node: {
        // Transpilation format for runtime: module, commonjs
        format: 'commonjs',
        // RegExp of files to exclude from transpilation.
        // Set to true to exclude external modules.
        exclude: false
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
          // ts only
          'no-unused-vars': 0,
          'unicorn/prefer-optional-catch-binding': 0,
          // all
          'object-shorthand': 2,
          'unicorn/prefer-spread': 0,
          'unicorn/no-array-reduce': 0,
          'unicorn/no-useless-spread': 0,
          'unicorn/prefer-array-flat-map': 0,
          'unicorn/explicit-length-check': 0
        }
      },
      test: {
        // Whether to print all passed tests
        verbose: false,
        // RegExp array of files to ignore
        ignore: [],
        // Array of setup files
        require: [],
        // Files to include in coverage (auto, all, or none)
        coverage: 'auto',
        // Fail when coverage is under the threshold
        threshold: null,
        // Jest configuration overrides
        overrides: {},
        // RegExp of files to exclude from transpilation.
        // Set to true to exclude external modules.
        exclude: false
      }
    }),
    new Universal({
      lintmd: {
        // Glob of markdown files to lint
        include: './README.md',
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
