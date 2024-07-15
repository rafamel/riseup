/* eslint-disable ts/no-use-before-define */
import path from 'node:path';

import { minimatch } from 'minimatch';

import { getPackageRootDir } from './get-package-root-dir';
import { readPackage } from './read-package';

export function getMonorepoRootDir(cwd: string): string | null {
  const recursive = (dir: string): string | null => {
    if (!childRoot) return null;

    const pkgRoot = getPackageRootDir(dir);
    if (!pkgRoot) return null;

    const pkg: any = readPackage(pkgRoot);
    if (!pkg) return null;
    if (
      !pkg.workspaces ||
      !Array.isArray(pkg.workspaces) ||
      !pkg.workspaces.length
    ) {
      return recursive(path.join(dir, '../'));
    }

    if (pkgRoot === childRoot) return pkgRoot;

    for (const glob of pkg.workspaces) {
      if (minimatch(childRoot, path.resolve(pkgRoot, glob))) return pkgRoot;
    }
    return recursive(path.join(dir, '../'));
  };

  const childRoot = getPackageRootDir(cwd);
  return recursive(cwd);
}
