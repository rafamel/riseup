import { Deep, Empty, Serial } from 'type-core';
import { shallow } from 'merge-strategies';
import { hydrateToolingGlobal } from '@riseup/tooling';
import { paths } from '../../paths';
import { defaults } from '../../defaults';
import { hydrateLibraryGlobal } from '../../global';

export interface ConfigurePikaParams {
  assets?: string[];
  types?: boolean;
  targets?: Serial.Object;
  multitarget?: boolean;
  manifest?: Serial.Object;
}

export interface ConfigurePikaOptions extends ConfigurePikaParams {
  output?: string;
  extensions?: {
    js?: string[];
    ts?: string[];
  };
}

export interface ConfigurePikaConfig {
  babel: Serial.Object;
  typescript: Serial.Object;
}

export function hydrateConfigurePika(
  options: ConfigurePikaOptions | Empty
): Deep.Required<ConfigurePikaOptions> {
  const { output } = hydrateLibraryGlobal(options);
  return shallow(
    {
      ...hydrateToolingGlobal(options),
      output,
      assets: defaults.build.assets,
      types: defaults.build.types,
      targets: defaults.build.targets,
      multitarget: defaults.build.multitarget,
      manifest: defaults.build.manifest
    },
    options || undefined
  );
}

export function configurePika(
  options: ConfigurePikaOptions | Empty,
  config: ConfigurePikaConfig
): Serial.Array {
  const opts = hydrateConfigurePika(options);
  const configuration = {
    ...config,
    typescript: {
      ...config.typescript,
      include: ['src']
    }
  };

  return [
    ...[
      [paths.pika.transpile, { options: opts, config: configuration }],
      [paths.pika.assets, { files: opts.assets }]
    ],
    ...(opts.multitarget
      ? [
          [
            paths.pika.standard,
            { exclude: ['__mocks__/**/*', '__tests__/**/*'] }
          ],
          [paths.pika.web]
        ]
      : []),
    [paths.pika.manifest, opts]
  ];
}
