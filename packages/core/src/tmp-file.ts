import { Serial, TypeGuard } from 'type-core';
import fs from 'node:fs';

import { tmpPath } from './tmp-path';

export function tmpFile(
  ext: string | null,
  content: Serial.Object | Serial.Array | string
): string {
  const file = tmpPath(ext, { content });

  let exists = true;
  try {
    fs.accessSync(file, fs.constants.F_OK);
  } catch (_) {
    exists = false;
  }

  if (exists) return file;

  fs.writeFileSync(
    file,
    TypeGuard.isString(content) ? content : JSON.stringify(content, null, 2)
  );

  return file;
}
