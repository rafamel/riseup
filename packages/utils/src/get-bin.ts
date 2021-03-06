/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import resolve from 'resolve-from';
import { TypeGuard } from 'type-core';

/**
 * Resolves the path for a module bin file.
 */
export function getBin(lib: string, bin: string, from: string | null): string {
  const relativePath = path.join(lib, 'package.json');

  let pkgPath: any;
  try {
    pkgPath = from
      ? resolve(from, relativePath)
      : require.resolve(relativePath);
  } catch (_) {
    throw Error(`Module "${lib}" not found`);
  }

  const pkg = require(pkgPath);

  if (!pkg.bin) {
    throw Error(`No executable found for ${lib}`);
  }

  const file: string | null = TypeGuard.isString(pkg.bin)
    ? lib === bin
      ? pkg.bin
      : null
    : TypeGuard.isRecord(pkg.bin)
    ? pkg.bin[bin] || null
    : null;

  if (file === null) {
    throw Error(`Executable ${bin} not found for ${lib}`);
  }

  return path.join(path.dirname(pkgPath), file);
}
