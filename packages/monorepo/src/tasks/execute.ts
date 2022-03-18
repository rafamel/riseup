import { Task, exec, create, context, series, log } from 'kpo';

import { paths } from '../paths';

export function execute(): Task.Async {
  return create((ctx) => {
    const [cmd, args] = [ctx.args[0], ctx.args.slice(1)];

    if (cmd === '-h' || cmd === '--help') {
      return context(
        { args: [] },
        exec(process.execPath, [paths.lernaBin, 'exec', '--help'])
      );
    }

    if (cmd.startsWith('-')) {
      throw new Error(`Execute first argument must be a command`);
    }

    return context(
      { args: [] },
      series(
        exec(process.execPath, [
          paths.lernaBin,
          'exec',
          process.platform === 'win32' ? 'node' : process.execPath,
          paths.executeBin,
          cmd,
          ...['--concurrency', '1'],
          ...['--loglevel', 'silent'],
          '--',
          ...args
        ]),
        log('success', 'Serial execute: ' + cmd)
      )
    );
  });
}
