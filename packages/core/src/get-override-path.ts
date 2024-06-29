import fs from 'node:fs';
import path from 'node:path';

export interface Override {
  name: string;
  ext: string[] | boolean;
}

export function getOverridePath(
  cwd: string,
  overrides: Override | Override[]
): string | null {
  if (!Array.isArray(overrides)) overrides = [overrides];

  for (const override of overrides) {
    const extensions = Array.isArray(override.ext)
      ? override.ext.map((ext) => (ext.startsWith('.') ? ext : `.${ext}`))
      : override.ext
      ? ['.js', '.cjs', '.mjs', '.ts', '.cts', '.mts', '.yaml', '.yml', '.json']
      : [''];

    const arr = extensions.map((ext) => override.name + ext);
    for (const item of arr) {
      const fullPath = path.resolve(cwd, item);
      try {
        fs.accessSync(fullPath, fs.constants.F_OK);
        return fullPath;
      } catch (_) {}
    }
  }

  return null;
}
