<template>
  <AppContainer>
    <nut-cell-group>
      <nut-cell title="头像">
        <template #desc>
          <image
            class="w-[100rpx] h-[100rpx] rounded-[20rpx]"
            :src="appUser.avatar"
            mode="aspectFit" />
        </template>
      </nut-cell>
      <nut-cell title="用户名">
        <template #desc>
          <span class="font-[550] text-[#333]">
            {{ appUser.username }}
          </span>
        </template>
      </nut-cell>
      <nut-cell title="手机号">
        <template #desc>
          <span class="font-[550] text-[#333]">
            {{ appUser.mobile }}
          </span>
        </template>
      </nut-cell>
    </nut-cell-group>
    <div class="btn-wrap">
      <nut-button block type="default" @click="logout">退出登录</nut-button>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { appUser } = storeToRefs(appStore)

function logout() {
  uni.setStorageSync('APP_USER', {})
  appStore.setAppUser({})
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  width: 90%;
  margin: 40rpx auto 0;
}

::v-deep() {
  .nut-cell:first-child {
    .nut-cell__title {
      justify-content: center;
    }
  }

  .nut-cell-group__wrap {
    margin: 0 !important;
  }
}
</style>
