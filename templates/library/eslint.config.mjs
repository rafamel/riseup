import afc from '@antfu/eslint-config';

export default afc({
  /* Files */
  ignores: ['docs/*'],
  gitignore: true,
  /* Languages & Features */
  javascript: true,
  typescript: true,
  jsx: true,
  yaml: true,
  jsonc: true,
  markdown: true,
  /* Frameworks & Libraries */
  test: true,
  react: false,
  stylistic: false
}).then((opts) => [
  ...opts,
  {
    rules: {
      /* ROOT */
      'prefer-template': 0,
      'no-console': 1,
      'no-warning-comments': [
        1,
        { terms: ['fixme', 'todo', 'refactor', 'xxx'] }
      ],
      /* JSONC */
      'jsonc/sort-keys': 0,
      /* Typescript */
      'ts/no-redeclare': 0,
      'ts/no-namespace': [
        2,
        { allowDeclarations: true, allowDefinitionFiles: true }
      ],
      /* Test */
      'test/consistent-test-it': [2, { fn: 'test' }]
    }
  }
]);
