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
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json'
  ],
  ignorePatterns: [
    'src/components/PostPainter/**',
    'src/utils/qqmap-wx-jssdk.min.js',
    'dist/**',
    'node_modules/**',
    '**/*.d.ts',
    'unpackage/**',
    '*.config.ts',
    '*.config.js'
  ],
  parser: 'vue-eslint-parser',
  // 嵌套解析：纯 JS 用 espree，「非 async 里写 await」会报 Parsing error（TS 解析器常不报错）；
  // lang="ts" 的块仍走 @typescript-eslint/parser。
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: {
      js: 'espree',
      jsx: 'espree',
      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser'
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    eqeqeq: 'off', // 允许使用 == 和 != 比较运算符
    camelcase: 'off', // 允许使用下划线命名（如 order_number）
    'one-var': 'off' // 允许 const a = 1, b = 2 形式
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
        'vue/component-tags-order': [
          'error',
          {
            order: ['template', 'script', 'style'] // 强制顺序：template → script → style
          }
        ], // 属性排序：静态属性在前，动态属性在后
        'vue/attributes-order': [
          'error',
          {
            order: [
              'DEFINITION', // is, v-is
              'LIST_RENDERING', // v-for
              'CONDITIONALS', // v-if, v-else-if, v-else, v-show, v-cloak
              'RENDER_MODIFIERS', // v-once, v-pre
              'GLOBAL', // id
              'UNIQUE', // ref, key
              'SLOT', // v-slot, slot, #default
              'TWO_WAY_BINDING', // v-model
              'OTHER_DIRECTIVES', // 其他自定义指令
              'ATTR_SHORTHAND_BOOL', // 简写布尔属性（disabled, readonly, block 等）
              'ATTR_STATIC', // 静态属性（class, style, type, placeholder 等）
              'ATTR_DYNAMIC', // 动态绑定属性（:foo="bar"、v-bind:foo）
              'EVENTS', // @click, v-on
              'CONTENT' // v-text, v-html
            ],
            alphabetical: false // 不在每类内按字母排序
          }
        ],
        'vue/multi-word-component-names': 0, // 允许单词组件名（如 Empty、Item）
        // 模板里用到的变量/函数须在 <script setup> 中定义（含 import），否则报错
        'vue/no-undef-properties': 'error',
        'vue/no-v-model-argument': 'off', // 允许 v-model:xxx 写法
        '@typescript-eslint/no-explicit-any': 'off', // 允许 any 类型
        // 关闭 vue3-recommended 的格式规则，让 Prettier 处理
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/first-attribute-linebreak': 'off',
        'vue/no-v-html': 'off'
      }
    }
  ]
}
