import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

import project from './project.config.mjs';

const extensions = project.extensions;
export default defineConfig({
  plugins: [tsconfigPaths({ projects: ['./tsconfig.json'] })],
  test: {
    /* Run options */
    watch: false,
    reporters: ['basic'],
    passWithNoTests: true,
    /* Setup */
    setupFiles: [],
    globalSetup: [],
    /* Environment */
    env: {},
    globals: true,
    isolate: true,
    environment: 'node',
    /* Test Ops */
    mockReset: false,
    clearMocks: true,
    restoreMocks: false,
    unstubEnvs: true,
    unstubGlobals: true,
    /* Test Match */
    include: [
      `src/**/__tests__/**/*.{${extensions.source.join(',')}}`,
      `{src,test}/**/*.{test,spec}.{${extensions.source.join(',')}}`
    ],
    /* Typecheck */
    typecheck: {
      enabled: true,
      checker: 'tsc',
      include: [
        `src/**/__tests__/**/*.d.{${extensions.source.join(',')}}`,
        `{src,test}/**/*.test-d.{${extensions.source.join(',')}}`
      ]
    },
    /* Coverage */
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      include: [`src/**/*.{${extensions.source.join(',')}}`],
      exclude: [
        '**/*.d.ts',
        `**/*.{test,spec}.{${extensions.source.join(',')}}`,
        '**/__mocks__/**',
        '**/__tests__/**',
        '**/@types/**',
        '**/vendor/**'
      ]
    }
  }
});
