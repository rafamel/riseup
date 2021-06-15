import { Empty } from 'type-core';
import { create } from 'kpo';
import { extract, withReconfigure, Riseup } from '@riseup/utils';
import { hydrateUniversal, universal } from '@riseup/universal';
import {
  hydrateTooling,
  reconfigureBabelStubs,
  tooling
} from '@riseup/tooling';
import { start, build, analyze, size, dev, exportTask } from './tasks';
import { hydrateNextGlobal } from './global';
import {
  NextConfigure,
  NextOptions,
  NextReconfigure,
  NextTasks
} from './definitions';
import {
  reconfigureBabelNext,
  reconfigureEslintNext,
  reconfigureJestNext
} from './configure';

export function hydrateNext(
  options: NextOptions | Empty
): Required<NextOptions> {
  const global = hydrateNextGlobal(options ? options.global : null);
  const universal = hydrateUniversal(options);
  const tooling = hydrateTooling(options);
  const next = options ? { size: { ...options.size } } : { size: {} };

  return {
    ...universal,
    ...tooling,
    ...next,
    global,
    test: {
      ...tooling.test,
      ignore: [
        ...(tooling.test.ignore || []),
        '<rootDir>/out',
        '<rootDir>/build',
        '<rootDir>/.next',
        '<rootDir>/public'
      ]
    }
  };
}

export function next(
  options: NextOptions | Empty,
  reconfigure: NextReconfigure | Empty,
  fetcher: Riseup.Fetcher<NextConfigure> | Empty
): NextTasks {
  const opts = hydrateNext(options);

  const deps = {
    universal: extract(universal, opts, reconfigure),
    tooling: extract(tooling, opts, {
      ...reconfigure,
      babel: (config) => reconfigureBabelNext(config),
      eslint: (config) => reconfigureEslintNext(config),
      jest: (config) => reconfigureJestNext(config)
    })
  };

  let configure: NextConfigure = {
    ...deps.universal.configure,
    ...deps.tooling.configure,
    babel(context: Riseup.Context) {
      const config = reconfigureBabelNext(
        deps.tooling.configure.babel(context)
      );
      return ['dev', 'build'].includes(context.task)
        ? reconfigureBabelStubs(null, config)
        : config;
    },
    eslint(context: Riseup.Context) {
      return reconfigureEslintNext(deps.tooling.configure.eslint(context));
    },
    jest(context: Riseup.Context) {
      return reconfigureJestNext(deps.tooling.configure.jest(context));
    }
  };

  if (fetcher) fetcher(configure);
  configure = withReconfigure(configure, reconfigure);

  return {
    ...deps.universal.tasks,
    ...deps.tooling.tasks,
    dev: create(({ cwd }) => {
      return dev(opts.global, {
        babel: configure.babel({ cwd, task: 'dev' })
      });
    }),
    start: create(() => start(opts.global)),
    build: create(({ cwd }) => {
      return build(opts.global, {
        babel: configure.babel({ cwd, task: 'build' })
      });
    }),
    export: create(() => exportTask(opts.global)),
    size: create(() => size(opts.size)),
    analyze: create(() => analyze())
  };
}