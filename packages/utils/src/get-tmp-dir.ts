import os from 'node:os';
import path from 'node:path';
import { nanoid } from 'nanoid';

export function getTmpDir(): string {
  return path.join(os.tmpdir(), 'riseup', nanoid());
}
