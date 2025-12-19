<template>
  <AppContainer>
    <nut-cell-group>
      <nut-cell
        is-link
        title="关于我们"
        @click="navTo('/pages/me/richtext?type=aboutUs')"></nut-cell>
      <nut-cell
        is-link
        title="用户协议"
        @click="navTo('/pages/me/richtext?type=agreement')"></nut-cell>
    </nut-cell-group>

    <div class="action">
      <nut-button block type="default" size="large" @click="appStore.logout">
        退出登录
      </nut-button>
    </div>
  </AppContainer>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { navTo } from '@/utils/uni'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
::v-deep() {
  .nut-cell-group__wrap {
    margin: 0;
  }
}

.action {
  width: 100%;
  padding: 50rpx;
  box-sizing: border-box;
}
</style>
