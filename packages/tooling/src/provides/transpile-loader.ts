import sourceMapSupport from 'source-map-support';

import { Loader, Register, Transpiler } from '../transpile';

sourceMapSupport.install({
  environment: 'node',
  hookRequire: true,
  handleUncaughtExceptions: false
});

const { load, resolve } = Transpiler.deserialize(
  process.env.TRANSPILER_SETTINGS || '{}',
  ({ params, options }) => {
    new Register(params, options).register();
    return new Loader(params, options);
  }
);

export { load, resolve };
