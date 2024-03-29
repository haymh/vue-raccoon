module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    'browser': true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    'no-console': 0,
    // disable debugger during development, should turn on during release.
    'no-debugger': 0,
    'no-param-reassign': [2, {'props': false}],
    'no-lonely-if': 0,
    'object-shorthand': 1,
    'no-underscore-dangle': 0,
    'no-multi-assign': 0,
    'no-useless-escape': 0,
  },
  'globals': {
    'google': true,
  }
}
