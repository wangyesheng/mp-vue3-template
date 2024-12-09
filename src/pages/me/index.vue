<style lang="scss" scoped>
.__me {
  .wallet {
    ::v-deep() {
      .nut-button {
        background: #e3c377 !important;
        width: 144rpx !important;
        height: 48rpx !important;
        color: #333 !important;
        font-size: 24rpx !important;
      }
    }
  }

  .avatar {
    margin: 0;
    padding: 0;
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;

    &::after {
      border: none;
    }

    image {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .noLoginUser {
    width: 50vw;
    margin: 180rpx auto 80rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar-wrap {
      width: 180rpx;
      height: 180rpx;
      background: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20rpx;

      image {
        width: 100rpx;
        height: 100rpx;
      }
    }

    span {
      font-size: 32rpx;
      font-weight: 550;
      color: #666;
    }
  }
}
</style>

<template>
  <AppContainer>
    <div class="relative min-h-screen overflow-auto box-border px-[40rpx] __me">
      <div v-if="appUser.id">
        <div class="box-border px-[10rpx] mt-[180rpx] flex items-center">
          <button
            class="avatar"
            open-type="chooseAvatar"
            @chooseavatar="onChooseAvatar">
            <image :src="appUser.avatar" mode="scaleToFill" />
          </button>
          <div class="flex flex-col justify-between h-[110rpx] ml-[24rpx]">
            <input
              class="text-[#121836] text-[44rpx] font-[400]"
              type="nickname"
              placeholder="请输入用户名"
              maxlength="14"
              :value="appUser.nickname"
              @change="onNicknameChange" />
            <span class="text-[#121836] text-[28rpx] font-[400]">
              {{ appUser.mobile }}
            </span>
          </div>
        </div>
        <div
          class="bg-[#292f45] text-[#fff] mt-[40rpx] box-border px-[60rpx] py-[40rpx] rounded-[20rpx] flex justify-between wallet">
          <div class="flex items-center">
            <span class="text-[46rpx] mr-[10rpx]">
              {{ appUser.score }}
            </span>
            <span class="text-[24rpx] text-[#C2C2C2]">次</span>
          </div>
          <div class="flex flex-col items-center">
            <span
              class="mb-[20rpx] text-[24rpx] self-end"
              @click="navTo(`/pages/me/money-log`)">
              购买记录
            </span>
            <nut-button type="warning" @click="onShowRechargePopup">
              充值
            </nut-button>
          </div>
        </div>
        <div class="bg-[#fff] rounded-[20rpx] px-[20rpx] py-[30rpx] mt-[40rpx]">
          <div
            class="text-[28rpx] text-[#292f45] font-[550] mb-[40rpx] flex justify-between items-center"
            @click="navTo('/pages/contract/list?status=0')">
            <span>我的合同</span>
            <nut-icon name="arrow-right" size="28rpx" />
          </div>
          <div class="flex justify-around">
            <div
              class="flex flex-col items-center"
              v-for="(item, index) in contractStatusList"
              :key="index"
              @click="navTo(`/pages/contract/list?status=${item.value}`)">
              <image
                class="w-[48rpx] h-[48rpx] mb-[15rpx]"
                :src="item.icon"
                mode="widthFix" />
              <span class="text-[24rpx] text-[#707070]">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="noLoginUser" open-type="getUserInfo" @click="login">
        <div class="avatar-wrap">
          <img src="../../static/images/me/noLoginUser.png" alt="" />
        </div>
        <span>请登录</span>
      </div>

      <Recharge
        v-model:visible="rechargePopupVisible"
        :levels="rechargeLevels" />
      <BindMobile
        v-model:visible="bindMobileVisible"
        :getPhoneNumber="getPhoneNumber" />
    </div>
  </AppContainer>
</template>
<script setup>
import AppContainer from '@/components/AppContainer/index'
import Recharge from '@/components/Recharge/index'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { getPackagesRes, updateUserRes } from '../../api'
import { ref } from 'vue'
import { useLogin } from '../../hooks/useLogin'
import { callPhone, navTo, toast } from '../../utils/uni'
import { contractStatusList } from '../../constant'

const baseUrl = import.meta.env.VITE_BASE_API
const uploadUrl = `${baseUrl}/api/common/upload`

const appStore = useAppStore()
const { appUser, appToken } = storeToRefs(appStore)

const { bindMobileVisible, login, getPhoneNumber } = useLogin()

const rechargePopupVisible = ref(false),
  rechargeLevels = ref([])
async function onShowRechargePopup() {
  if (rechargeLevels.value.length > 0) {
    rechargePopupVisible.value = true
    return
  }
  try {
    uni.showLoading({
      title: '礼包档次获取中...',
      mask: true
    })
    const data = await getPackagesRes()
    rechargeLevels.value = data
    rechargePopupVisible.value = true
  } finally {
    uni.hideLoading()
  }
}

async function onChooseAvatar(e) {
  const {
    detail: { avatarUrl }
  } = e

  uni.uploadFile({
    url: uploadUrl,
    filePath: avatarUrl,
    name: 'file',
    header: {
      token: appToken.value,
      'content-type': 'multipart/form-data'
    },
    success: async (result) => {
      const {
        code,
        data: { fullurl },
        msg
      } = JSON.parse(result.data)
      if (code !== 1) {
        toast(msg)
      } else {
        await updateUserRes({ avatar: fullurl })
        const newUserInfo = {
          ...appUser.value,
          avatar: fullurl
        }
        appStore.setAppUser(newUserInfo)
        uni.setStorageSync('APP_USER', newUserInfo)
      }
    },
    fail: (uploadFileErr) => {
      console.log('upload::error', uploadFileErr)
      toast('上传失败！')
    }
  })
}

async function onNicknameChange(e) {
  const value = e.detail.value
  if (value) {
    await updateUserRes({ nickname: value, username: value })
    appStore.setAppUser({
      ...appUser.value,
      nickname: value,
      username: value
    })
    uni.setStorageSync('APP_USER', appUser.value)
  }
}
</script>
