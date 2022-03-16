import { Task, create, series, exec } from 'kpo';

import { paths } from '../../../paths';
import { CLIReleaseOptions } from './options';

export function monorepo({
  conventional,
  ...options
}: CLIReleaseOptions): Task {
  return create(() => {
    return series(
      exec(process.execPath, [
        paths.lernaBin,
        ...(options.bump ? ['version', options.bump] : ['version']),
        ...['--concurrency', '1'],
        ...(options.interactive ? [] : ['--yes']),
        ...(options.preid ? ['--preid', options.preid] : []),
        ...(options.push ? [] : ['--no-push']),
        ...(options.verify ? [] : ['--no-commit-hooks']),
        ...(conventional ? ['--conventional-commits'] : []),
        ...(conventional ? ['--changelog-preset', conventional.preset] : []),
        ...(conventional && conventional.changelog ? [] : ['--no-changelog'])
      ]),
      options.push ? exec('git', ['push', '--follow-tags']) : null
    );
  });
}
