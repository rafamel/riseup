import { Deep, Empty, Dictionary, Serial } from 'type-core';
import { configs } from '@typescript-eslint/eslint-plugin';
import { deep, merge } from 'merge-strategies';
import path from 'path';
import { tmpFile } from '@riseup/utils';
import { hydrateToolingGlobal } from '../global';
import { defaults } from '../defaults';
import { paths } from '../paths';

export interface ConfigureEslintParams {
  dir?: string | string[];
  react?: boolean;
  env?: Dictionary<boolean>;
  highlight?: string[];
  rules?: Serial.Object;
}

export interface ConfigureEslintOptions extends ConfigureEslintParams {
  prettier?: boolean;
  alias?: Dictionary<string>;
  stubs?: {
    identity?: string[];
    route?: string[];
    image?: string[];
  };
  extensions?: {
    js?: string[];
    ts?: string[];
  };
}

export interface ConfigureEslintConfig {
  babel: Serial.Object;
  typescript: Serial.Object;
}

export function hydrateConfigureEslint(
  options: ConfigureEslintOptions | Empty
): Deep.Required<ConfigureEslintOptions> {
  return merge(
    {
      ...hydrateToolingGlobal(options),
      dir: defaults.lint.dir,
      react: defaults.lint.react,
      env: defaults.lint.env,
      highlight: defaults.lint.highlight,
      rules: defaults.lint.rules
    },
    options || undefined
  );
}

export function configureEslint(
  cwd: string,
  options: ConfigureEslintOptions | Empty,
  config: ConfigureEslintConfig
): Serial.Object {
  const opts = hydrateConfigureEslint(options);
  const dir = Array.isArray(opts.dir) ? opts.dir : [opts.dir];
  const codeExtensions = [...opts.extensions.js, ...opts.extensions.ts];
  const tsconfig = tmpFile('json', {
    ...config.typescript,
    include: dir.map((x) => path.resolve(cwd, x))
  });

  // TODO: Remove additional plugins and configs
  // dependencies once eslint flat config lands.
  // See: https://github.com/eslint/eslint/issues/13481

  const react = {
    extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
    plugins: ['react', 'react-hooks', 'jsx-a11y'],
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/no-render-return-value': 0
    }
  };

  const eslint = {
    extends: [
      paths.eslint.configStandard,
      ...(opts.prettier ? ['plugin:prettier/recommended'] : []),
      'plugin:import/recommended'
    ],
    env: opts.env,
    parserOptions: {
      impliedStrict: true,
      sourceType: 'module'
    },
    plugins: [...(opts.prettier ? ['prettier'] : []), 'import'],
    globals: {},
    rules: {
      /* DISABLED */
      camelcase: 0,
      'no-redeclare': 0,
      'import/export': 0,
      'no-return-await': 0,
      'no-use-before-define': 0,
      'node/no-callback-literal': 0,
      'standard/no-callback-literal': 0,
      'standard/array-bracket-even-spacing': 0,
      /* WARNINGS */
      'no-warning-comments': [1, { terms: opts.highlight, location: 'start' }],
      'no-unused-vars': 1,
      'no-console': 1,
      /* ERRORS */
      'lines-between-class-members': [1, 'never'],
      // Prettier
      ...(opts.prettier ? { 'prettier/prettier': 0 } : {})
    },
    settings: {
      'import/extensions': codeExtensions.map((x) =>
        x[0] === '.' ? x : '.' + x
      ),
      'import/resolver': {
        alias: {
          map: Object.entries(opts.alias || {}),
          extensions: ['json']
            .concat(opts.extensions.js)
            .concat(opts.extensions.ts)
            .concat(opts.stubs.identity)
            .concat(opts.stubs.route)
            .concat(opts.stubs.image)
            .map((x) => (x[0] === '.' ? x : '.' + x))
        }
      }
    },
    overrides: [
      /* JAVASCRIPT */
      {
        files: [`*.{${opts.extensions.js.join(',')}}`],
        parser: paths.eslint.parserBabel,
        plugins: ['babel'],
        parserOptions: {
          requireConfigFile: false,
          babelOptions: config.babel,
          ecmaFeatures: { jsx: true }
        },
        rules: {
          /* WARNINGS */
          'babel/no-invalid-this': 1,
          'babel/semi': 1
        }
      },
      /* TYPESCRIPT */
      {
        files: [`*.{${opts.extensions.ts.join(',')}}`],
        parser: paths.eslint.parserTypescript,
        parserOptions: {
          project: tsconfig,
          tsconfigRootDir: cwd,
          ecmaFeatures: { jsx: true }
        },
        plugins: ['@typescript-eslint'],
        // Overrides don't allow for extends
        rules: {
          ...configs.recommended.rules,
          /* FIXES */
          // See: https://github.com/eslint/typescript-eslint-parser/issues/437
          'no-undef': 0,
          // Interprets overloads as duplicates
          'no-dupe-class-members': 0,
          // Very prone to expose parser bugs and already
          // covered by noUnusedLocals and noUnusedParameters
          '@typescript-eslint/no-unused-vars': 0,
          /* DISABLED */
          '@typescript-eslint/indent': 0,
          '@typescript-eslint/camelcase': 0,
          '@typescript-eslint/no-explicit-any': 0,
          '@typescript-eslint/no-object-literal-type-assertion': 0,
          '@typescript-eslint/interface-name-prefix': 0,
          '@typescript-eslint/ban-ts-ignore': 0,
          '@typescript-eslint/no-empty-function': 0,
          '@typescript-eslint/no-empty-interface': 0,
          '@typescript-eslint/explicit-module-boundary-types': 0,
          /* WARNINGS */
          '@typescript-eslint/explicit-function-return-type': [
            1,
            {
              allowExpressions: true,
              allowTypedFunctionExpressions: true
            }
          ],
          /* ERRORS */
          '@typescript-eslint/no-use-before-define': [2, { functions: false }],
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
      },
      /* USER RULES */
      {
        files: [`*.{${codeExtensions.join(',')}}`],
        rules: opts.rules
      }
    ]
  };

  return opts.react ? deep(eslint, react) : eslint;
}
