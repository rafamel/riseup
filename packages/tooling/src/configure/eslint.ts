import { TypeGuard, Serial } from 'type-core';

import { defaults } from '../defaults';
import { Transpile, Extensions } from '../transpile';

export interface ConfigureEslintParams {
  types?: boolean;
  react?: boolean;
  highlight?: string[];
  rules?: Serial.Object;
}

export interface ConfigureEslintOptions {
  prettier?: boolean;
  platform?: Transpile.Platform;
  loaders?: Transpile.Loaders;
}

export function configureEslint(
  params: ConfigureEslintParams | null,
  options: ConfigureEslintOptions | null
): Serial.Object {
  const opts = {
    types: TypeGuard.isBoolean(params?.types)
      ? params?.types
      : defaults.lint.types,
    react: TypeGuard.isBoolean(params?.react)
      ? params?.react
      : defaults.lint.react,
    highlight: params?.highlight || defaults.lint.highlight,
    rules: params?.rules || defaults.lint.rules,
    prettier: TypeGuard.isBoolean(options?.prettier)
      ? options?.prettier
      : defaults.global.prettier,
    platform: options?.platform || defaults.global.platform,
    loaders: { ...defaults.global.loaders, ...options?.loaders }
  };

  const extensions = new Extensions(opts.loaders);
  const extjs = extensions.select(['js', 'jsx'], null).extensions();
  const extts = extensions.select(['ts', 'tsx'], null).extensions();
  const extcode = [...extjs, ...extts];

  return {
    extends: [
      'standard',
      'plugin:import/recommended',
      'plugin:unicorn/recommended',
      ...(opts.prettier ? ['plugin:prettier/recommended'] : []),
      ...(opts.types ? ['plugin:@typescript-eslint/recommended'] : []),
      ...(opts.react ? ['plugin:react/recommended'] : []),
      ...(opts.react ? ['plugin:react-hooks/recommended'] : []),
      ...(opts.react ? ['plugin:jsx-a11y/recommended'] : [])
    ],
    env:
      opts.platform === 'node'
        ? { node: true }
        : opts.platform === 'browser'
        ? { browser: true }
        : { 'shared-node-browser': true },
    parserOptions: {
      impliedStrict: true,
      sourceType: 'module'
    },
    plugins: [],
    settings: {
      'import/extensions': extcode,
      'import/resolver': { node: { extensions: extcode } },
      ...(opts.react ? { react: { version: '999.999.999' } } : {})
    },
    globals: {},
    rules: {
      /* ROOT */
      camelcase: 0,
      'no-redeclare': 0,
      'no-return-await': 0,
      'no-use-before-define': 0,
      'no-console': 1,
      'no-unused-vars': 1,
      'no-warning-comments': [1, { terms: opts.highlight, location: 'start' }],
      'lines-between-class-members': [1, 'never'],
      'object-shorthand': 2,
      /* NODE */
      'n/no-callback-literal': 0,
      /* IMPORT */
      'import/export': 0,
      /* STANDARD */
      'standard/no-callback-literal': 0,
      'standard/array-bracket-even-spacing': 0,
      /* UNICORN */
      'unicorn/no-null': 0,
      'unicorn/prefer-spread': 0,
      'unicorn/filename-case': 0,
      'unicorn/no-array-reduce': 0,
      'unicorn/throw-new-error': 0,
      'unicorn/catch-error-name': 0,
      'unicorn/no-process-exit': 0,
      'unicorn/no-useless-spread': 0,
      'unicorn/no-useless-undefined': 0,
      'unicorn/prefer-export-from': 0,
      'unicorn/prefer-array-flat-map': 0,
      'unicorn/no-static-only-class': 0,
      'unicorn/explicit-length-check': 0,
      'unicorn/prevent-abbreviations': 0,
      'unicorn/new-for-builtins': 2,
      /* PRETTIER */
      ...(opts.prettier ? { 'prettier/prettier': 0 } : {}),
      /* REACT */
      ...(opts.react ? { 'react/react-in-jsx-scope': 0 } : {}),
      ...(opts.react ? { 'react/no-render-return-value': 0 } : {})
    },
    overrides: [
      /* TYPESCRIPT FIXES */
      {
        files: [`*{${extts.join(',')}}`],
        rules: {
          // See https://github.com/eslint/typescript-eslint-parser/issues/437
          'no-undef': 0,
          // Interprets overloads as duplicates
          'no-dupe-class-members': 0,
          // Fix for paths and imports, as they will be resolved by typescript
          'import/named': 0,
          'import/no-unresolved': 0,
          // Conflicts with required catch argument
          'unicorn/prefer-optional-catch-binding': 0,
          // Exposes parser bugs, covered by noUnusedLocals/noUnusedParameters
          'no-unused-vars': 0,
          '@typescript-eslint/no-unused-vars': 0
        }
      },
      /* TYPESCRIPT RULES */
      {
        files: [`*{${extts.join(',')}}`],
        rules: opts.types
          ? {
              '@typescript-eslint/indent': 0,
              '@typescript-eslint/camelcase': 0,
              '@typescript-eslint/no-explicit-any': 0,
              '@typescript-eslint/no-object-literal-type-assertion': 0,
              '@typescript-eslint/interface-name-prefix': 0,
              '@typescript-eslint/ban-ts-ignore': 0,
              '@typescript-eslint/no-empty-function': 0,
              '@typescript-eslint/no-empty-interface': 0,
              '@typescript-eslint/explicit-module-boundary-types': 0,
              '@typescript-eslint/explicit-function-return-type': [
                1,
                { allowExpressions: true, allowTypedFunctionExpressions: true }
              ],
              '@typescript-eslint/no-use-before-define': [
                2,
                { functions: false }
              ],
              '@typescript-eslint/array-type': [
                2,
                { default: 'array-simple', readonly: 'array-simple' }
              ],
              '@typescript-eslint/no-namespace': [
                2,
                { allowDeclarations: true, allowDefinitionFiles: true }
              ],
              '@typescript-eslint/no-inferrable-types': [
                2,
                { ignoreParameters: true, ignoreProperties: true }
              ]
            }
          : {}
      },
      /* USER RULES */
      {
        files: [`*{${extcode.join(',')}}`],
        rules: opts.rules
      }
    ]
  };
}
