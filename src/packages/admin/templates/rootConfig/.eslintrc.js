module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    React: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    jest: 'readonly',
    $t: 'writeable',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
  extends: ['plugin:react/recommended', '@tencent/eslint-config-tencent'],
  plugins: ['react', 'react-hooks', 'simple-import-sort', 'import'],
  rules: {
    // error
    'simple-import-sort/imports': 1,
    'simple-import-sort/exports': 1,
    'import/first': 1,
    'import/newline-after-import': 1,
    'import/no-duplicates': 1,
    'arrow-parens': [2, 'always'],
    'react/jsx-pascal-case': 2,
    'react-hooks/rules-of-hooks': 2,
    // warn
    'react/display-name': 0,
    'react/prop-types': 0,
    'react-hooks/exhaustive-deps': 1,
    // off
    'arrow-body-style': 0,
    'react/react-in-jsx-scope': 0,
    // custom
    indent: [2, 2, { SwitchCase: 1 }],
    'arrow-parens': [2, 'always'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console':
      process.env.NODE_ENV === 'production' ? [2, { allow: ['warn', 'error'] }] : [1, { allow: ['warn', 'error'] }],
    'no-empty-pattern': 0,
    'import/prefer-default-export': 0,
    'consistent-return': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/exhaustive-deps': 0,
    quotes: [2, 'single'],
    semi: [2, 'always'],
    'eol-last': [2, 'always'],
  },
  overrides: [
    {
      files: '*.{js,jsx}',
      parser: 'babel-eslint',
    },
    {
      files: '*.{ts,tsx}',
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        '@tencent/eslint-config-tencent/ts',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2],
        '@typescript-eslint/type-annotation-spacing': [2],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['PascalCase'],
          },
        ],
      },
    },
  ],
};
