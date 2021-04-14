import { Deep } from 'type-core';
import { MonorepoParams } from './definitions';

export const defaults: Deep.Required<MonorepoParams> = {
  distribute: {
    push: true,
    contents: './pkg'
  },
  coverage: {
    infile: './coverage/*.info',
    outfile: './coverage/lcov.info'
  }
};
