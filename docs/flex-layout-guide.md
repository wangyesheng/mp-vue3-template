# Flexbox 布局指南

## 概述

Flexbox（弹性盒子布局）是 CSS3 中强大的布局模块，用于创建灵活的响应式布局。它通过容器（flex container）和子项（flex items）的属性来控制布局。

### 为什么使用 Flexbox？

- **一维布局**：适合行或列的布局。
- **灵活性**：子项可以自动调整大小、顺序和对齐。
- **响应式**：轻松适配不同屏幕尺寸。
- **简洁代码**：相比浮动和定位，更少的代码。

## Flex 容器属性

### 1. display: flex
将元素设置为 flex 容器。

```css
.container {
  display: flex; /* 或 inline-flex */
}
```

### 2. flex-direction
定义主轴方向（子项排列方向）。

- `row`（默认）：水平从左到右
- `row-reverse`：水平从右到左
- `column`：垂直从上到下
- `column-reverse`：垂直从下到上

```css
.container {
  flex-direction: row; /* 默认 */
}
```

### 3. justify-content
沿主轴对齐子项。

- `flex-start`（默认）：起点对齐
- `flex-end`：终点对齐
- `center`：居中
- `space-between`：两端对齐，中间等分
- `space-around`：每个子项周围等分空间
- `space-evenly`：每个子项之间和周围等分空间

```css
.container {
  justify-content: center;
}
```

### 4. align-items
沿交叉轴对齐子项（单行）。

- `stretch`（默认）：拉伸填充
- `flex-start`：起点对齐
- `flex-end`：终点对齐
- `center`：居中
- `baseline`：基线对齐

```css
.container {
  align-items: center;
}
```

### 5. align-content
沿交叉轴对齐多行子项（需 flex-wrap）。

- `stretch`（默认）
- `flex-start`
- `flex-end`
- `center`
- `space-between`
- `space-around`
- `space-evenly`

```css
.container {
  align-content: space-between;
}
```

### 6. flex-wrap
控制是否换行。

- `nowrap`（默认）：不换行
- `wrap`：换行
- `wrap-reverse`：反向换行

```css
.container {
  flex-wrap: wrap;
}
```

## Flex 子项属性

### 1. flex-grow
控制子项扩展比例（占用多余空间）。

- 默认值：`0`（不扩展）
- 值：正数，按比例分配多余空间

```css
.item {
  flex-grow: 1; /* 等分多余空间 */
}
```

**示例**：
- 容器宽度 300px，3 个子项 `flex-basis: 50px`（总 150px，多余 150px）
- 都 `flex-grow: 1` → 每个扩展 50px，最终 100px
- 子项1 `flex-grow: 2` → 子项1 扩展 75px，其他 37.5px

### 2. flex-shrink
控制子项收缩比例（空间不足时缩小）。

- 默认值：`1`（允许收缩）
- 值：`0` 不收缩，`>1` 收缩更多

```css
.item {
  flex-shrink: 0; /* 不收缩 */
}
```

**示例**：
- 容器宽度 200px，3 个子项 `width: 100px`（总 300px，溢出 100px）
- 都 `flex-shrink: 1` → 每个收缩 33.33px，最终 66.67px
- 子项1 `flex-shrink: 0` → 不收缩，其他各收缩 50px

### 3. flex-basis
设置子项初始大小。

- 默认值：`auto`（根据内容或 width）
- 值：长度值（如 100px, 50%）

```css
.item {
  flex-basis: 200px;
}
```

### 4. flex（简写）
`flex: grow shrink basis`

- `flex: 1` → `flex: 1 1 0%`（等分空间）
- `flex: 0 0 100px` → 固定 100px
- `flex: auto` → `flex: 1 1 auto`

```css
.item {
  flex: 1; /* 常用 */
}
```

### 5. align-self
覆盖容器的 align-items，对单个子项对齐。

- 值同 align-items

```css
.item {
  align-self: flex-end;
}
```

### 6. order
改变子项显示顺序（不影响 DOM）。

- 默认值：`0`
- 值：整数，越小越前

```css
.item {
  order: -1; /* 移到前面 */
}
```

## 实际用法示例

### 1. 水平居中垂直居中
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

### 2. 等分布局
```css
.container {
  display: flex;
}

.item {
  flex: 1; /* 等分宽度 */
}
```

### 3. 响应式导航栏
```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo { flex-shrink: 0; }
.menu { display: flex; gap: 20px; }
```

### 4. 卡片网格（结合 flex-wrap）
```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* 最小 300px，自动扩展 */
}
```

## 项目中的应用

在 `src/pages/home/index.vue` 中，我们使用了 Flexbox 来布局订单卡片：

```scss
.order-container {
  display: flex;
  column-gap: 20rpx;

  .order-card {
    flex: 0 0 90%; /* 固定 90% 宽度，不收缩 */
  }
}
```

- `flex: 0 0 90%` 确保每个卡片占 90% 宽度，即使容器空间不足也不会缩小。
- 如果想等分，可以改为 `flex: 1`。

## 注意事项

1. **浏览器兼容性**：现代浏览器都支持，IE10+ 需要 `-ms-` 前缀。
2. **性能**：Flexbox 性能良好，但复杂布局建议测试。
3. **嵌套**：可以嵌套使用，但注意层级。
4. **与 Grid 的区别**：Flexbox 适合一维布局，Grid 适合二维。

## 学习资源

- [MDN Flexbox 指南](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [CSS-Tricks Flexbox 完整指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy 游戏](https://flexboxfroggy.com/)

---

本文档基于项目需求整理，如有疑问请参考 MDN 官方文档。