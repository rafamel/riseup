import { fileURLToPath } from 'node:url';
import { moduleResolve } from 'import-meta-resolve';

/**
 * Resolves the path for a module.
 */
export function resolveModule(specifier: string, from: URL): string {
  return fileURLToPath(
    moduleResolve(specifier, from, new Set(['node', 'import']), false)
  );
}
