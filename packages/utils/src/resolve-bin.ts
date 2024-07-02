import { TypeGuard } from 'type-core';
import fs from 'node:fs';
import path from 'node:path';
import { URL } from 'node:url';
import { findUpSync } from 'find-up';

import { resolveModule } from './resolve-module';

/**
 * Resolves the path for a module bin file.
 */
export function resolveBin(lib: string, bin: string, from: URL): string {
  let pkgPath: string | null = null;

  // ES Modules
  try {
    const entryPath = resolveModule(lib, from);
    pkgPath =
      findUpSync('package.json', {
        type: 'file',
        cwd: path.dirname(entryPath)
      }) || null;
  } catch (_) {}

  // Modules wo/ an entry point
  try {
    const relativePath = path.join(lib, 'package.json');
    pkgPath = resolveModule(relativePath, from);
  } catch (_) {}

  if (!pkgPath) {
    throw new Error(`No module "${lib}" found`);
  }

  const pkg = JSON.parse(String(fs.readFileSync(pkgPath)));

  if (pkg.name !== lib) {
    throw new Error(`No matching package.json found for "${lib}"`);
  }

  if (!pkg.bin) {
    throw new Error(`No executable found for ${lib}`);
  }

  const file: string | null = TypeGuard.isString(pkg.bin)
    ? lib === bin
      ? pkg.bin
      : null
    : TypeGuard.isRecord(pkg.bin)
    ? pkg.bin[bin] || null
    : null;

  if (file === null) {
    throw new Error(`Executable ${bin} not found for ${lib}`);
  }

  return path.join(path.dirname(pkgPath), file);
}
