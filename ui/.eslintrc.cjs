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
    'eqeqeq': ['warn'],
    'indent': ['warn', 2],
    'no-multi-spaces': ['warn'],
    'no-trailing-spaces': 'warn',
    'no-useless-rename': ['warn'],
    'no-var': ['warn'],
    'object-shorthand': ['warn'], 'quotes': ['warn', 'single', { avoidEscape: true }],
    'semi': ['warn', 'never'],
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
  },
}
