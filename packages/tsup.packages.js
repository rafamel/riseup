import { defineConfig } from 'tsup';

const cwd = process.cwd();

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    ...(cwd.endsWith('cli')
      ? {
          riseup: 'src/riseup.ts'
        }
      : {}),
    ...(cwd.endsWith('universal')
      ? {
          'commitizen-bin': 'src/provides/commitizen-bin.ts'
        }
      : {}),
    ...(cwd.endsWith('tooling')
      ? {
          'build-bin': 'src/provides/build-bin.ts',
          'transpile-loader': 'src/provides/transpile-loader.ts',
          'transpile-register': 'src/provides/transpile-register.ts',
          'jest-transform': 'src/provides/jest-transform.ts',
          'jest-resolver': 'src/provides/jest-resolver.ts'
        }
      : {}),
    ...(cwd.endsWith('monorepo')
      ? {
          'run-bin': 'src/provides/run-bin.ts',
          'execute-bin': 'src/provides/execute-bin.ts',
          'coverage-bin': 'src/provides/coverage-bin.ts'
        }
      : {})
  },
  format: ['esm', 'cjs'],
  platform: 'node',
  target: ['node16'],
  outDir: 'build',
  dts: true,
  splitting: true,
  sourcemap: true,
  minify: false,
  clean: false
});
