import { Serial } from 'type-core';
import fs from 'node:fs';
import path from 'node:path';
import hash from 'object-hash';
import { nanoid } from 'nanoid';

import { getTmpDir } from './get-tmp-dir';

export function tmpPath(
  ext: string | null,
  seed: Serial.Object | null
): string {
  const tmpDir = getTmpDir();

  try {
    fs.accessSync(tmpDir, fs.constants.F_OK);
  } catch (err) {
    if (err) fs.mkdirSync(tmpDir);
  }

  return path.resolve(
    tmpDir,
    (seed
      ? hash(seed, {
          excludeValues: false,
          encoding: 'hex',
          ignoreUnknown: false,
          respectFunctionProperties: true,
          respectFunctionNames: true,
          respectType: true
        })
      : nanoid()) + (ext ? '.' + ext : '')
  );
}
