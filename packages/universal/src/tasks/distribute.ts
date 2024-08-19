import path from 'node:path';
import type { Buffer } from 'node:buffer';

import { TypeGuard } from 'type-core';
import {
  type Context,
  type Task,
  atValue,
  confirm,
  context,
  create,
  exec,
  interactive,
  log,
  run,
  series
} from 'kpo';

import {
  type PackageInformation,
  fetchMonorepoPackages,
  getMonorepoRootDir,
  getPackageRootDir
} from '@riseup/utils';

import { defaults } from '../defaults';

export interface DistributeParams {
  /** Push to remote */
  push?: boolean;
  /** Package registry */
  registry?: string | null;
  /** Subdirectory to publish for all packages */
  contents?: string | null;
}

export function distribute(params: DistributeParams | null): Task.Async {
  const opts = {
    push: TypeGuard.isBoolean(params?.push)
      ? (params?.push as boolean)
      : defaults.distribute.push,
    registry: TypeGuard.isUndefined(params?.registry)
      ? defaults.distribute.registry
      : (params?.registry as string),
    contents: TypeGuard.isUndefined(params?.contents)
      ? defaults.distribute.contents
      : params?.contents
  };

  return create(async (ctx) => {
    const packageRoot = getPackageRootDir(ctx.cwd);
    const monorepoRoot = getMonorepoRootDir(ctx.cwd);
    const isMonorepoRoot = monorepoRoot && monorepoRoot === packageRoot;
    const isMonorepoChild = monorepoRoot && monorepoRoot !== packageRoot;

    if (isMonorepoChild) {
      throw new Error(`Distribute should be run at monorepo root`);
    }

    if (
      opts.contents &&
      (path.isAbsolute(opts.contents) || opts.contents.startsWith('..'))
    ) {
      throw new Error(
        'Distribute contents option must be a relative path: ' + opts.contents
      );
    }

    if (!isMonorepoRoot) {
      return publish([path.resolve(ctx.cwd, opts.contents || '')], {
        push: opts.push,
        registry: opts.registry
      });
    }

    const pkgs = await fetchMonorepoPackages(ctx.cwd);
    const publishablePkgs: PackageInformation[] = [];
    const nonPublishablePkgs: PackageInformation[] = [];
    for (const pkg of pkgs) {
      if (pkg.private) {
        nonPublishablePkgs.push(pkg);
      } else {
        const version = await getRegistryVersion(ctx, pkg.name, {
          cwd: path.resolve(pkg.location, opts.contents || ''),
          registry: opts.registry
        });
        if (version === pkg.version) nonPublishablePkgs.push(pkg);
        else publishablePkgs.push(pkg);
      }
    }

    if (!publishablePkgs.length) {
      throw new Error(`No publishable packages found`);
    }
    return series(
      log(
        'info',
        'Publish packages: ' +
          publishablePkgs.map((pkg) => pkg.name).join(', ') +
          '.'
      ),
      nonPublishablePkgs.length
        ? log(
            'info',
            'Skip packages: ' +
              nonPublishablePkgs.map((pkg) => pkg.name).join(', ') +
              '.'
          )
        : null,
      confirm(
        { message: 'Continue?', default: true },
        atValue({
          true: publish(
            publishablePkgs.map(({ location }) => {
              return path.resolve(location, opts.contents || '');
            }),
            { push: opts.push, registry: opts.registry }
          )
        })
      )
    );
  });
}

function publish(
  publishCwds: string[],
  options: { push: boolean; registry: string | null }
): Task.Async {
  const env = options.registry ? { npm_config_registry: options.registry } : {};
  return series(
    interactive(
      series(
        log('info', 'Dry run'),
        ...publishCwds.map((publishCwd) => {
          return exec('npm', ['publish', '--dry-run'], {
            env,
            cwd: publishCwd
          });
        })
      ),
      log('debug', 'Dry run skipped')
    ),
    confirm(
      { message: 'Continue?', default: true },
      atValue({
        true: series(
          log('info', 'Run publish'),
          ...publishCwds.map((publishCwd) => {
            return exec('npm', ['publish'], {
              env,
              cwd: publishCwd
            });
          }),
          options.push
            ? series(
                log('info', 'Push to remote'),
                context({ args: [] }, exec('git', ['push', '--follow-tags']))
              )
            : null
        )
      })
    )
  );
}

async function getRegistryVersion(
  ctx: Context,
  packageName: string,
  options: { cwd: string; registry: string | null }
): Promise<string | null> {
  const stdio = { out: '', err: '' };
  const res = await run(
    ctx,
    context(
      { args: [] },
      exec(
        'npm',
        ['view', packageName],
        {
          cwd: options.cwd,
          env: options.registry
            ? { npm_config_registry: options.registry }
            : {},
          stdio: ['ignore', 'pipe', 'pipe']
        },
        (ps: any) => {
          ps.stdout.on('data', (buf: Buffer) => (stdio.out += String(buf)));
          ps.stderr.on('data', (buf: Buffer) => (stdio.err += String(buf)));
        }
      )
    )
  ).then(
    () => ({ success: true, error: null }),
    (error) => ({ success: false, error })
  );

  if (res.success) {
    const matches = /\n *latest: *(\d*\.\d*\.\d*) *\n/.exec(stdio.out);
    if (!matches || !matches[1]) {
      throw new Error(`Could not retrieve version for: ${packageName}`);
    }
    return matches[1];
  } else if (stdio.err.includes('npm error 404')) {
    return null;
  } else {
    throw res.error;
  }
}
