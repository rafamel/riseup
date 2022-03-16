import { Deep } from 'type-core';

import { Monorepo } from './Monorepo';

export const defaults: Deep.Required<Monorepo.Options> = {
  distribute: {
    push: true,
    contents: null,
    registry: null
  },
  coverage: {
    infile: './coverage/*.info',
    outfile: './coverage/lcov.info'
  }
};
