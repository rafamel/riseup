import { Serial, TypeGuard } from 'type-core';

import { defaults } from '../defaults';
import { paths } from '../paths';
import { Transpile, Transpiler, Extensions } from '../utils';

export interface ConfigureJestParams {
  verbose?: boolean;
  ignore?: string[];
  require?: string[];
  coverage?: 'auto' | 'all' | 'none';
  threshold?: number | null;
  overrides?: Serial.Object;
}

export interface ConfigureJestOptions {
  platform?: Transpile.Platform;
  loaders?: Transpile.Loaders;
  stubs?: Transpiler.Stubs;
}

export function configureJest(
  params: ConfigureJestParams | null,
  options: ConfigureJestOptions | null
): Serial.Object {
  const opts = {
    verbose: TypeGuard.isBoolean(params?.verbose)
      ? params?.verbose
      : defaults.test.verbose,
    ignore: params?.ignore || defaults.test.ignore,
    require: params?.require || defaults.test.require,
    coverage: params?.coverage || defaults.test.coverage,
    threshold: TypeGuard.isUndefined(params?.threshold)
      ? defaults.test.threshold
      : params?.threshold,
    overrides: params?.overrides || defaults.test.overrides,
    platform: options?.platform || defaults.global.platform,
    loaders: { ...defaults.global.loaders, ...(options?.loaders || {}) },
    stubs: { ...defaults.global.stubs, ...(options?.stubs || {}) }
  };

  const extensions = Extensions.merge(
    new Extensions(opts.loaders),
    new Extensions(opts.stubs).map(() => 'stub' as const)
  );
  const extall = extensions.extensions().map((ext) => ext.slice(1));
  const extcode = extensions
    .filter(['js', 'jsx', 'ts', 'tsx'], null)
    .extensions()
    .map((ext) => ext.slice(1));

  return {
    injectGlobals: false,
    testEnvironment: opts.platform === 'browser' ? 'jsdom' : 'node',
    moduleFileExtensions: extcode,
    modulePathIgnorePatterns: [
      '.*\\.d\\.ts$',
      '/__mocks__/',
      '/@types/',
      ...opts.ignore
    ],
    setupFiles: [...opts.require],
    resolver: paths.jestResolver,
    transform: {
      [`^.+\\.(${extall.join('|')})$`]: paths.jestTransform
    },
    transformIgnorePatterns: [],
    testMatch: [
      `**/__tests__/**/*.{${extcode.join(',')}}`,
      `**/?(*.)+(spec|test).{${extcode.join(',')}}`
    ],
    testPathIgnorePatterns: [
      `.*/(test|spec)\\.(${extcode.join('|')})$`,
      '/node_modules/',
      ...opts.ignore
    ],
    // Coverage
    coverageProvider: 'v8',
    ...(opts.coverage === 'none'
      ? { collectCoverage: false }
      : {
          collectCoverage: true,
          coveragePathIgnorePatterns: [
            '.*\\.d\\.ts$',
            '/node_modules/',
            '/__mocks__/',
            '/@types/',
            '/vendor/',
            ...opts.ignore
          ]
        }),
    ...(opts.coverage === 'all'
      ? {
          collectCoverageFrom: [
            `<rootDir>/src/**/*.{${extcode.join(',')}}`,
            '!**/node_modules/**',
            '!**/__mocks__/**',
            '!**/@types/**',
            '!**/vendor/**'
          ]
        }
      : {}),
    ...(opts.coverage !== 'none' && opts.threshold
      ? {
          coverageThreshold: {
            global: {
              lines: opts.threshold,
              branches: opts.threshold,
              functions: opts.threshold,
              statements: opts.threshold
            }
          }
        }
      : {}),
    ...opts.overrides
  };
}
