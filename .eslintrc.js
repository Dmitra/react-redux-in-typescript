module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.babel.js',
        env: 'development',
      },
    },
  },
  plugins: ['jest', 'react'],
  extends: [
    'plugin:react/recommended',
    '@graphiy/eslint-config',
  ],
  rules: {
    'multiline-ternary': ['error', 'never'],
    'react/display-name': 0,
    'react/no-unescaped-entities': ['error', { forbid: ['>', '<'] }],
    'react/prop-types': ['error', { skipUndeclared: true }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
  },
  globals: {
    _: true,
  },
  root: true,
  overrides: [{
    files: ['**/*.{ts,tsx}'],
    env: {
      jest: true,
    },
    globals: {
      React: 'writable',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        webpack: {
          config: 'webpack.config.babel.js',
          env: 'development',
        },
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: './tsconfig.json',
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:import/typescript',
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': [0],
      '@typescript-eslint/no-empty-function': 'off',
      // temp allowing during TS migration
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
          minimumDescriptionLength: 4,
        },
      ],
      'import/extensions': ['error', 'ignorePackages', {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      }],
    },
  }],
}