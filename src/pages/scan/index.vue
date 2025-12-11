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
          <div v-else class="noLogin">Hi，Haowen Baby</div>
        </div>
        <div class="qrcode">
          <image :src="qrcode" mode="aspectFill" />
        </div>
        <div class="logo">
          <div class="inner">
            <image src="../../static/images/logo.png" mode="aspectFill" />
            <span>HAOWEN LAND</span>
          </div>
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onShow, onHide, onUnload } from '@dcloudio/uni-app'
import { getQRCodeRes } from '../../api'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'

const { appUser } = storeToRefs(useAppStore())

const qrcode = ref('')
const originalBrightness = ref(0) // 保存原始亮度

// 页面显示时设置屏幕亮度
onShow(async () => {
  if (appUser.value.id) {
    const data = await getQRCodeRes()
    qrcode.value = data.qrcode
    setScreenBrightness()
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
          border-radius: 20rpx;
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
        color: #000;
        font-weight: 500;
        font-size: 36rpx;
      }
    }

    .qrcode {
      position: absolute;
      top: 350rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 400rpx;
      height: 400rpx;

      image {
        width: 100%;
        height: 100%;
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
