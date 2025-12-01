<template>
  <AppContainer>
    <div class="__scan">
      <div class="qrcode-wrap">
        <div class="userinfo">
          <div class="inner">
            <image :src="appUser.avatar" mode="aspectFill" />
            <div>
              <span>{{ appUser.nickname }}</span>
              <span>儿童会员</span>
            </div>
          </div>
        </div>
        <div class="qrcode"></div>
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
import { onLoad } from '@dcloudio/uni-app'
import { getQRCodeRes } from '../../api'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'

const { appUser } = storeToRefs(useAppStore())

const qrcode = ref('')
onLoad(async () => {
  qrcode.value = await getQRCodeRes()
})
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

        image {
          width: 120rpx;
          height: 120rpx;
          margin-right: 28rpx;
        }

        view {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          label:first-child {
            font-weight: 550;
            font-size: 40rpx;
            color: #000000;
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
