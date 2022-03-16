import { loadPackage } from 'cli-belt';
import { cli as _cli } from 'kpo';

export async function cli(): Promise<void> {
  const pkg = await loadPackage(__dirname, { title: false });

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
