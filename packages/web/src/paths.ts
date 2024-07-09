import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';

import { resolveBin } from '@riseup/utils';

const url = new URL(import.meta.url);

export const paths = {
  rootDir: path.resolve(fileURLToPath(url), '../'),
  sizeLimitBin: resolveBin('size-limit', 'size-limit', url),
  sourceMapExplorerBin: resolveBin(
    'source-map-explorer',
    'source-map-explorer',
    url
  ),
  faviconSvg: path.resolve(fileURLToPath(url), '../static/favicon.svg')
};
