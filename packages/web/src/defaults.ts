import { Deep } from 'type-core';

import { paths } from './paths';
import { Web } from './Web';

export const defaults: Deep.Required<Web.Options> = {
  assets: {
    clean: false,
    destination: null,
    copy: null,
    fonts: null,
    favicons: {
      logo: paths.faviconSvg,
      options: null
    },
    result: {
      url: null,
      path: null,
      values: null
    }
  },
  explore: {
    dir: null
  },
  size: {
    dir: null,
    limit: null,
    exclude: /\.map$/
  }
};
