import { URL } from 'node:url';
import { resolveBin } from '@riseup/utils';

const url = new URL(import.meta.url);

export const paths = {
  typedocBin: resolveBin('typedoc', 'typedoc', url)
};
