const { join } = require('path');

module.exports = {
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/require-default-props': 'off',
    'import/export': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    'unicorn/filename-case': 'off',
  },
};
