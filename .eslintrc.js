module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    '@antfu/eslint-config-ts',
  ],
  plugins: [
    'jest',
  ],
  rules: {
    'space-before-function-paren': 'off'
  },
}
