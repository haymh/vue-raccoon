module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  'env': {
    'browser': true,
    'node': true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    'no-console': 0,
    // disable debugger during development, should turn on during release.
    'no-debugger': 0,
    'no-param-reassign': [2, {'props': false}],
    'no-lonely-if': 0,
    'object-shorthand': 1,
  },
  'globals': {
    'google': true,
  }
}
