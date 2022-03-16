import { URL } from 'node:url';
import { resolveBin, resolveModule } from '@riseup/utils';

const url = new URL(import.meta.url);

export const paths = {
  lernaBin: resolveBin('lerna', 'lerna', url),
  lcovResultMergerBin: resolveBin(
    'lcov-result-merger',
    'lcov-result-merger',
    url
  ),
  runBin: resolveModule('./run-bin.js', url),
  executeBin: resolveModule('./execute-bin.js', url),
  coverageBin: resolveModule('./coverage-bin.js', url)
};
