const globals = require('eslint-restricted-globals');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'react-app',
    'standard',
    'plugin:import/errors',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  env: {
    browser: true,
    jest: true
  },
  parserOptions: {
    impliedStrict: true
  },
  plugins: ['prettier', 'jest', 'react', 'jsx-a11y', 'import', 'babel'],
  globals: {},
  rules: {
    'no-console': 1,
    'jsx-a11y/no-autofocus': 0,
    'no-restricted-globals': [2, 'fetch'].concat(globals),
    'react/prop-types': [2, { ignore: ['styles', 'theme', 'store'] }],
    // eslint-plugin-babel
    'babel/no-invalid-this': 1,
    'babel/semi': 1,
    // Breaking change of jsx-x11y with 'react-app' defaults
    'jsx-a11y/href-no-hash': 0,
    // Prettier
    'prettier/prettier': [2, require('./.prettierrc')]
  },
  settings: {
    // babel-plugin-module-resolver
    'import/resolver': {
      'babel-module': {}
    }
  }
};
