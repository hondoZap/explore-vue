/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
    'brace-style': ['warn', '1tbs'],
    'comma-dangle': ['warn', 'always-multiline'],
    'curly': ['warn', 'all'],
    'eol-last': ['warn', 'always'],
    'eqeqeq': 'error',
    'indent': ['warn', 2],
    'keyword-spacing': ['warn', { before: true, after: true }],
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'no-trailing-spaces': 'warn',
    'no-unexpected-multiline': 'error',
    'no-useless-rename': 'warn',
    'no-var': 'warn',
    'object-shorthand': ['warn'], 'quotes': ['warn', 'single', { avoidEscape: true }],
    'semi': ['warn', 'never'],
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
  },
}
