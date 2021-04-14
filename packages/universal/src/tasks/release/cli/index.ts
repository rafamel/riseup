import arg from 'arg';
import { flags, safePairs } from 'cli-belt';
import { stripIndent as indent } from 'common-tags';
import { Task, print, raises, series, style, create, context } from 'kpo';
import { getMonorepoRoot, getLerna } from '@riseup/utils';
import { bumps, CLIReleaseOptions, ConventionalOptions } from './options';
import { monorepo } from './monorepo';
import { singular } from './singular';

export function cli(conventional: ConventionalOptions | null): Task {
  const help = indent`
    ${style(`Release`, { bold: true })}

    Usage: [options] [${bumps.join('|')}]

    Options:
      --push                Push to remote
      --preid <value>       Prerelease identifier
      --no-verify           Do not run hooks on commit
      --no-interactive      Do not prompt for input
      -h, --help            Show help
  `;

  const types = {
    '--push': Boolean,
    '--preid': String,
    '--no-verify': Boolean,
    '--no-interactive': Boolean,
    '--help': Boolean
  };

  /* Parsing */
  const { options, aliases } = flags(help);
  safePairs(types, options, { fail: true, bidirectional: true });
  Object.assign(types, aliases);

  return create((ctx) => {
    const cmd = arg(types, {
      argv: ctx.args,
      permissive: false,
      stopAtPositional: true
    });

    /* Help */
    if (cmd['--help']) return print(help + '\n');

    /* Options */
    const opts: CLIReleaseOptions = {
      bump: cmd._[0] || null,
      preid: cmd['--preid'] || null,
      push: cmd['--push'] || false,
      verify: !cmd['--no-verify'],
      interactive: !cmd['--no-interactive'],
      conventional
    };

    const isMonorepoRoot = Boolean(getLerna(ctx.cwd));
    const isMonorepoChild = Boolean(getMonorepoRoot(ctx.cwd));

    /* Preconditions */
    if (isMonorepoChild) {
      return series(
        print(help + '\n'),
        raises(Error(`Release should be run at monorepo root`))
      );
    }
    if (cmd._.length > 1) {
      return series(
        print(help + '\n'),
        raises(Error(`Unknown subcommand: ${cmd._[1]}`))
      );
    }
    if (
      ![...bumps, null].includes(opts.bump) &&
      !/^[0-9]+\.[0-9]+\.[0-9]+(-.+)?$/.exec(opts.bump || '')
    ) {
      return series(
        print(help + '\n'),
        raises(Error(`Invalid version bump: ${opts.bump}`))
      );
    }

    return context(
      { args: [] },
      isMonorepoRoot ? monorepo(opts) : singular(opts)
    );
  });
}
