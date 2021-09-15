import { Empty } from 'type-core';
import { create } from 'kpo';
import path from 'path';
import { extract, Riseup, withReconfigure } from '@riseup/utils';
import { hydrateUniversal, universal } from '@riseup/universal';
import {
  hydrateTooling,
  tooling,
  reconfigureBabelEnv,
  reconfigureBabelStubs
} from '@riseup/tooling';
import { build, distribute, docs } from './tasks';
import { configurePika, configureTypedoc } from './configure';
import {
  LibraryConfigure,
  LibraryOptions,
  LibraryReconfigure,
  LibraryTasks
} from './definitions';
import { defaults } from './defaults';
import { hydrateLibraryGlobal } from './global';

export function hydrateLibrary(
  options: LibraryOptions | Empty
): Required<LibraryOptions> {
  const global = hydrateLibraryGlobal(options ? options.global : null);
  const universal = hydrateUniversal(options);
  const tooling = hydrateTooling(options);
  const library = options
    ? {
        build: { ...global, ...options.build },
        docs: { ...options.docs },
        distribute: { ...global, ...options.distribute }
      }
    : {
        build: { ...global },
        docs: {},
        distribute: { ...global }
      };

  return {
    ...universal,
    ...tooling,
    ...library,
    test: {
      ...tooling.test,
      ignore: [
        ...(tooling.test.ignore || []),
        path.join('<rootDir>', global.output || defaults.global.output)
      ]
    }
  };
}

export function library(
  options: LibraryOptions | Empty,
  reconfigure: LibraryReconfigure | Empty,
  fetcher: Riseup.Fetcher<LibraryConfigure> | Empty
): LibraryTasks {
  const opts = hydrateLibrary(options);

  const deps = {
    universal: extract(universal, opts, reconfigure),
    tooling: extract(tooling, opts, reconfigure)
  };

  let configure: LibraryConfigure = {
    ...deps.universal.configure,
    ...deps.tooling.configure,
    babel(context: Riseup.Context) {
      return context.task === 'build'
        ? reconfigureBabelStubs(null, deps.tooling.configure.babel(context))
        : deps.tooling.configure.babel(context);
    },
    pika(context: Riseup.Context) {
      return configurePika(opts.build, {
        babel: deps.tooling.configure.babel(context),
        typescript: deps.tooling.configure.typescript(context)
      });
    },
    typedoc(context: Riseup.Context) {
      return configureTypedoc(context.cwd, opts.docs);
    }
  };

  if (fetcher) fetcher(configure);
  configure = withReconfigure(configure, reconfigure);

  return {
    ...deps.universal.tasks,
    ...deps.tooling.tasks,
    build: create(({ cwd }) => {
      return build(
        { ...opts.global, ...opts.build },
        {
          pika: configure.pika({ cwd, task: 'build' }),
          babel: reconfigureBabelEnv(
            {
              spec: true,
              modules: false,
              targets: { esmodules: true }
            },
            configure.babel({ cwd, task: 'build' })
          )
        }
      );
    }),
    distribute: create(() => distribute(opts.distribute)),
    docs: create(({ cwd }) => {
      return docs(opts.docs, {
        typedoc: configure.typedoc({ cwd, task: 'docs' })
      });
    })
  };
}
