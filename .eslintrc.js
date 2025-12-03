/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  globals: {
    // 各平台全局对象
    uni: true,
    wx: true,
    plus: true,
    tt: true,
    swan: true,
    my: true,
    qq: true,
    qh: true,
    // 小程序/uni-app 全局 API
    getCurrentPages: true,
    getApp: true,
    requirePlugin: true,
    requireMiniProgram: true,
    // 其他
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
    'vue/multi-word-component-names': 0, // 允许单词组件名（如 Empty、Item）
    eqeqeq: 'off', // 允许使用 == 和 != 比较运算符
    camelcase: 'off', // 允许使用下划线命名（如 order_number）
    'one-var': 'off', // 允许 const a = 1, b = 2 形式
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'] // 强制顺序：template → script → style
      }
    ]
  },
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        'no-undef': 'off' // TypeScript 自己会检查
      }
    },
    {
      files: ['*.vue'],
      rules: {
        'vue/no-v-model-argument': 'off', // 允许 v-model:xxx 写法
        '@typescript-eslint/no-explicit-any': 'off' // 允许 any 类型
      }
    }
  ]
}
