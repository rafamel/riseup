import tasks from '../kpo.packages.mjs';

export default tasks([
  {
    entries: {
      index: 'src/index.ts',
      'build-bin': 'src/provides/build-bin.ts',
      'transpile-loader': 'src/provides/transpile-loader.ts'
    }
  },
  {
    formats: ['commonjs'],
    entries: {
      'jest-transform': 'src/provides/jest-transform.ts',
      'jest-resolver': 'src/provides/jest-resolver.ts'
    }
  }
]);
