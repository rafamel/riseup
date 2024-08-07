import fs from 'node:fs';
import path from 'node:path';

import semver from 'semver';

import {
  type PackageInformation,
  fetchMonorepoPackages,
  getMonorepoRootDir
} from '@riseup/utils';

export interface ResolvePkgMonorepoDepsArgs {
  packageDir: string;
  packageContentsDir: string;
}

export interface ResolvePkgMonorepoDepsOptions {
  contents: string;
  noPrivate: boolean;
}

export interface PackageDependency {
  name: string;
  path: string;
  placement: PackageDependencyPlacement;
}

export type PackageDependencyPlacement =
  | 'dependencies'
  | 'devDependencies'
  | 'optionalDependencies';

export async function resolvePkgMonorepoDeps(
  args: ResolvePkgMonorepoDepsArgs,
  options: ResolvePkgMonorepoDepsOptions
): Promise<PackageDependency[]> {
  const monorepoRootDir = getMonorepoRootDir(args.packageDir);
  if (!monorepoRootDir) {
    throw new Error(`No workspaces root found for: ${args.packageDir}`);
  }

  const packages = await fetchMonorepoPackages(monorepoRootDir);
  return ['dependencies', 'devDependencies', 'optionalDependencies'].reduce(
    (acc: Promise<PackageDependency[]>, placement) => {
      return acc.then((arr) => {
        return trunk(
          true,
          args.packageContentsDir,
          options.contents,
          options.noPrivate,
          packages,
          placement as PackageDependencyPlacement,
          []
        ).then((res) => [...arr, ...res]);
      });
    },
    Promise.resolve([])
  );
}

async function trunk(
  root: boolean,
  packageContents: string,
  monorepoContents: string,
  noPrivate: boolean,
  packages: PackageInformation[],
  placement: PackageDependencyPlacement,
  history: string[]
): Promise<PackageDependency[]> {
  // Find package.json
  const dir = packageContents;
  const pkgPath = path.join(dir, 'package.json');
  const pkgExists = fs.existsSync(pkgPath);
  if (!pkgExists) {
    throw new Error(`No package.json found at "${dir}"`);
  }

  const pkgJson = JSON.parse(String(fs.readFileSync(pkgPath)));
  // Parse coincident package dependencies / monorepo packages
  const pkgDependenciesRecord = !root
    ? {
        ...pkgJson.dependencies,
        ...pkgJson.devDependencies,
        ...pkgJson.optionalDependencies
      }
    : { ...pkgJson[placement] };
  const pkgDependenciesNames = Object.keys(pkgDependenciesRecord);
  const packagesNames = new Set(packages.map((item) => item.name));
  const packagesRecord = Object.fromEntries(
    packages.map((item) => [item.name, item])
  );
  const coincidentNames = pkgDependenciesNames.filter((name) => {
    return packagesNames.has(name);
  });

  // Verify versions are satisfied
  for (const name of coincidentNames) {
    const pkgVersionStr = pkgDependenciesRecord[name];
    const pkgInfo = packagesRecord[name];

    if (
      !pkgVersionStr ||
      !pkgInfo ||
      !semver.satisfies(pkgInfo.version, pkgVersionStr)
    ) {
      throw new Error(
        `Package ${pkgInfo.name} version ${pkgVersionStr} ` +
          `is not satisfied by ${pkgInfo.version}: "${pkgPath}"`
      );
    }

    if (noPrivate && pkgInfo.private) {
      throw new Error(
        `Package requires private package ${pkgInfo.name}: "${pkgPath}"`
      );
    }
  }

  // Recurrently check dependencies of dependencies
  const coincidentAndNotInHistoryNames = coincidentNames.filter((name) => {
    return !history.includes(name);
  });
  const coincidentAndNotInHistoryData = coincidentAndNotInHistoryNames.map(
    (name) => {
      const item = packagesRecord[name];
      return { name: item.name, path: item.location, placement };
    }
  );
  const responseAggregate = await coincidentAndNotInHistoryData.reduce(
    (acc: Promise<PackageDependency[]>, data) => {
      return acc.then((arr) => {
        return trunk(
          false,
          data.path,
          monorepoContents,
          noPrivate,
          packages,
          placement,
          [...history, data.name]
        ).then((res) => [...arr, ...res]);
      });
    },
    Promise.resolve(coincidentAndNotInHistoryData)
  );

  // Clean up response
  return responseAggregate
    .map((item) => item.name)
    .filter((x, i, arr) => arr.indexOf(x) === i)
    .map((name) => packagesRecord[name])
    .map((item) => ({ name: item.name, path: item.location, placement }))
    .filter((x) => Boolean(x));
}
