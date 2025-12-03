# 自动导入配置说明

本项目使用了三种自动导入机制，它们各司其职，共同提升开发体验。

---

## 概览

| 插件         | 作用对象     | 使用位置     | 配置文件         | 生成文件            |
| ------------ | ------------ | ------------ | ---------------- | ------------------- |
| `Components` | Vue 组件     | `<template>` | `vite.config.js` | `components.d.ts`   |
| `AutoImport` | JS 函数/变量 | `<script>`   | `vite.config.js` | `auto-imports.d.ts` |
| `easycom`    | Vue 组件     | `<template>` | `pages.json`     | 无                  |

---

## 1. Components（Vite 插件）

### 作用

在 `<template>` 中使用组件时，无需手动 import，同时生成类型声明文件提供编辑器自动补全。

### 配置位置

`vite.config.js`

```javascript
import Components from '@uni-helper/vite-plugin-uni-components'
import { NutResolver } from 'nutui-uniapp'

Components({
  resolvers: [NutResolver()], // 第三方组件库解析器
  dirs: ['src/components'], // 扫描目录
  deep: true, // 递归扫描子目录
  dts: './components.d.ts', // 生成类型声明文件
  globs: [
    // 精确匹配文件（可选）
    'src/components/**/*.vue',
    '!src/components/WalletList/Item.vue' // 排除特定文件
  ]
})
```

### 参数说明

| 参数         | 类型              | 说明                                   |
| ------------ | ----------------- | -------------------------------------- |
| `resolvers`  | `Resolver[]`      | 第三方组件库解析器，如 `NutResolver()` |
| `dirs`       | `string[]`        | 要扫描的组件目录                       |
| `deep`       | `boolean`         | 是否递归扫描子目录                     |
| `dts`        | `string \| false` | 类型声明文件路径，`false` 则不生成     |
| `globs`      | `string[]`        | glob 模式匹配文件，支持 `!` 排除       |
| `extensions` | `string[]`        | 文件扩展名，默认 `['vue']`             |
| `exclude`    | `RegExp[]`        | 排除的文件（正则）                     |

### 使用效果

```vue
<template>
  <!-- 无需 import，直接使用 -->
  <Empty description="暂无数据" />
  <nut-button type="primary">按钮</nut-button>
</template>

<script setup>
// ❌ 不需要写这些了
// import Empty from '@/components/Empty/index.vue'
// import { NutButton } from 'nutui-uniapp'
</script>
```

### 生成的类型文件

`components.d.ts`

```typescript
declare module 'vue' {
  export interface GlobalComponents {
    Empty: (typeof import('./src/components/Empty/index.vue'))['default']
    NutButton: (typeof import('nutui-uniapp/components/button/button.vue'))['default']
  }
}
```

---

## 2. AutoImport（Vite 插件）

### 作用

在 `<script>` 中使用 Vue、uni-app、Pinia 等 API 时，无需手动 import。

### 配置位置

`vite.config.js`

```javascript
import AutoImport from 'unplugin-auto-import/vite'

AutoImport({
  imports: [
    'vue', // ref, computed, watch, onMounted...
    'uni-app', // onLoad, onShow, onHide...
    'pinia', // storeToRefs, defineStore...
    {
      'nutui-uniapp/composables': ['useToast'] // 自定义导入
    }
  ],
  dts: './src/auto-imports.d.ts', // 类型声明文件
  eslintrc: {
    enabled: true // 生成 ESLint 配置，避免报 'ref' is not defined
  }
})
```

### 参数说明

| 参数               | 类型                   | 说明                         |
| ------------------ | ---------------------- | ---------------------------- |
| `imports`          | `string[] \| object[]` | 要自动导入的模块             |
| `dts`              | `string \| false`      | 类型声明文件路径             |
| `eslintrc.enabled` | `boolean`              | 是否生成 ESLint 全局变量配置 |

### 支持的预设模块

| 模块名       | 自动导入的 API                                                  |
| ------------ | --------------------------------------------------------------- |
| `vue`        | `ref`, `computed`, `watch`, `onMounted`, `reactive`...          |
| `uni-app`    | `onLoad`, `onShow`, `onHide`, `onReady`, `onPullDownRefresh`... |
| `pinia`      | `storeToRefs`, `defineStore`, `createPinia`...                  |
| `vue-router` | `useRouter`, `useRoute`...                                      |

### 使用效果

```vue
<script setup>
// ❌ 不需要写这些了
// import { ref, computed, onMounted } from 'vue'
// import { onLoad } from '@dcloudio/uni-app'

// ✅ 直接使用
const count = ref(0)
const double = computed(() => count.value * 2)

onMounted(() => {
  console.log('mounted')
})

onLoad(() => {
  console.log('page loaded')
})
</script>
```

### 生成的类型文件

`src/auto-imports.d.ts`

```typescript
declare global {
  const ref: (typeof import('vue'))['ref']
  const computed: (typeof import('vue'))['computed']
  const onMounted: (typeof import('vue'))['onMounted']
  const onLoad: (typeof import('@dcloudio/uni-app'))['onLoad']
}
```

---

## 3. easycom（uni-app 内置）

### 作用

uni-app 编译器在编译时自动处理组件引用，让小程序运行时能正确找到组件。

### 配置位置

