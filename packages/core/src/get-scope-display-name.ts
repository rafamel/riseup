import { TypeGuard } from 'type-core';
import path from 'node:path';

import { getPackageJson } from './get-package-json';
import { getMonorepoRootDir } from './get-monorepo-root-dir';

export function getScopeDisplayName(cwd: string): string {
  const pkg = getPackageJson(cwd, false);
  const name = pkg && pkg.name;
  if (TypeGuard.isString(name)) return name;

  const root = getMonorepoRootDir(cwd);

  return root
    ? path.relative(root, cwd)
    : cwd.split(path.win32.sep).slice(-1)[0].split(path.posix.sep).slice(-1)[0];
}
