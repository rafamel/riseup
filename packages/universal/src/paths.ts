import path from 'node:path';
import { URL } from 'node:url';

import { resolveBin, resolveModule } from '@riseup/utils';

const url = new URL(import.meta.url);
export const paths = {
  conventionalChangelogDir: path.resolve(
    resolveModule('cz-conventional-changelog/package.json', url),
    '../'
  ),
  commitizenBin: resolveModule('./provides/commitizen-bin.js', url),
  commitizenDir: path.resolve(
    resolveModule('commitizen/package.json', url),
    '../'
  ),
  lcovResultMergerBin: resolveBin(
    'lcov-result-merger',
    'lcov-result-merger',
    url
  ),
  releaseItBin: resolveBin('release-it', 'release-it', url),
  releaseItPluginChangelog: resolveModule(
    '@release-it/conventional-changelog',
    url
  ),
  releaseItPluginWorkspaces: resolveModule(
    '@release-it-plugins/workspaces',
    url
  )
};
