import sourceMapSupport from 'source-map-support';

import { Register, Transpiler } from '../transpile';

sourceMapSupport.install({
  environment: 'node',
  hookRequire: true,
  handleUncaughtExceptions: false
});

Transpiler.deserialize(
  process.env.TRANSPILER_SETTINGS || '{}',
  ({ params, options }) => new Register(params, options).register()
);
