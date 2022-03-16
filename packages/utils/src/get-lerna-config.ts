import { Serial } from 'type-core';
import fs from 'node:fs';
import path from 'node:path';

export function getLernaConfig(cwd: string): Serial.Object | null {
  const file = path.join(cwd, 'lerna.json');
  try {
    fs.accessSync(file, fs.constants.F_OK);
  } catch (_) {
    return null;
  }
  return JSON.parse(String(fs.readFileSync(file)));
}
