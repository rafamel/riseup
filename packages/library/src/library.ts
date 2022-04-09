import { create } from 'kpo';
import { Preset, getPackageJson } from '@riseup/utils';

import { configureTypedoc, ConfigureTypedocParams } from './configure';
import {
  distribute,
  DistributeParams,
  docs,
  DocsConfigurations,
  DocsParams
} from './tasks';
import { TypeGuard } from 'type-core';

export declare namespace Library {
  type Tasks = 'distribute' | 'docs';
  type Configurations = DocsConfigurations;

  interface Options {
    distribute?: DistributeParams;
    docs?: ConfigureTypedocParams & DocsParams;
  }
}

export class Library extends Preset<Library.Tasks, Library.Configurations> {
  public constructor(options: Library.Options | null) {
    super(
      {
        distribute: create(() => {
          return distribute(options?.distribute || null);
        }),
        docs: create(({ cwd }) => {
          const typedoc = this.retrieve('typedoc');
          const pkg = getPackageJson(cwd, false);
          const name = TypeGuard.isString(typedoc.name)
            ? typedoc.name
            : (pkg?.name ? `${pkg.name} ` : '') +
              (pkg?.version ? `v${pkg.version}` : '');

          return docs(options?.docs || null, {
            typedoc: { ...typedoc, name }
          });
        })
      },
      {
        typedoc: () => {
          return configureTypedoc(options?.docs || null);
        }
      }
    );
  }
}
