import path from 'node:path';

import { execa } from 'execa';

import { readPackage } from './read-package';

export interface PackageInformation {
  name: string;
  version: string;
  private: boolean;
  location: string;
}

export async function fetchMonorepoPackages(
  cwd: string
): Promise<PackageInformation[]> {
  const { stdout } = await execa('npm', ['ls', '--workspaces'], {
    cwd,
    stdio: ['ignore', 'pipe', 'ignore']
  });

  const relativePaths = stdout
    .split(/[\n\r]/)
    .filter((x) => x.at(3) === ' ')
    .map((x) => x.split(' ').at(-1) as string);

  const packages: PackageInformation[] = [];

  for (const relativePath of relativePaths) {
    const location = path.resolve(cwd, relativePath);
    const pkg: any = readPackage(location);
    if (!pkg) {
      throw new Error(`Could not find package: ${relativePath}`);
    }
    if (!pkg.name) {
      throw new Error(`Could not find package name: ${relativePath}`);
    }
    packages.push({
      name: pkg.name,
      version: pkg.version || '0.0.0',
      private: pkg.private || false,
      location
    });
  }

  return packages;
}
