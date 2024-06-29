import tasks from '../kpo.packages.mjs';

export default tasks([
  {
    entries: {
      index: 'src/index.ts',
      'commitizen-bin': 'src/provides/commitizen-bin.ts',
      'coverages-bin': 'src/provides/coverages-bin.ts'
    }
  }
]);