`src/pages.json`

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^nut-(.*)?-(.*)": "nutui-uniapp/components/$1$2/$1$2.vue",
      "^nut-(.*)": "nutui-uniapp/components/$1/$1.vue",
      "^Wallet(Item|Verification)$": "@/components/WalletList/$1.vue",
      "^(?!nut-|Wallet)([A-Z][a-zA-Z]*)$": "@/components/$1/index.vue"
    }
  }
}
```

### 参数说明

| 参数       | 类型      | 说明                              |
| ---------- | --------- | --------------------------------- |
| `autoscan` | `boolean` | 是否自动扫描 `components` 目录    |
| `custom`   | `object`  | 自定义组件匹配规则（正则 → 路径） |

### 正则规则示例

| 规则                 | 匹配组件名     | 对应路径                                    |
| -------------------- | -------------- | ------------------------------------------- |
| `^nut-(.*)`          | `<nut-button>` | `nutui-uniapp/components/button/button.vue` |
| `^([A-Z][a-zA-Z]*)$` | `<Empty>`      | `@/components/Empty/index.vue`              |
| `^Wallet(Item)$`     | `<WalletItem>` | `@/components/WalletList/Item.vue`          |

### 特点

- ✅ 让小程序**运行时**能正确找到组件
- ❌ **不提供**编辑器自动补全
- ❌ **不生成**类型声明文件

### autoscan 与 custom 的关系

```json
{
  "easycom": {
    "autoscan": true,
    "custom": { ... }
  }
}
```

#### `autoscan: true` 的作用

当 `autoscan` 为 `true` 时，uni-app 会**自动扫描** `src/components` 目录，按照以下规则注册组件：

```
组件目录结构：src/components/组件名/组件名.vue -> src/components/TODO/TODO.vue
或者：src/components/组件名/index.vue -> src/components/TODO/index.vue
```

例如：

```
src/components/WalletList/index.vue
       ↑ 目录名 WalletList
                    ↑ 文件名 index.vue
→ 自动注册为 <WalletList />
```

#### `custom` 规则的作用

`custom` 是对 `autoscan` 的**补充**，用于处理：

1. **第三方库组件**（如 NutUI）- 不在 `src/components` 目录下
2. **非标准目录结构的组件**（如 `WalletList/Item.vue`）- 文件名不是 `index.vue` 或与目录名不同

#### 示例分析

```json
{
  "custom": {
    "^Wallet(Item|Verification)$": "@/components/WalletList/$1.vue",
    "^(?!nut-|Wallet)([A-Z][a-zA-Z]*)$": "@/components/$1/index.vue"
  }
}
```

| 组件名           | 来源                | 原因                                         |
| ---------------- | ------------------- | -------------------------------------------- |
| `<WalletList />` | `autoscan` 自动扫描 | 符合 `组件名/index.vue` 结构                 |
| `<WalletItem />` | `custom` 规则匹配   | 文件是 `WalletList/Item.vue`，不符合标准结构 |
| `<Empty />`      | `autoscan` 自动扫描 | 符合 `组件名/index.vue` 结构                 |
| `<nut-button />` | `custom` 规则匹配   | 第三方库，不在 components 目录               |

#### 注意事项

即使 `custom` 中的正则排除了某些组件名（如 `^(?!Wallet)...` 排除了以 Wallet 开头的），只要组件符合标准目录结构，`autoscan` 仍然会自动注册它。

**所以 `<WalletList />` 虽然被 custom 规则排除，但因为 `autoscan: true`，它仍然能正常工作！**

---

## 三者的关系

```
┌─────────────────────────────────────────────────────────┐
│                      开发体验                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Components 插件                                  │   │
│  │  → 组件自动补全 ✅                                │   │
│  │  → 生成 components.d.ts                          │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  AutoImport 插件                                  │   │
│  │  → API 自动补全 ✅                                │   │
│  │  → 生成 auto-imports.d.ts                        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓ 编译
┌─────────────────────────────────────────────────────────┐
│                      实际运行                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │  easycom                                          │   │
│  │  → uni-app 编译器处理                             │   │
│  │  → 小程序运行时能找到组件 ✅                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 为什么都要配置？

| 场景         | Components | AutoImport | easycom   |
| ------------ | ---------- | ---------- | --------- |
| 组件自动补全 | ✅ 需要    | -          | ❌ 不提供 |
| API 自动补全 | -          | ✅ 需要    | -         |
| 小程序运行   | ❌ 不够    | -          | ✅ 需要   |

**三者互补，缺一不可！**

---

## Glob 模式语法

在 `Components` 的 `globs` 配置中使用：

| 符号    | 含义                     | 示例                     |
| ------- | ------------------------ | ------------------------ |
| `*`     | 匹配单层目录中的任意字符 | `*.vue` → `App.vue`      |
| `**`    | 匹配任意层级的目录       | `**/*.vue` → `a/b/c.vue` |
| `?`     | 匹配单个字符             | `?.vue` → `a.vue`        |
| `!`     | 排除匹配的文件           | `!*.test.vue`            |
| `{a,b}` | 匹配 a 或 b              | `*.{vue,js}`             |

---

## 常见问题

### Q: 为什么组件没有自动补全？

1. 检查 `components.d.ts` 是否生成
2. 重启编辑器（Reload Window）
3. 确保安装了 Vue - Official 扩展

### Q: 为什么 ref、onLoad 报 'xxx' is not defined？

1. 检查 `auto-imports.d.ts` 是否生成
2. 检查 `.eslintrc-auto-import.json` 是否在 ESLint extends 中引用
3. 重启开发服务器

### Q: 为什么小程序运行时找不到组件？

1. 检查 `pages.json` 中的 easycom 配置
2. 确保正则规则能匹配到组件名
3. 确保路径正确
