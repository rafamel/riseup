import fs from 'fs';
import path from 'path';
import up from 'find-up';
import resolve from 'resolve-from';
import { TypeGuard } from 'type-core';

/**
 * Resolves the path for a module bin file.
 */
export function getBin(lib: string, bin: string, from: string | null): string {
  let pkgPath: string | null = null;

  // ES Modules
  try {
    const entryPath = from ? resolve(from, lib) : require.resolve(lib);
    pkgPath =
      up.sync('package.json', {
        type: 'file',
        cwd: path.dirname(entryPath)
      }) || null;
  } catch (_) {}

  // Modules wo/ an entry point
  try {
    const relativePath = path.join(lib, 'package.json');
    pkgPath = from
      ? resolve(from, relativePath)
      : require.resolve(relativePath);
  } catch (_) {}

  if (!pkgPath) {
    throw Error(`No module "${lib}" found`);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());

  if (pkg.name !== lib) {
    throw Error(`No matching package.json found for "${lib}"`);
  }

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
