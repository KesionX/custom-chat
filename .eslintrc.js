module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    "global-require": 0,
    "linebreak-style": [0 ,"error", "windows"],
    'semi': [1, 'never'],
    'arrow-parens': 2,
    'consistent-return': 2,
    'comma-dangle': 0,
    'no-debugger': 1,
    'object-curly-newline': 0,
    'generator-star-spacing': 0,
    'class-methods-use-this': 1,
    'import/prefer-default-export': 0,
    'import/no-unresolved': ['error', { 'ignore': ['electron'] }],
    'import/no-extraneous-dependencies': 'off',
    'promise/param-names': 2,
    'promise/catch-or-return': 2,
    'promise/no-native': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'prop-types': 0,
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'react/no-unused-state': 0,
    'no-underscore-dangle': 0,
    'react/no-array-index-key': 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
  plugins: [
    'import',
    'promise',
  ],
  settings: {
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
        ]
      },
      "alias": {
        "map": [
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@utils', './src/utils'],
          ['@consts', './src/consts'],
          ['@stores', './src/stores'],
          ['@hooks', './src/hooks'],
          ['@libs', './src/lib'],
        ]
      }
    }
  }
}
