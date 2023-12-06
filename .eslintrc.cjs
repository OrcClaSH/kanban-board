module.exports = {
  root: true,
  env: { node: true, browser: true, es2018: true },
  extends: [
    'airbnb',
    'prettier',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'react',
    'import',
    'prettier',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'no-shadow': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': [
      0,
      {
        html: 'ignore',
      },
    ],

    'no-restricted-imports': [
      'error',
      {
        patterns: [
          // Use public API only
          '@app/**',
          '@processes/*/**',
          '@pages/*/**',
          '@widgets/*/**',
          '@features/*/**',
          '@entities/*/**',
          '@shared/*/*/**',

          '../**/app',
          '../**/processes',
          '../**/pages',
          '../**/widgets',
          '../**/features',
          '../**/entities',
          '../**/shared',
        ],
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        pathGroups: [
          '@processes/**',
          '@pages/**',
          '@widgets/**',
          '@features/**',
          '@entities/**',
          '@shared/**',
        ].map((pattern) => ({
          pattern,
          group: 'internal',
          position: 'after',
        })),
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // processes
          {
            target: 'src/processes',
            from: 'src/app',
          },
          // Cross import
          {
            target: 'src/processes/*/**/*',
            from: 'src/processes/*/index.ts',
          },

          // pages
          {
            target: 'src/pages',
            from: 'src/app',
          },
          {
            target: 'src/pages',
            from: 'src/processes',
          },
          // Cross import
          {
            target: 'src/pages/*/**/*',
            from: 'src/pages/*/index.ts',
          },

          // widgets
          {
            target: 'src/widgets',
            from: 'src/app',
          },
          {
            target: 'src/widgets',
            from: 'src/processes',
          },
          {
            target: 'src/widgets',
            from: 'src/pages',
          },
          // Cross import
          {
            target: 'src/widgets/*/**/*',
            from: 'src/widgets/*/index.ts',
          },

          // features
          {
            target: 'src/features',
            from: 'src/app',
          },
          {
            target: 'src/features',
            from: 'src/processes',
          },
          {
            target: 'src/features',
            from: 'src/pages',
          },
          {
            target: 'src/features',
            from: 'src/widgets',
          },
          // Cross import
          {
            target: 'src/features/*/**/*',
            from: 'src/features/*/index.ts',
          },

          // entities
          {
            target: 'src/entities',
            from: 'src/app',
          },
          {
            target: 'src/entities',
            from: 'src/processes',
          },
          {
            target: 'src/entities',
            from: 'src/pages',
          },
          {
            target: 'src/entities',
            from: 'src/widgets',
          },
          {
            target: 'src/entities',
            from: 'src/features',
          },
          // Cross import
          {
            target: 'src/entities/*/**/*',
            from: 'src/entities/*/index.ts',
          },

          // shared
          {
            target: 'src/shared',
            from: 'src/app',
          },
          {
            target: 'src/shared',
            from: 'src/processes',
          },
          {
            target: 'src/shared',
            from: 'src/pages',
          },
          {
            target: 'src/shared',
            from: 'src/widgets',
          },
          {
            target: 'src/shared',
            from: 'src/features',
          },
          {
            target: 'src/shared',
            from: 'src/entities',
          },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: true,
    },
    react: {
      version: 'detect',
    },
  },
};
