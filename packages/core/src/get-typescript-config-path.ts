import fs from 'node:fs';
import path from 'node:path';
import { findUpSync } from 'find-up';

export function getTypescriptConfigPath(
  filename: string | null,
  cwd: string,
  recursive: boolean
): string | null {
  if (!filename) filename = 'tsconfig.json';

  if (recursive) {
    const file = findUpSync(filename, {
      cwd,
      type: 'file',
      stopAt: 'node_modules'
    });

    return file || null;
  }

  const file = path.resolve(cwd, filename);
  try {
    fs.accessSync(file, fs.constants.F_OK);
    return file;
  } catch (_) {
    return null;
  }
}
