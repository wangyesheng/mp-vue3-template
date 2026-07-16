# HAOWEN LAND 微信小程序 — 项目状态文档

> 最后更新：2026-07-12  分支：haowen_land  目标平台：mp-weixin

## 技术栈速览

| 分类 | 选型 | 备注 |
|------|------|------|
| 框架 | uni-app 3 + Vue 3.4 | Composition API / `<script setup>` |
| 构建 | Vite 4 + @dcloudio/vite-plugin-uni | |
| 目标 | 微信小程序 (mp-weixin) | `appid: wx58e3ba95ff5820d1` |
| 状态 | Pinia ~2.0.36 | Composition 风格 store |
| UI 库 | NutUI-UniApp ^1.11.2 | 只用了 nut- 前缀组件 |
| 样式 | SCSS + TailwindCSS 3.4 | weapp-tailwindcss 适配 |
| HTTP | 自研 Request 类 | uView 风格，见 `src/utils/http.js` |
| 包管理 | pnpm | 有 pnpm-lock.yaml |
| 国际化 | vue-i18n ^9.1.9 | 已安装，未大量使用 |

## 目录结构

```
src/
├── api/index.js              # 【集中】所有后端接口，命名 xxxRes()
├── components/                # PascalCase 目录 + index.vue（easycom 自动注册）
│   ├── AppContainer/          #   根容器：nut-config-provider + TabBar + BindMobile
│   ├── PageList/              #   通用分页组件（下拉刷新 + 触底 + 空态）
│   ├── WalletList/            #   卡包卡片列表
│   ├── Empty/                 #   空态组件
│   ├── Loading/               #   加载动画（多种形态）
│   ├── BindMobile/            #   手机号绑定弹窗
│   ├── BabyInfo/              #   宝贝信息卡片
│   ├── SelectBabyPopup/       #   选择宝贝弹窗
│   ├── Recharge/              #   充值组件
│   ├── CouponInfo/            #   优惠券信息
│   ├── OrderInfo/             #   订单信息
│   └── PostPainter/           #   海报绘制（lime-painter）
├── hooks/                     # 组合式函数
│   ├── useLogin.js            #   微信登录 + 手机号解密 + 存 token
│   └── useChooseLocation.js   #   地图选点
├── pages/                     # 页面（按模块分目录）
│   ├── home/                  #   首页、活动列表/详情
│   ├── me/                    #   我的、卡包、个人信息、设置、消费记录、投诉
│   ├── ticket/                #   门票列表、详情、分享
│   ├── order/                 #   订单列表
│   ├── baby/                  #   宝贝管理、搜索、添加
│   ├── scan/                  #   扫码核销
│   ├── coupon/                #   领券中心、我的券包
│   ├── mall/                  #   积分商城
│   ├── complaint/             #   投诉
│   └── help/                  #   联系客服
├── stores/
│   ├── app.js                 #   全局 store：token、user、appName
│   └── counter.js             #   模板示例 store（可删）
├── utils/                     # 纯工具函数
│   ├── http.js                #   Request 类（拦截器 + baseUrl + loading）
│   ├── request.js             #   封装 http：注册拦截器、统一错误弹窗、401 登出
│   ├── uni.js                 #   toast/navTo/copy/callPhone 等快捷方法
│   ├── calcMenuButton.js      #   胶囊按钮位置计算
│   ├── deepMerge.js           #   深度合并
│   ├── deepClone.js           #   深拷贝
│   └── is.js                  #   类型判断
├── static/images/             # 本地图片资源
├── pages.json                 # 路由 / TabBar / 全局样式
├── manifest.json              # 小程序 appid / 权限配置
├── App.vue                    # 入口：引入 tailwind + nutui + index.scss
└── main.js                    # createSSRApp + Pinia
```

## Easycom 自动组件解析规则

| Pattern | 解析路径 | 示例 |
|---------|---------|------|
| `^nut-(.*)?-(.*)` | nutui-uniapp/components/... | `<nut-tab-pane>` |
| `^(?!nut-\|Wallet)([A-Z][a-zA-Z]*)$` | @/components/$1/index.vue | `<AppContainer>` / `<Empty>` / `<PageList>` |

> 自定义组件放在 `src/components/<PascalCase>/index.vue` 即可零 import 使用。

## API 调用链

