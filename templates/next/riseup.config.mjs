import { Preset } from '@riseup/utils';
import { Web } from '@riseup/web';
import { Tooling } from '@riseup/tooling';
import { Universal } from '@riseup/universal';

import app from './app.config.js';

export default Preset.combine(
  new Web({
    assets: {
      // Clean all contents of assets destination folder
      clean: true,
      // Destination folder for assets
      destination: 'public',
      // Array of globs for files to copy to assets folder
      copy: ['static/*'],
      // Google fonts to download -see: https://bit.ly/2TREByt
      fonts: {
        // Fonts display
        display: 'swap',
        // Fonts subsets
        subsets: ['latin-ext'],
        // Font families object
        families: app.fonts
      },
      // Build favicons and manifest
      favicons: {
        // Path of source image
        logo: app.logo,
        // Favicons options
        options: {
          appName: app.manifest.name,
          appShortName: app.manifest.shortName,
          appDescription: app.manifest.description,
          ...app.manifest
        }
      },
      // Result json
      result: {
        // Base url for assets
        url: app.application.url,
        // File path for result
        path: 'src/vendor/result.json',
        // Serializable content
        values: {
          application: app.application,
          manifest: app.manifest,
          breakpoints: app.breakpoints
        }
      }
    },
    explore: {
      // Sources directory for exploration
      dir: 'build/static/chunks'
    },
    size: {
      // Sources directory for size analysis
      dir: 'build/static',
      // Fail when code assets go over the limit
      limit: '512 kB',
      // RegExp of files to exclude
      exclude: /\.map$/
    }
  }),
  new Tooling({
    global: {
      // Enable prettier
      prettier: true,
      // Project platform: node, browser, neutral
      platform: 'browser',
      // Runtime stubs
      stubs: {
        '.ttf,.otf,.eot,.woff,.woff2': 'file://stub-url',
        '.css,.scss,.sass,.less': {
          'stub-style': true
        },
        '.jpg,.jpeg,.png,.gif,.bmp,.svg': {
          src: 'file://stub-url',
          placeholder: 'stub-placeholder',
          height: 100,
          width: 100
        }
      }
    },
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
      rules: {}
    },
    test: {
      // Whether to print all passed tests
      verbose: false,
      // Regex array of files to ignore
      ignore: [],
      // Array of setup files
      require: [],
      // Files to include in coverage (auto, all, or none)
      coverage: 'none',
      // Fail when coverage is under the threshold
      threshold: null,
      // Jest configuration overrides
      overrides: {},
      // RegExp of files to exclude from transpilation.
      // Set to true to exclude external modules.
      exclude: false
    }
  }).intercept('eslint', (configuration) => ({
    ...configuration,
    extends: [...configuration.extends, 'plugin:@next/next/recommended']
  })),
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
