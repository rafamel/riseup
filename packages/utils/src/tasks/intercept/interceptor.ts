/* eslint-disable no-eval */
import { Dictionary } from 'type-core';
import { fs as memfs } from 'memfs';
import nativefs from 'fs';
import path from 'path';
import mockery from 'mockery';
import { coerce } from 'ensurism';
import { constants } from '../../constants';

const inputArr: any[] = coerce(
  process.env[constants.interceptor.env],
  {
    type: 'array',
    items: {
      type: 'object',
      required: ['path', 'content', 'require'],
      properties: {
        path: { type: 'string' },
        content: { type: 'string' },
        require: {
          oneOf: [{ type: 'null' }, { type: 'string', enum: ['js', 'json'] }]
        }
      }
    }
  },
  { assert: true }
);

// Only intercept files that don't exist in the local filesystem.
const filesArr = inputArr.filter((file) => !nativefs.existsSync(file.path));

// Create a native fs compatible object
const pathsArr = filesArr.map((file) => file.path);
const proxyfs = interceptMethods(nativefs, memfs, pathsArr);
if (nativefs.promises) {
  proxyfs.promises = interceptMethods(
    nativefs.promises,
    memfs.promises,
    pathsArr
  );
}

// Mock fs calls
mockery.enable({ warnOnReplace: true, warnOnUnregistered: false });
mockery.registerMock('fs', proxyfs);

for (const file of filesArr) {
  memfs.mkdirpSync(path.dirname(file.path));
  memfs.writeFileSync(file.path, file.content);

  if (file.require) {
    mockery.registerMock(
      file.path,
      file.require === 'js' ? eval(file.content) : JSON.parse(file.content)
    );
  }
}

function interceptMethods(
  native: Dictionary,
  replacement: Dictionary,
  paths: string[]
): Dictionary {
  const normalPaths = paths.map((item) => path.normalize(item));
  const result: Dictionary = { ...native };

  for (const [key, value] of Object.entries(result)) {
    result[key] =
      typeof value === 'function'
        ? new Proxy(value, {
            apply(_, self, args) {
              return Object.hasOwnProperty.call(replacement, key) &&
                normalPaths.includes(path.normalize(String(args[0])))
                ? replacement[key].apply(self, args)
                : native[key].apply(self, args);
            }
          })
        : value;
  }

  return result;
}
