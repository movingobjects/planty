module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['api', './src/api'],
          ['atoms', './src/atoms'],
          ['components', './src/components'],
          ['graphql', './src/graphql'],
          ['hooks', './src/hooks'],
          ['styles', './src/styles'],
          ['utils', './src/utils']
        ],
        extensions: ['.js', '.css', '.scss']
      }
    }
  },
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    'newline-destructuring'
  ],
  rules: {
    'array-bracket-spacing': ['warn', 'never'],
    'arrow-parens': ['warn', 'always'],
    'comma-dangle': ['warn', 'never'],
    'consistent-return': 'warn',
    'default-param-last': 'off',
    'eol-last': ['warn', 'never'],
    'function-paren-newline': ['warn', 'consistent'],
    'global-require': 'off',
    'import/order': ['warn', {
      'newlines-between': 'always',
      groups: [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling', 'index']
      ],
      pathGroups: [
        {
          pattern: '{api,api/**,atoms,atoms/**,hooks,hooks/**,graphql,graphql/**,utils,utils/**}',
          group: 'internal',
          position: 'before'
        },
        {
          pattern: './index.module.scss',
          group: 'index',
          position: 'after'
        }
      ],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      }
    }],
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'max-len': 'off',
    'newline-destructuring/newline': ['warn', {
      items: 1,
      itemsWithRest: 1,
      maxLength: 30
    }],
    'no-continue': 'off',
    'no-else-return': 'off',
    'no-labels': 'off',
    'no-mixed-operators': 'warn',
    'no-nested-ternary': 'off',
    'no-new': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-trailing-spaces': 'warn',
    'no-unreachable': 'warn',
    'no-unsafe-optional-chaining': 'off',
    'no-unused-vars': ['warn', {
      vars: 'all',
      args: 'none',
      ignoreRestSiblings: true
    }],
    'no-use-before-define': 'off',
    'object-property-newline': 'warn',
    'object-curly-newline': ['warn', {
      multiline: true,
      minProperties: 3,
      consistent: true
    }],
    'operator-linebreak': ['warn', 'after', {
      overrides: {
        '?': 'before',
        ':': 'before'
      }
    }],
    quotes: ['warn', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    'react-hooks/exhaustive-deps': 'warn',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': ['warn', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }],
    'react/jsx-boolean-value': ['warn', 'always'],
    'react/jsx-closing-bracket-location': ['warn', 'after-props'],
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-filename-extension': ['warn', {
      extensions: ['.js', '.jsx']
    }],
    'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': ['warn', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line'
    }],
    'react/no-array-index-key': 'off',
    'react/no-danger': 'off',
    'react/prop-types': 'off',
    'sort-imports': ['warn', {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      allowSeparatedGroups: true
    }]
  }
};