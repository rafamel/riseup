import { Deep, Empty, Dictionary, Serial, TypeGuard, UnaryFn } from 'type-core';
import { merge } from 'merge-strategies';
import { hydrateToolingGlobal } from '../../global';
import { paths } from '../../paths';

export interface ConfigureBabelParams {
  env?: Serial.Object | null;
}

export interface ConfigureBabelOptions extends ConfigureBabelParams {
  alias?: Dictionary<string>;
  stubs?: {
    identity?: string[];
    route?: string[];
    image?: string[];
  };
}

export function hydrateConfigureBabel(
  options: ConfigureBabelOptions | Empty
): Deep.Required<ConfigureBabelOptions> {
  return merge(
    {
      ...hydrateToolingGlobal(options),
      env: { targets: 'defaults' } as any
    },
    options || undefined
  );
}

export function configureBabel(
  options: ConfigureBabelOptions | Empty
): Serial.Object {
  const opts = hydrateConfigureBabel(options);
  return {
    presets: [
      ...(opts.env === null ? [] : [[paths.babel.presetEnv, opts.env]]),
      [paths.babel.presetTypeScript, { allowDeclareFields: true }]
    ],
    plugins: [
      [paths.babel.pluginModuleResolver, { alias: opts.alias }],
      [
        paths.babel.pluginModuleNameMapper,
        { moduleNameMapper: createStubsMapperHelper(opts.stubs) }
      ]
    ]
  };
}

export function reconfigureBabelEnv(
  env: Serial.Object | null,
  babel: Serial.Object
): Serial.Object {
  return reconfigureBabelModifyHelper(
    'presets',
    'first',
    (str) => str === paths.babel.presetEnv,
    () => {
      const opts = hydrateConfigureBabel({ env });
      return TypeGuard.isEmpty(opts.env)
        ? null
        : [paths.babel.presetEnv, opts.env];
    },
    babel
  );
}

export function reconfigureBabelAlias(
  alias: Dictionary<string> | UnaryFn<Dictionary<string>, Dictionary<string>>,
  babel: Serial.Object
): Serial.Object {
  return reconfigureBabelModifyHelper(
    'plugins',
    'last',
    (str) => str === paths.babel.pluginModuleResolver,
    (item) => {
      const options = Array.isArray(item) ? item[1] || {} : {};
      const opts = hydrateConfigureBabel({
        alias: TypeGuard.isFunction(alias)
          ? alias(options.alias || {}) || {}
          : alias || {}
      });
      return [
        paths.babel.pluginModuleResolver,
        {
          ...options,
          alias: opts.alias
        }
      ];
    },
    babel
  );
}

export function reconfigureBabelStubs(
  stubs: { identity?: string[]; route?: string[]; image?: string[] } | null,
  babel: Serial.Object
): Serial.Object {
  return reconfigureBabelModuleMapper((maps) => {
    const clean = Object.entries(maps).reduce((acc, [key, value]) => {
      return value === paths.babel.mapperIdentity ||
        value === paths.babel.mapperRoute ||
        value === paths.babel.mapperImage
        ? acc
        : { ...acc, [key]: value };
    }, {});

    return stubs
      ? {
          ...clean,
          ...createStubsMapperHelper(hydrateConfigureBabel({ stubs }).stubs)
        }
      : clean;
  }, babel);
}

export function reconfigureBabelModuleMapper(
  maps: Dictionary<string> | UnaryFn<Dictionary<string>, Dictionary<string>>,
  babel: Serial.Object
): Serial.Object {
  return reconfigureBabelModifyHelper(
    'plugins',
    'last',
    (str) => str === paths.babel.pluginModuleNameMapper,
    (item) => {
      const options = Array.isArray(item) ? item[1] || {} : {};
      return [
        paths.babel.pluginModuleNameMapper,
        {
          ...options,
          moduleNameMapper: TypeGuard.isFunction(maps)
            ? maps(options.moduleNameMapper || {}) || {}
            : maps || {}
        }
      ];
    },
    babel
  );
}

function createStubsMapperHelper(stubs: {
  identity: string[];
  route: string[];
  image: string[];
}): Serial.Object {
  return {
    ...(stubs.identity.length
      ? {
          ['^.+\\.(' + stubs.identity.join('|') + ')$']:
            paths.babel.mapperIdentity
        }
      : {}),
    ...(stubs.route.length
      ? {
          ['^.+\\.(' + stubs.route.join('|') + ')$']: paths.babel.mapperRoute
        }
      : {}),
    ...(stubs.image.length
      ? {
          ['^.+\\.(' + stubs.image.join('|') + ')$']: paths.babel.mapperImage
        }
      : {})
  };
}

function reconfigureBabelModifyHelper(
  key: 'presets' | 'plugins',
  add: 'first' | 'last',
  match: UnaryFn<string, boolean>,
  fn: UnaryFn<null | string | [string, any], null | string | [string, any]>,
  babel: Serial.Object
): Serial.Object {
  let modified = false;
  const arr = ((babel[key] as Serial.Array) || []).map((item) => {
    const str = Array.isArray(item) ? item[0] : item;
    if (!match(str as string)) return item;

    modified = true;
    return fn(item as any);
  });

  return {
    ...babel,
    [key]: [
      ...(add === 'first' ? [] : arr),
      ...(modified ? [] : [fn(null)]),
      ...(add === 'first' ? arr : [])
    ].filter((item) => !TypeGuard.isEmpty(item))
  };
}
