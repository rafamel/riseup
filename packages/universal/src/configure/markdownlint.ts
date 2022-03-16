import { Serial } from 'type-core';

import { defaults } from '../defaults';

export interface ConfigureMarkdownlintParams {
  overrides?: Serial.Object;
}

export function configureMarkdownlint(
  params: ConfigureMarkdownlintParams | null
): Serial.Object {
  const opts = {
    overrides: params?.overrides || defaults.lintmd.overrides
  };

  return {
    'ul-indent': { indent: 2 },
    'line-length': false,
    'no-inline-html': false,
    'fenced-code-language': false,
    'commands-show-output': false,
    ...opts.overrides
  };
}
