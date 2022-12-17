module.exports = {
  extends: ['@moralisweb3', 'plugin:@next/next/recommended'],
  ignorePatterns: ['**/build/**/*'],
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
};
