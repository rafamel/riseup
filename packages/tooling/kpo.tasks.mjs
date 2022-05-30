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
      'babel-inline': 'src/provides/babel-inline.ts',
      'jest-transform': 'src/provides/jest-transform.ts',
      'jest-resolver': 'src/provides/jest-resolver.ts'
    }
  }
]);
