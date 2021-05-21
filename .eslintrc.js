/* eslint-disable quotes */
module.exports = {
  env: {
    es2021: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: ['plugin:@typescript-eslint/recommended'],

  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          String: false,
          Boolean: false,
          Number: false,
          Symbol: false,
          '{}': false,
          Object: false,
          object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  },
};
