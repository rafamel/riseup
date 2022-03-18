import { URL, fileURLToPath } from 'node:url';
import path from 'node:path';
import { cli as _cli } from 'kpo';
import { loadPackage } from 'cli-belt';

export async function cli(): Promise<void> {
  const url = new URL(import.meta.url);
  const dirname = path.dirname(fileURLToPath(url));
  const pkg = await loadPackage(dirname, { title: false });

  return _cli({
    bin: 'riseup',
    files: ['riseup.config.js', 'riseup.config.mjs', 'riseup.config.cjs'],
    property: 'tasks',
    version: pkg.version || 'Unknown',
    description: pkg.description || '',
    multitask: true,
    update: {
      name: pkg.name,
      version: pkg.version
    }
  });
}
