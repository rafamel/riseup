import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const extensions = ['cjs', 'mjs', 'js', 'jsx', 'cts', 'mts', 'ts', 'tsx'];

export default defineConfig({
  plugins: [react(), tsconfigPaths({ projects: ['./tsconfig.json'] })],
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
    environment: 'jsdom',
    /* Test Ops */
    mockReset: false,
    clearMocks: true,
    restoreMocks: false,
    unstubEnvs: true,
    unstubGlobals: true,
    /* Test Match */
    include: [
      `src/**/__tests__/**/*.{${extensions.join(',')}}`,
      `{src,test}/**/*.{test,spec}.{${extensions.join(',')}}`
    ],
    /* Typecheck */
    typecheck: {
      enabled: true,
      checker: 'tsc',
      include: [
        `src/**/__tests__/**/*.d.{${extensions.join(',')}}`,
        `{src,test}/**/*.test-d.{${extensions.join(',')}}`
      ]
    },
    /* Coverage */
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      include: [`src/**/*.{${extensions.join(',')}}`],
      exclude: [
        '**/*.d.ts',
        `**/*.{test,spec}.{${extensions.join(',')}}`,
        '**/__mocks__/**',
        '**/__tests__/**',
        '**/@types/**',
        '**/vendor/**'
      ]
    }
  }
});