```
页面/hook
  → api/index.js 中的函数（如 getWalletInfoRes、createOrderRes）
    → utils/request.js 的 request()
      → utils/http.js 的 http.request()
        → uni.request()
      → 拦截器自动解包 { code: 1, data } → 返回 data
      → 拦截器处理异常：code!=1 返回 false → request.js 弹窗报错
      → 401 → 自动 logout + 跳到首页
```

### API 函数命名规范
- 查询：`getXxxRes` / 创建：`createXxxRes` / 提交：`callXxxRes` / 验证：`verifyXxxRes`
- 全部导出为具名函数，不接受第二个参数（除了 ID 类型的独立入参）

## Store 模式

```js
// src/stores/app.js — 典型 Pattern
export const useAppStore = defineStore('app', () => {
  const appToken = ref(uni.getStorageSync('APP_TOKEN'))
  function setAppToken(val) { appToken.value = val; uni.setStorageSync('APP_TOKEN', val) }
  // ...
  return { appToken, setAppToken, ... }
})
```
- 手动 `uni.setStorageSync` 做持久化（微信环境 localStorage 不可靠）
- 消费方用 `storeToRefs(useAppStore())` 解构保持响应式

## 页面标准结构

```vue
<template>
  <AppContainer>
    <div class="__pageName">
      <!-- 内容 -->
    </div>
    <BindMobile v-model:visible="bindMobileVisible" :get-phone-number="getPhoneNumber" />
  </AppContainer>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { useLogin } from '@/hooks/useLogin'
import { navTo, toast } from '@/utils/uni'
// API 函数按需从 @/api 导入

// 需要登录的场景走 useLogin 获取 bindMobileVisible/login/getPhoneNumber
// 页面数据用 ref/reactive，API 调用直接在 onLoad/onShow 中 await
</script>

<style lang="scss" scoped>
// SCSS scoped，配合 TailwindCSS 原子类混用
// 根类名 __pageName 是约定
</style>
```

## 组件通讯约定

- Props 向下、Emits 向上
- `v-model:visible` 控制弹窗显隐
- `defineExpose` 暴露方法给父组件调用（如 PageList 暴露 `refresh()`）
- Slot 传递列表项渲染（如 PageList 的 `#item="{ data }"`）

## 样式约定

| 项 | 值/做法 |
|----|---------|
| 主色 | `#8153FE` (CSS 变量: `--hw-primary-color`) |
| 背景色 | `#f5f5f5` (CSS 变量: `--hw-primary-bg-color`) |
| 文字色 | 标题 `#000/#333`，描述 `#666`，次要 `#999` |
| 字号 | 标题 30-40rpx，正文 28rpx，辅助 24-26rpx |
| 圆角 | 卡片 `15-24rpx`，按钮 `8rpx` |
| 间距 | flex + column-gap/row-gap，页面 padding 30-60rpx |
| 单位 | rpx（750 设计稿），SCSS 嵌套用 `::v-deep()` 穿透 |

## TabBar

自定义 TabBar（`pages.json` 中 `tabBar.custom: true`），由 `AppContainer` 渲染。三个 tab：

| Tab | 路径 | 说明 |
|-----|------|------|
| 首页 | pages/home/index | custom nav |
| 扫码核销 | pages/scan/index | 中间凸起大按钮 |
| 我的 | pages/me/index | |

## 关键交互流

1. **登录**：`useLogin` → `uni.getUserProfile` + `uni.login` → 获取 code → 弹出 `BindMobile` → 解密手机号 → `checkLoginRes` 拿 token → 存入 store
2. **鉴权**：`navTo(url, needToken=true)` 校验 `APP_USER.id` 是否存在
3. **分页列表**：`PageList` 组件接管下拉刷新 + 触底加载 + 空态，传入 `api` 函数即可
4. **分享**：页面级 `onShareAppMessage` 返回 `{title, path, imageUrl}`

## 构建与运行

```bash
pnpm dev          # 开发（微信小程序），等同于 uni -p mp-weixin
pnpm run open:dev # 用微信开发者工具打开
pnpm build:mp-weixin  # 生产构建
```

## auto-import 已自动导入

来自 `vite.config.js` 的 AutoImport 插件：
- `vue`：ref, reactive, computed, watch, onMounted 等
- `uni-app`：onLoad, onShow, onHide, onShareAppMessage 等
- `pinia`：defineStore, storeToRefs
- `nutui-uniapp/composables`：useToast
