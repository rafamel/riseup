import { TypeGuard, Serial } from 'type-core';

import { defaults } from '../defaults';

export interface ConfigureTypedocParams {
  name?: string | null;
  overrides?: Serial.Object;
}

export function configureTypedoc(
  params: ConfigureTypedocParams | null
): Serial.Object {
  const opts = {
    name: TypeGuard.isString(params?.name) ? params?.name : defaults.docs.name,
    overrides: params?.overrides || defaults.docs.overrides
  };

  return {
    ...(opts.name === null ? {} : { name: opts.name }),
    theme: 'default',
    excludeExternals: true,
    excludePrivate: true,
    excludeProtected: true,
    excludeInternal: true,
    exclude: ['**/__mocks__/**/*'],
    ...opts.overrides
  };
}
