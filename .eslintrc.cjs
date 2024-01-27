module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './src']],
      },
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          ...[
            '~/app/**',
            '~/components/**',
            '~/entities/**',
            '~/shared/**',
          ].map((pattern) => ({
            pattern,
            group: 'internal',
            position: 'before',
          })),
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
