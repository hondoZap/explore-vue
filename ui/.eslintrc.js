module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
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
    'brace-style': ['warn', '1tbs'],
    'comma-dangle': ['warn', 'always-multiline'],
    'curly': ['warn', 'all'],
    'indent': ['warn', 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces': 'warn',
    'no-useless-rename': ['warn'],
    'no-var': ['warn'],
    'object-shorthand': ['warn'],
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'semi': ['warn', 'never'],
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
  },
}

