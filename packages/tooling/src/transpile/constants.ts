import path from 'node:path';
import filedirname from 'filedirname';

const [_, dirname] = filedirname();
export const SHIMS_CJS_PATH = path.join(dirname, '../static/shims-cjs.cjs');
export const SHIMS_ESM_PATH = path.join(dirname, '../static/shims-esm.js');
