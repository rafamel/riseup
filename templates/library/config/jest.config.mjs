import process from 'node:process';
import { convert } from 'tsconfig-to-swcconfig';

import project from './project.config.mjs';

const extensions = project.extensions;
const swc = convert();
export default async () => ({
  /* Root Paths  */
  roots: ['<rootDir>/../src/', '<rootDir>/../test/'],
  /* Environment */
  setupFiles: [],
  clearMocks: true,
  injectGlobals: false,
  testEnvironment: 'node',
  passWithNoTests: true,
  /* Modules */
  moduleFileExtensions: extensions.source.concat(extensions.content),
  modulePathIgnorePatterns: ['.*\\.d\\.ts$', '/__mocks__/', '/@types/'],
  extensionsToTreatAsEsm: extensions.source
    .filter((ext) => !['cjs', 'mjs', 'js'].includes(ext))
    .map((ext) => `.${ext}`),
  /* Coverage */
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/../coverage',
  coverageThreshold: { global: {} },
  collectCoverageFrom: [
    `<rootDir>/../src/**/*.{${extensions.source.join(',')}}`
  ],
  coveragePathIgnorePatterns: [
    '.*\\.d\\.ts$',
    '/node_modules/',
    '/__mocks__/',
    '/@types/',
    '/vendor/'
  ],
  /* Test Match Patterns */
  testMatch: [`<rootDir>/../**/*.{test,spec}.{${extensions.source.join(',')}}`],
  testPathIgnorePatterns: [
    `.*/(test|spec)\\.(${extensions.source.join('|')})$`,
    '/node_modules/'
  ],
  /* Transforms */
  transformIgnorePatterns: [],
  transform: {
    [`^.+\\.(${extensions.source.concat(extensions.content).join('|')})$`]: [
      '@swc/jest',
      {
        ...swc,
        $schema: 'https://swc.rs/schema.json',
        minify: false,
        sourceMaps: 'inline',
        module: {
          ...swc.module,
          type: 'es6',
          resolveFully: false,
          ignoreDynamic: false
        },
        env: {
          ...swc.env,
          targets: 'Node >= ' + process.version.split(/v|\./).at(1)
        },
        jsc: {
          ...swc.jsc,
          target: null,
          keepClassNames: true,
          externalHelpers: false,
          preserveAllComments: true
        }
      }
    ]
  }
});
