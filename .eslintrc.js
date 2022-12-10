module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    jest: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint', 'prettier', 'unicorn', 'import', 'jest'],
  ignorePatterns: [
  ],
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        accessibility: 'explicit',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'class',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: ['memberLike', 'classProperty', 'objectLiteralProperty', 'typeProperty', 'parameterProperty'],
        format: ['camelCase', 'snake_case', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['classMethod', 'objectLiteralMethod'],
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: ['typeLike', 'enum'],
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/no-unsafe-call': 'off', // TODO: enable this after clean up the code
    '@typescript-eslint/no-unsafe-member-access': 'off', // TODO: enable this after clean up the code
    '@typescript-eslint/no-unsafe-return': ['error'],
    '@typescript-eslint/no-unsafe-assignment': 'off', // TODO: enable this after clean up the code
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/restrict-template-expressions': 'off', // TODO: enable this after clean up the code
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/indent': 'off', // We use ESLint indent, instead
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'off', // TODO: enable this after clean up the code
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-parameter-properties': 'off', // This is against DI, we should not enable it
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars-experimental': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    'arrow-body-style': 'error',
    'arrow-parens': ['off', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
    complexity: ['error', { max: 20 }],
    'constructor-super': 'error',
    curly: 'error',
    'dot-notation': 'error',
    'eol-last': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': ['error', 'any'],
    'id-match': 'error',
    'import/no-deprecated': 'error',
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        amd: true,
      },
    ],
    'max-classes-per-file': ['error', 1],
    'max-len': [
      'error',
      {
        code: 150,
      },
    ],
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-empty': 'off',
    'no-eval': 'error',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      },
    ],
    'no-new-wrappers': 'error',
    'no-shadow': 'off',
    'no-throw-literal': 'error',
    'no-trailing-spaces': [
      'error',
      {
        ignoreComments: true,
        skipBlankLines: true,
      },
    ],
    'no-undef-init': 'error',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': ['off', 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    'prefer-arrow/prefer-arrow-functions': 'off',
    'prefer-const': 'error',
    'quote-props': ['error', 'as-needed'],
    radix: 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        asyncArrow: 'always',
        named: 'never',
      },
    ],
    'spaced-comment': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'use-isnan': 'error',
    'valid-typeof': 'off',
    '@typescript-eslint/tslint/config': [
      'error',
      {
        rules: {
          'import-spacing': true,
          'jsdoc-format': true,
          'no-reference-import': true,
          'one-line': [true, 'check-catch', 'check-else', 'check-finally', 'check-open-brace', 'check-whitespace'],
          whitespace: [true, 'check-branch', 'check-decl', 'check-operator', 'check-separator', 'check-type', 'check-typecast'],
        },
      },
    ],
    'jest/no-deprecated-functions': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
