import { TypeGuard } from 'type-core';
import fs from 'node:fs';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { findUpSync } from 'find-up';
import { moduleResolve } from 'import-meta-resolve';

/**
 * Resolves the path for a module bin file.
 */
export function resolveBin(lib: string, bin: string, from: URL): string {
  let pkgPath: string | null = null;

  // ES Modules
  try {
    const entryUrl = moduleResolve(lib, from);
    pkgPath =
      findUpSync('package.json', {
        type: 'file',
        cwd: path.dirname(fileURLToPath(entryUrl))
      }) || null;
  } catch (_) {}

  // Modules wo/ an entry point
  try {
    const relativePath = path.join(lib, 'package.json');
    pkgPath = fileURLToPath(moduleResolve(relativePath, from));
  } catch (_) {}

  if (!pkgPath) {
    throw Error(`No module "${lib}" found`);
  }

  const pkg = JSON.parse(String(fs.readFileSync(pkgPath)));

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
