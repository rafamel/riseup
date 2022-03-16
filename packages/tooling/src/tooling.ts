import { create } from 'kpo';
import { Preset } from '@riseup/utils';

import {
  configureEslint,
  ConfigureEslintOptions,
  ConfigureEslintParams,
  configureJest,
  ConfigureJestOptions,
  ConfigureJestParams
} from './configure';
import {
  build,
  BuildParams,
  fix,
  FixConfigurations,
  FixOptions,
  FixParams,
  lint,
  LintConfigurations,
  LintOptions,
  LintParams,
  node,
  NodeOptions,
  NodeParams,
  test,
  TestConfigurations,
  TestParams
} from './tasks';

export declare namespace Tooling {
  type Tasks = 'build' | 'node' | 'fix' | 'lint' | 'test';
  type Configurations = FixConfigurations &
    LintConfigurations &
    TestConfigurations;

  interface Options {
    global?: ConfigureEslintOptions &
      ConfigureJestOptions &
      FixOptions &
      LintOptions &
      NodeOptions;
    build?: BuildParams;
    node?: NodeParams;
    lint?: ConfigureEslintParams & FixParams & LintParams;
    test?: ConfigureJestParams & TestParams;
  }
}

export class Tooling extends Preset<Tooling.Tasks, Tooling.Configurations> {
  public constructor(options: Tooling.Options | null) {
    super(
      {
        build: create(() => {
          return build(options?.build || null, options?.global || null);
        }),
        node: create(() => {
          return node(options?.node || null, options?.global || null);
        }),
        fix: create(() => {
          return fix(options?.lint || null, options?.global || null, {
            eslint: this.retrieve('eslint')
          });
        }),
        lint: create(() => {
          return lint(options?.lint || null, options?.global || null, {
            eslint: this.retrieve('eslint')
          });
        }),
        test: create(() => {
          return test(options?.test || null, options?.global || null, {
            jest: this.retrieve('jest')
          });
        })
      },
      {
        eslint: () => {
          return configureEslint(
            options?.lint || null,
            options?.global || null
          );
        },
        jest: () => {
          return configureJest(options?.test || null, options?.global || null);
        }
      }
    );
  }
}
