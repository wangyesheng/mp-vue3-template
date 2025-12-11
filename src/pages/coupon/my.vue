<template>
  <AppContainer>
    <div class="__couponWrap">
      <PageList :api="getMyCouponsRes">
        <template #item="{ data }">
          <CouponInfo :data="data">
            <template #action>
              <nut-button
                type="primary"
                size="small"
                @click="navTo('/pages/ticket/index')">
                去使用
              </nut-button>
            </template>
          </CouponInfo>
        </template>
      </PageList>
      <div class="footer" @click="navTo('/pages/coupon/index')">去领券</div>
    </div>
  </AppContainer>
</template>

<script setup>
import { getMyCouponsRes } from '../../api'
import { navTo } from '../../utils/uni'
</script>

<style lang="scss" scoped>
.__couponWrap {
  width: 100%;
  padding: 34rpx 32rpx 10vh;
  box-sizing: border-box;

  .footer {
    width: 100%;
    height: 10vh;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    font-size: 32rpx;
    color: #000;
    box-shadow: 0rpx -10rpx 20rpx #eeeeee;
  }
}
</style>
