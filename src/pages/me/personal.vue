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
      <nut-cell title="昵称">
        <template #desc>
          <span class="font-[550] text-[#333]">
            {{ appUser.nickname }}
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
      <nut-cell title="认证状态">
        <template #desc>
          <div class="flex justify-end items-center">
            <div
              :class="[
                appUser.real_status == 0 ? 'text-[#999]' : 'text-[#6bba5b]',
                'font-[550]'
              ]">
              {{ appUser.real_status == 0 ? '未认证' : '已认证' }}
            </div>
            <div class="flex items-center" v-if="appUser.real_status == 0">
              <nut-divider direction="vertical" />
              <div
                class="flex items-center"
                @click="navTo('/pages/template/complete-userinfo')">
                <img
                  class="w-[32rpx] h-[32rpx] mr-[5rpx]"
                  src="../../static/images/auth.png"
                  alt="" />
                <span class="text-[24rpx] text-[#344ad9] font-[550]">
                  去认证
                </span>
              </div>
            </div>
          </div>
        </template>
      </nut-cell>
      <nut-cell title="真实姓名">
        <template #desc>
          <span class="font-[550] text-[#333]">
            {{ appUser.real_name || '-' }}
          </span>
        </template>
      </nut-cell>
      <nut-cell title="身份证号">
        <template #desc>
          <span class="font-[550] text-[#333]">
            {{ appUser.idcard || '-' }}
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
import { navTo } from '../../utils/uni'

const appStore = useAppStore()
const { appUser } = storeToRefs(appStore)

function logout() {
  uni.setStorageSync('APP_TOKEN', '')
  uni.setStorageSync('APP_USER', {})
  appStore.setAppToken('')
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
