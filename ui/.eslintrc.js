module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/type-annotation-spacing': ['warn'],
    '@vue/valid-v-slot': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    'indent': ['error', 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces': 'error',
    'no-useless-rename': ['warn'],
    'no-var': ['warn'],
    'object-shorthand': ['warn'],
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'semi': ['warn', 'never'],
  },
}

