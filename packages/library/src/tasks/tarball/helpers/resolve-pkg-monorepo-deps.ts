import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';
import { Context } from 'kpo';

import {
  getMonorepoPackages,
  PackageInformation
} from './get-monorepo-packages';

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
  context: Context,
  options: ResolvePkgMonorepoDepsOptions
): Promise<PackageDependency[]> {
  const packages = await getMonorepoPackages(context);
  return ['dependencies', 'devDependencies', 'optionalDependencies'].reduce(
    (acc: Promise<PackageDependency[]>, placement) => {
      return acc.then((arr) => {
        return trunk(
          true,
          context.cwd,
          options.contents,
          options.noPrivate,
          packages,
          placement as PackageDependencyPlacement,
          []
        ).then((res) => arr.concat(res));
      });
    },
    Promise.resolve([])
  );
}

async function trunk(
  root: boolean,
  cwd: string,
  contents: string,
  noPrivate: boolean,
  packages: PackageInformation[],
  placement: PackageDependencyPlacement,
  history: string[]
): Promise<PackageDependency[]> {
  // Find package.json
  const dir = path.resolve(cwd, contents);
  const pkgPath = path.join(dir, 'package.json');
  const pkgExists = fs.existsSync(pkgPath);

  if (!pkgExists) {
    throw Error(`No package.json found at "${dir}"`);
  }

  const pkgJson = JSON.parse(String(await fs.readFileSync(pkgPath)));

  // Parse coincident package dependencies / monorepo packages
  const pkgDependenciesRecord = !root
    ? {
        ...(pkgJson.dependencies || {}),
        ...(pkgJson.devDependencies || {}),
        ...(pkgJson.optionalDependencies || {})
      }
    : { ...pkgJson[placement] };
  const pkgDependenciesNames = Object.keys(pkgDependenciesRecord);
  const packagesNames = packages.map((item) => item.name);
  const packagesRecord = packages.reduce(
    (acc: Record<string, PackageInformation>, item) => ({
      ...acc,
      [item.name]: item
    }),
    {}
  );
  const coincidentNames = pkgDependenciesNames.filter((name) => {
    return packagesNames.includes(name);
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
      throw Error(
        `Package ${pkgInfo.name} version ${pkgVersionStr} ` +
          `is not satisfied by ${pkgInfo.version}: "${pkgPath}"`
      );
    }

    if (noPrivate && pkgInfo.private) {
      throw Error(
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
          contents,
          noPrivate,
          packages,
          placement,
          [...history, data.name]
        ).then((res) => arr.concat(res));
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
