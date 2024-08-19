import fs from 'node:fs';
import path from 'node:path';

import type { Serial } from 'type-core';

export function readPackage(cwd: string): { [key: string]: Serial } | null {
  const file = path.resolve(cwd, 'package.json');

  try {
    fs.accessSync(file, fs.constants.F_OK);
  } catch (_) {
    return null;
  }

  return JSON.parse(String(fs.readFileSync(file)));
}
