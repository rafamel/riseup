import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { resolveBin, resolveModule } from '@riseup/utils';

const url = new URL(import.meta.url);

export const paths = {
  rootDir: path.resolve(fileURLToPath(url), '../'),
  buildBin: resolveModule('./build-bin.js', url),
  transpileLoader: resolveModule('./transpile-loader.js', url),
  jestBin: resolveBin('jest-cli', 'jest', url),
  jestResolver: resolveModule('./jest-resolver.cjs', url),
  jestTransform: resolveModule('./jest-transform.cjs', url),
  jestEnvironmentJsdom: resolveModule('jest-environment-jsdom', url),
  eslintBin: resolveBin('eslint', 'eslint', url),
  eslintConfig: resolveModule('../static/eslintrc.cjs', url),
  prettierBin: resolveBin('prettier', 'prettier', url),
  typescriptBin: resolveBin('typescript', 'tsc', url),
  typescriptConfig: resolveModule('../static/tsconfig.json', url)
};
