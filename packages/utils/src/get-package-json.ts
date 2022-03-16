import { Serial } from 'type-core';
import fs from 'node:fs';
import path from 'node:path';
import { findUpSync } from 'find-up';

export function getPackageJson(
  cwd: string,
  recursive: boolean
): Serial.Object | null {
  let file: string | undefined = path.resolve(cwd, 'package.json');

  try {
    fs.accessSync(file, fs.constants.F_OK);
  } catch (_) {
    if (recursive) file = undefined;
    else return null;
  }

  if (!file) {
    file = findUpSync('package.json', {
      cwd,
      type: 'file',
      stopAt: 'node_modules'
    });
  }

  return file ? JSON.parse(String(fs.readFileSync(file))) : null;
}
