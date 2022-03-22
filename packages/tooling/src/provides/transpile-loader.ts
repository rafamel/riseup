import { Loader, Transpiler } from '../transpile';

const { load, resolve } = Transpiler.deserialize(
  process.env.TRANSPILER_SETTINGS || '{}',
  ({ params, options }) => new Loader(params, options)
);

export { load, resolve };
