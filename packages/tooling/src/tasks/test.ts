import { Serial } from 'type-core';
import { create, exec, Task } from 'kpo';
import { tmpTask } from '@riseup/utils';

import { paths } from '../paths';
import { Transpiler } from '../utils';

export type TestParams = Transpiler.Params;
export type TestOptions = Transpiler.Options;

export interface TestConfigurations {
  jest: Serial.Object;
}

export function test(
  params: TestParams | null,
  options: TestOptions | null,
  configurations: TestConfigurations
): Task.Async {
  return create((ctx) => {
    return tmpTask(
      {
        ext: 'json',
        content: JSON.stringify(configurations.jest),
        overrides: { name: 'jest.config', ext: true }
      },
      ([file]) => {
        return exec(
          process.execPath,
          [paths.jestBin, '--config', file, '--rootDir', ctx.cwd],
          {
            env: {
              NODE_ENV: ctx.env.NODE_ENV || 'test',
              TRANSPILER_SETTINGS: Transpiler.serialize({
                params: params || {},
                options: options || {}
              })
            }
          }
        );
      }
    );
  });
}
