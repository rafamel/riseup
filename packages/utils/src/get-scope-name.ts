import path from 'node:path';

import { TypeGuard } from 'type-core';

import { getMonorepoRootDir } from './get-monorepo-root-dir';
import { getPackageRootDir } from './get-package-root-dir';
import { readPackage } from './read-package';

export function getScopeName(cwd: string): string {
  const pkgRoot = getPackageRootDir(cwd);
  const pkg = pkgRoot ? readPackage(pkgRoot) : null;
  if (!pkgRoot || !pkg) return cwd.split(path.sep).at(-1) as string;

  if (TypeGuard.isString(pkg.name)) return pkg.name;

  const monorepoRoot = getMonorepoRootDir(pkgRoot);

  return !monorepoRoot || monorepoRoot === pkgRoot
    ? (cwd.split(path.sep).at(-1) as string)
    : path.relative(monorepoRoot, pkgRoot);
}
