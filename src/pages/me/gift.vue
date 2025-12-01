<template>
  <AppContainer>
    <div class="__gift">
      <div class="banner">
        <div class="score">
          <span>500</span>
          <span>积分</span>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="i in 6" :key="i">
          <div class="top"></div>
          <div class="bottom">
            <span>50积分</span>
            <nut-button type="primary" size="small">兑换</nut-button>
          </div>
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
</script>

<style lang="scss" scoped>
.__gift {
  .content {
    padding: 66rpx 32rpx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    row-gap: 15rpx;
    column-gap: 15rpx;

    .item {
      width: calc(50% - 15rpx);
      background: #ffffff;
      box-shadow:
        0rpx 2rpx 6rpx 2rpx rgba(0, 0, 0, 0.15),
        0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.3);
      border-radius: 24rpx;
      padding: 20rpx;
      box-sizing: border-box;

      .top {
        width: 100%;
        height: 190rpx;
        background: #d9d9d9;
        margin-bottom: 30rpx;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        label {
          font-weight: 600;
          font-size: 32rpx;
          color: #000;
        }
      }
    }
  }
  .banner {
    background: url(https://hwly.tuomuit.com/wechat/img/gift-bg.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 640rpx;
    position: relative;

    .score {
      width: 686rpx;
      height: 120rpx;
      background: #f2f2f2;
      border-radius: 24rpx;
      position: absolute;
      left: 50%;
      bottom: 20rpx;
      transform: translateX(-50%);
      padding-right: 30rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      font-weight: 550;
      color: #000;

      label:first-child {
        font-size: 40rpx;
        margin-right: 12rpx;
      }

      label:last-child {
        font-size: 32rpx;
      }
    }
  }
}
</style>
