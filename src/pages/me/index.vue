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
          <div class="flex flex-col items-center">
            <span class="mb-[10rpx] text-[36rpx]">
              {{ appUser.totalMoney }}
            </span>
            <span class="text-[24rpx] text-[#C2C2C2]">余额（元）</span>
          </div>
          <div class="flex flex-col items-center">
            <span
              class="mb-[20rpx] text-[24rpx] self-end"
              @click="navTo(`/pages/me/money-log`)">
              消费记录
            </span>
            <nut-button type="warning" @click="onShowRechargePopup">
              充值
            </nut-button>
          </div>
        </div>
      </div>

      <div v-else class="noLoginUser" open-type="getUserInfo" @click="login">
        <div class="avatar-wrap">
          <img src="../../static/images/me/noLoginUser.png" alt="" />
        </div>
        <span>请登录</span>
      </div>

      <div
        class="mt-[40rpx] rounded-[30rpx] box-border px-[40rpx] pt-[30rpx] text-[26rpx] bg-[#fff]">
        <div class="mb-[40rpx] text-[32rpx]">我的服务</div>
        <div class="flex justify-between flex-wrap">
          <div
            class="w-[30%] mb-[50rpx] flex flex-col justify-between items-center"
            @click="navTo('/pages/me/personal')">
            <img
              class="w-[90rpx] h-[90rpx] mb-[16rpx]"
              src="../../static/images/me/personal.png"
              alt="" />

            <span>个人中心</span>
          </div>
          <div
            class="w-[30%] mb-[50rpx] flex flex-col justify-between items-center"
            @click="navTo(`/pages/me/richtext?type=flowProcess`)">
            <img
              class="w-[90rpx] h-[90rpx] mb-[16rpx]"
              src="../../static/images/me/place-order.png"
              alt="" />

            <span>下单流程</span>
          </div>
          <div
            class="w-[30%] mb-[50rpx] flex flex-col justify-between items-center"
            @click="navTo('/pages/coupon/my')">
            <div
              class="w-[90rpx] h-[90rpx] flex justify-center items-center mb-[16rpx]">
              <image
                class="w-[63rpx] h-[56rpx]"
                mode="aspectFit"
                src="../../static/images/me/coupons.png"
                alt="" />
            </div>

            <span>优惠券</span>
          </div>
          <div
            class="w-[30%] mb-[50rpx] flex flex-col justify-between items-center"
            @click="navTo('/pages/me/complaint?type=1')">
            <img
              class="w-[90rpx] h-[90rpx] mb-[16rpx]"
              src="../../static/images/me/complaint.png"
              alt="" />

            <span>订单投诉</span>
          </div>

          <div
            class="w-[30%] mb-[50rpx] flex flex-col justify-between items-center"
            @click="navTo('/pages/me/complaint?type=2')">
            <img
              class="w-[90rpx] h-[90rpx] mb-[16rpx]"
              src="../../static/images/me/feedback.png"
              alt="" />

            <span>意见反馈</span>
          </div>
          <div
            class="w-[30%] mb-[50rpx] flex flex-col justify-between items-center"
            @click="navTo(`/pages/me/richtext?type=aboutUs`)">
            <img
              class="w-[90rpx] h-[90rpx] mb-[16rpx]"
              src="../../static/images/me/aboutUs.png"
              alt="" />

            <span>关于我们</span>
          </div>
        </div>
      </div>
      <div
        class="mt-[40rpx] rounded-[30rpx] box-border px-[40rpx] py-[30rpx] text-[28rpx] bg-[#fff] flex justify-between items-center"
        @click="callPhone(merchantTel)">
        <div class="flex items-center w-full">
          <div class="w-[24%] flex justify-end">
            <img
              class="w-[90rpx] h-[90rpx] mr-[20rpx]"
              src="../../static/images/me/phone.png"
              alt="" />
          </div>
          <span>联系我们</span>
        </div>
        <img
          class="w-[20rpx] h-[20rpx]"
          src="../../static/images/me/right-arrow.png"
          alt="" />
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
import { getRechargeLevelsRes, updateUserRes } from '../../api'
import { ref } from 'vue'
import { useLogin } from '../../hooks/useLogin'
import { callPhone, navTo, toast } from '../../utils/uni'

const baseUrl = import.meta.env.VITE_BASE_API
const uploadUrl = `${baseUrl}/api/common/upload`

const appStore = useAppStore()
const { appUser, merchantTel } = storeToRefs(appStore)

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
      title: '充值档次获取中...',
      mask: true
    })
    const data = await getRechargeLevelsRes()
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
      token: appUser.value.token,
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
