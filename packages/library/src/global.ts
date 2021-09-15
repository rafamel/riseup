import { Deep, Empty } from 'type-core';
import { merge } from 'merge-strategies';
import { defaults } from './defaults';
import { hydrateToolingGlobal, ToolingGlobalOptions } from '@riseup/tooling';

export interface LibraryGlobalParams {
  output?: string;
}

export type LibraryGlobalOptions = LibraryGlobalParams & ToolingGlobalOptions;

export function hydrateLibraryGlobal(
  options: LibraryGlobalOptions | Empty
): Deep.Required<LibraryGlobalOptions> {
  const toolingGlobal = hydrateToolingGlobal(options);
  return merge(
    {
      ...toolingGlobal,
      output: defaults.global.output
    },
    options || undefined
  );
}
