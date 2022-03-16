import tasks from '../kpo.packages.mjs';

export default tasks([
  {
    entries: {
      index: 'src/index.ts',
      'run-bin': 'src/provides/run-bin.ts',
      'execute-bin': 'src/provides/execute-bin.ts',
      'coverage-bin': 'src/provides/coverage-bin.ts'
    }
  }
]);
