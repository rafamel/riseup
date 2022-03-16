import { Serial } from 'type-core';
import { Task, exec } from 'kpo';
import { tmpTask } from '@riseup/utils';

import { defaults } from '../defaults';
import { paths } from '../paths';

export interface LintMdParams {
  /** File, directory, or glob for files to include */
  include?: string;
  /** File, directory, or glob for files to exclude */
  exclude?: string;
}

export interface LintMdConfigurations {
  /** See: https://github.com/igorshubovych/markdownlint-cli#configuration */
  markdownlint: Serial.Object;
}

export function lintmd(
  params: LintMdParams | null,
  configurations: LintMdConfigurations
): Task.Async {
  const opts = {
    include: params?.include || defaults.lintmd.include,
    exclude: params?.exclude || defaults.lintmd.exclude
  };

  return tmpTask(
    {
      ext: 'json',
      content: JSON.stringify(configurations.markdownlint),
      overrides: [
        { name: '.markdownlintrc', ext: false },
        { name: '.markdownlint', ext: true }
      ]
    },
    ([file]) => {
      return exec(process.execPath, [
        paths.markdownlintBin,
        ...['--config', file],
        ...(opts.exclude ? ['--ignore', opts.exclude] : []),
        ...[opts.include]
      ]);
    }
  );
}
