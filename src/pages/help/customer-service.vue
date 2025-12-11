<template>
  <AppContainer>
    <div class="__customer-service">
      <div class="inner">
        <div class="tips">
          <span>扫码添加</span>
          <span>好稳乐园客服</span>
        </div>
        <div class="qrcode">
          <image :src="code" mode="aspectFill" show-menu-by-longpress />
        </div>
        <div class="phone" @click="callPhone(phone)">
          联系电话 ：{{ phone }}
        </div>
        <div class="logo">
          <image src="../../static/images/logo.png" mode="aspectFill" />
          <span>HAOWEN LAND</span>
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import { getServicePhoneRes, getServiceQrCodeRes } from '@/api'
import { callPhone } from '@/utils/uni'

const code = ref(''),
  phone = ref()
onLoad(async () => {
  code.value = await getServiceQrCodeRes()
  phone.value = await getServicePhoneRes()
})
</script>

<style lang="scss" scoped>
.__customer-service {
  padding: 70rpx 32rpx;
  box-sizing: border-box;

  .inner {
    padding-top: 54rpx;
    padding-bottom: 82rpx;
    background: #94dc23;
    border-radius: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tips {
      font-weight: 550;
      font-size: 40rpx;
      color: #000000;
      text-align: center;
      display: flex;
      flex-direction: column;
      line-height: 56rpx;
    }

    .qrcode {
      width: 542rpx;
      height: 542rpx;
      margin-top: 50rpx;
      border-radius: 20rpx;
      overflow: hidden;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .phone {
      font-weight: 550;
      font-size: 32rpx;
      color: #000000;
      margin-top: 40rpx;
    }
    .logo {
      margin-top: 68rpx;
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
        color: #fff;
      }
    }
  }
}
</style>
