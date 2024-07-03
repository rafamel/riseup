import {
  Task,
  exec,
  series,
  create,
  log,
  style,
  confirm,
  select,
  raises,
  progress
} from 'kpo';
import isGitDirty from 'is-git-dirty';
import { Bumper } from 'conventional-recommended-bump';
import { readPackage } from '@riseup/utils';

import { paths } from '../../../paths';
import { bumps, CLIReleaseOptions } from './definitions';

export function single({ conventional, ...options }: CLIReleaseOptions): Task {
  return create(async (ctx) => {
    let next = options.bump;
    return series(
      isGitDirty(ctx.cwd) ? raises(`Git working directory not clean`) : null,
      next ? log('info', 'Version bump:', style(next, { bold: true })) : null,
      conventional
        ? create(async () => {
            const bumper = new Bumper(ctx.cwd).loadPreset('angular');
            const recommendation = await bumper.bump();

            next = next || recommendation.releaseType;
            return series(
              log(
                'info',
                'Recommended version bump:',
                style(recommendation.releaseType, {
                  bold: true,
                  color: options.bump ? 'red' : 'green'
                })
              ),
              log('info', recommendation.reason),
              !options.bump && options.interactive
                ? confirm(
                    { message: `Release as ${next}?`, default: true },
                    null,
                    () => (next = null) || undefined
                  )
                : null
            );
          })
        : null,
      create(() => {
        if (next) return;
        if (!options.interactive) {
          throw new Error(`Version bump required`);
        }

        return select(
          { message: 'Select version bump:' },
          Object.fromEntries(
            bumps.map((version) => [
              version[0].toUpperCase() + version.slice(1),
              () => {
                next = version;
              }
            ])
          )
        );
      }),
      create(() => {
        return series(
          exec('npm', [
            '--no-git-tag-version',
            'version',
            ...(next ? [next] : []),
            ...(options.preid ? [`--preid=${options.preid}`] : [])
          ]),
          conventional && conventional.changelog
            ? exec(process.execPath, [
                paths.conventionalChangelogBin,
                '--same-file',
                ...['--infile', 'CHANGELOG.md'],
                ...['--release-count', '0'],
                ...['--preset', conventional.preset]
              ])
            : null
        );
      }),
      create(() => {
        const pkg = readPackage(ctx.cwd);
        if (!pkg) throw new Error(`Couldn't locate package.json: ${ctx.cwd}`);

        return series(
          exec('git', ['add', '.']),
          exec('git', [
            'commit',
            ...(options.verify ? [] : ['--no-verify']),
            ...[
              '-m',
              conventional && conventional.preset === 'angular'
                ? `chore(release): ${pkg.version}`
                : String(pkg.version)
            ]
          ]),
          exec('git', ['tag', 'v' + pkg.version]),
          options.push
            ? progress(
                { message: 'Push to remote' },
                exec('git', ['push', '--follow-tags'])
              )
            : null
        );
      })
    );
  });
}
