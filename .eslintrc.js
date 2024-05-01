module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb-base',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    // 0 - OFF, 1 - WARN, 2 - ERROR
    radix: 0,
    'new-cap': 0,
    'no-undef': 0,
    'no-alert': 0,
    'no-shadow': 0,
    'no-console': 1,
    'func-names': 0,
    'no-plusplus': 0,
    'comma-dangle': 0,
    'no-unused-vars': 0,
    'prettier/prettier': 2,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,

    // IMPORT
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
  },
};
