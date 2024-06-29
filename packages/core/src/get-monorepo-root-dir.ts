import fs from 'node:fs';
import path from 'node:path';
import minimatch from 'minimatch';
import { findUpSync } from 'find-up';

export function getMonorepoRootDir(cwd: string): string | null {
  const lerna = findUpSync('lerna.json', { cwd, type: 'file' });
  if (!lerna) return null;

  const pkg = findUpSync('package.json', { cwd, type: 'file' });
  if (!pkg) return null;

  const rootDir = path.dirname(lerna);
  const childDir = path.dirname(pkg);
  if (rootDir.length >= childDir.length) return null;

  const lernaConfig = JSON.parse(String(fs.readFileSync(lerna)));
  if (!lernaConfig.packages) return null;
  if (!Array.isArray(lernaConfig.packages)) return null;

  for (const glob of lernaConfig.packages) {
    if (minimatch(childDir, path.resolve(cwd, glob))) return rootDir;
  }

  return null;
}
