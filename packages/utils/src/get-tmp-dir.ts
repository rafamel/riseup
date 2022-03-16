import os from 'node:os';
import path from 'node:path';

export function getTmpDir(): string {
  return path.resolve(os.tmpdir(), 'riseup');
}
