import { Empty } from 'type-core';
import { create } from 'kpo';
import { withReconfigure, Riseup } from '@riseup/utils';
import { node, lint, test, fix } from './tasks';
import {
  configureBabel,
  configureEslint,
  configureJest,
  configureTypescript,
  reconfigureBabelEnv
} from './configure';
import {
  ToolingConfigure,
  ToolingOptions,
  ToolingReconfigure,
  ToolingTasks
} from './definitions';

export function hydrateTooling(
  options: ToolingOptions | Empty
): Required<ToolingOptions> {
  return options
    ? {
        global: { ...options.global },
        fix: { ...options.global, ...options.fix },
        lint: { ...options.global, ...options.lint },
        test: { ...options.global, ...options.test }
      }
    : { global: {}, fix: {}, lint: {}, test: {} };
}

export function tooling(
  options: ToolingOptions | Empty,
  reconfigure: ToolingReconfigure | Empty,
  fetcher: Riseup.Fetcher<ToolingConfigure> | Empty
): ToolingTasks {
  const opts = hydrateTooling(options);

  let configure: ToolingConfigure = {
    babel() {
      return reconfigureBabelEnv(
        { targets: { node: process.version.slice(1) } },
        configureBabel(opts.global)
      );
    },
    typescript(context: Riseup.Context) {
      return configureTypescript(context.cwd);
    },
    eslint(context: Riseup.Context) {
      return configureEslint(
        context.cwd,
        context.task === 'fix' ? { ...opts.lint, highlight: [] } : opts.lint,
        {
          babel: configure.babel(context),
          typescript: configure.typescript(context)
        }
      );
    },
    jest(context: Riseup.Context) {
      return configureJest(opts.test, { babel: configure.babel(context) });
    }
  };

  if (fetcher) fetcher(configure);
  configure = withReconfigure(configure, reconfigure);

  return {
    node: create(({ cwd }) => {
      return node(opts.global, {
        babel: configure.babel({ cwd, task: 'node' })
      });
    }),
    fix: create(({ cwd }) => {
      return fix(opts.fix, {
        eslint: configure.eslint({ cwd, task: 'fix' })
      });
    }),
    lint: create(({ cwd }) => {
      return lint(opts.lint, {
        eslint: configure.eslint({ cwd, task: 'lint' }),
        typescript: configure.typescript({ cwd, task: 'lint' })
      });
    }),
    test: create(({ cwd }) => {
      return test({ jest: configure.jest({ cwd, task: 'test' }) });
    })
  };
}
