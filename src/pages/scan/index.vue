<template>
  <AppContainer>
    <div class="__scan">
      <div class="qrcode-wrap">
        <div class="userinfo">
          <div v-if="appUser.id" class="inner">
            <image :src="appUser.avatar" mode="aspectFill" />
            <div>
              <span>{{ appUser.nickname }}</span>
              <span>儿童会员</span>
            </div>
          </div>
          <div v-else class="noLogin">
            <div class="left">
              <span class="t1">Hi，Haowen Baby</span>
              <span class="t3">登录后即可查看专属二维码</span>
            </div>
          </div>
        </div>
        <div class="qrcode">
          <image v-if="appUser.id" :src="qrcode" mode="aspectFill" />
          <div v-else class="no-login">
            <image src="../../static/images/qrcode.png" mode="aspectFill" />
            <div class="flex flex-col items-center gap-y-2 mb-5">
              <span class="t2">登录后查看专属二维码</span>
              <span class="t3">二维码可用于各种卡券核销</span>
            </div>
            <nut-button
              block
              type="primary"
              open-type="getUserInfo"
              @click="login">
              立即登录
            </nut-button>
          </div>
        </div>
        <div class="logo">
          <div class="inner">
            <image src="../../static/images/logo.png" mode="aspectFill" />
            <span>HAOWEN LAND</span>
          </div>
        </div>
      </div>
    </div>

    <BindMobile
      v-model:visible="bindMobileVisible"
      :get-phone-number="getPhoneNumber" />
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onShow, onHide, onUnload } from '@dcloudio/uni-app'
import { getQRCodeRes } from '../../api'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'
import { useLogin } from '@/hooks/useLogin'

const { appUser } = storeToRefs(useAppStore())
const { bindMobileVisible, login, getPhoneNumber } = useLogin(async () => {
  await getQRCode()
})

const qrcode = ref('')
const originalBrightness = ref(0) // 保存原始亮度

async function getQRCode() {
  const data = await getQRCodeRes()
  qrcode.value = data.qrcode
  setScreenBrightness()
}

// 页面显示时设置屏幕亮度
onShow(async () => {
  if (appUser.value.id) {
    await getQRCode()
  }
})

// 页面隐藏时恢复原始亮度
onHide(() => {
  restoreScreenBrightness()
})

// 页面卸载时恢复原始亮度
onUnload(() => {
  restoreScreenBrightness()
})

// 设置屏幕最亮
function setScreenBrightness() {
  // 获取当前屏幕亮度
  uni.getScreenBrightness({
    success: (res) => {
      originalBrightness.value = res.value
    }
  })

  // 设置屏幕亮度为最亮
  uni.setScreenBrightness({
    value: 1 // 1 表示最亮，0 表示最暗
  })

  // 设置保持屏幕常亮
  uni.setKeepScreenOn({
    keepScreenOn: true
  })
}

// 恢复原始屏幕亮度
function restoreScreenBrightness() {
  // 恢复原始亮度
  if (originalBrightness.value > 0) {
    uni.setScreenBrightness({
      value: originalBrightness.value
    })
  }

  // 取消保持屏幕常亮
  uni.setKeepScreenOn({
    keepScreenOn: false
  })
}
</script>

<style lang="scss" scoped>
.__scan {
  padding: 74rpx 32rpx;
  box-sizing: border-box;

  .qrcode-wrap {
    background: url(https://hwly.tuomuit.com/wechat/img/qrcode-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 1126rpx;
    position: relative;

    .t1 {
      color: #000;
      font-size: 38rpx;
      font-weight: 550;
    }

    .t2 {
      color: #333;
      font-size: 32rpx;
      font-weight: 550;
    }

    .t3 {
      color: #4c4c4c;
      font-size: 26rpx;
    }

    .userinfo {
      position: absolute;
      top: 56rpx;
      left: 72rpx;
      width: fit-content;

      .inner {
        display: flex;
        align-items: center;

        image {
          width: 120rpx;
          height: 120rpx;
          margin-right: 28rpx;
          border-radius: 50%;
        }

        view {
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          label:first-child {
            font-weight: 550;
            font-size: 40rpx;
            color: #000;
            margin-bottom: 20rpx;
          }

          label:last-child {
            padding: 5rpx 20rpx;
            display: inline-block;
            background: #8153fe;
            border-radius: 8rpx;
            width: fit-content;
            font-weight: 400;
            font-size: 28rpx;
            color: #ffffff;
          }
        }
      }

      .noLogin {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          flex-direction: column;
          row-gap: 20rpx;
        }
      }
    }

    .qrcode {
      position: absolute;
      top: 350rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 400rpx;
      height: 500rpx;

      image {
        width: 100%;
        height: 400rpx;
      }

      .no-login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        image {
          width: 170.66rpx;
          height: 170.66rpx;
          margin-bottom: 40rpx;
        }
      }
    }

    .logo {
      position: absolute;
      left: 0;
      bottom: 34rpx;
      width: 100%;
      .inner {
        display: flex;
        flex-direction: column;
        align-items: center;

        image {
          width: 80rpx;
          height: 86rpx;
          margin-bottom: 12rpx;
        }

        label {
          font-weight: 550;
          font-size: 40rpx;
          color: #212121;
        }
      }
    }
  }
}
</style>
