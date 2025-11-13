/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  globals: {
    uni: true, // readonly
    wx: true,
    plus: true,
    tt: true,
    swan: true,
    my: true,
    qq: true,
    qh: true,
    QR: true
  },
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json'
  ],
  ignorePatterns: [
    'src/components/PostPainter/**',
    'src/utils/qqmap-wx-jssdk.min.js'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 0,
    eqeqeq: 'off', // 允许使用 == 和 != 比较运算符
    camelcase: 'off' // 允许使用下划线命名（如 order_number）
  },
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx', '*.vue'],
      rules: {
        'no-undef': 'off',
        'vue/no-v-model-argument': 'off'
      }
    }
  ]
}
