import path from 'node:path';
import { URL } from 'node:url';
import { resolveBin, resolveModule } from '@riseup/utils';

const url = new URL(import.meta.url);

export const paths = {
  lernaBin: resolveBin('lerna', 'lerna', url),
  conventionalChangelogBin: resolveBin(
    'conventional-changelog-cli',
    'conventional-changelog',
    url
  ),
  conventionalChangelogDir: path.resolve(
    resolveModule('cz-conventional-changelog/package.json', url),
    '../'
  ),
  commitizenBin: resolveModule('./commitizen-bin.js', url),
  commitizenDir: path.resolve(
    resolveModule('commitizen/package.json', url),
    '../'
  ),
  markdownlintBin: resolveBin('markdownlint-cli', 'markdownlint', url)
};
