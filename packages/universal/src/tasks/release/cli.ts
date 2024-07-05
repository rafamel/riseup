import arg from 'arg';
import { flags, safePairs } from 'cli-belt';
import { stripIndent as indent } from 'common-tags';
import { Task, print, raises, series, style, create } from 'kpo';

export interface CLIOptions {
  bump: string | null;
  noInteractive: boolean;
}

export const bumps = [
  'major',
  'minor',
  'patch',
  'premajor',
  'preminor',
  'prepatch'
];

export function cli(cb: (options: CLIOptions) => Task): Task {
  const help = indent`
    ${style(`Release`, { bold: true })}

    Usage: [options] [${bumps.join('|')}]

    Options:
      --no-interactive      Do not prompt for input
      -h, --help            Show help
  `;

  const types = {
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
    const opts: CLIOptions = {
      bump: cmd._[0] || null,
      noInteractive: Boolean(cmd['--no-interactive'])
    };

    /* Preconditions */
    if (cmd._.length > 1) {
      return series(
        print(help + '\n'),
        raises(new Error(`Unknown subcommand: ${cmd._[1]}`))
      );
    }
    if (
      ![...bumps, null].includes(opts.bump) &&
      !/^\d+\.\d+\.\d+(-.+)?$/.test(opts.bump || '')
    ) {
      return series(
        print(help + '\n'),
        raises(new Error(`Invalid version bump: ${opts.bump}`))
      );
    }

    return cb(opts);
  });
}
