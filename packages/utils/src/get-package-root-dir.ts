import path from 'node:path';

import { findUpSync } from 'find-up';

export function getPackageRootDir(cwd: string): string | null {
  const file = findUpSync('package.json', { cwd, type: 'file' });

  return file ? path.join(file, '../') : null;
}
