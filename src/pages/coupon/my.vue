<template>
  <AppContainer>
    <div class="__couponWrap">
      <div class="content" v-if="coupons.length > 0">
        <CouponInfo v-for="item in coupons" :key="item.id" :data="item">
          <template #action>
            <nut-button
              type="primary"
              size="small"
              @click="navTo('/pages/ticket/index')">
              去使用
            </nut-button>
          </template>
        </CouponInfo>
      </div>
      <div v-else class="h-[90vh]">
        <nut-empty image="empty" description="暂无数据">
          <template #image>
            <img src="../../static/images/no-data.png" alt="" />
          </template>
        </nut-empty>
      </div>
      <div class="footer" @click="navTo('/pages/coupon/index')">去领券</div>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getMyCouponsRes } from '../../api'
import CouponInfo from '@/components/CouponInfo/index'
import { navTo } from '../../utils/uni'

const coupons = ref([])
async function getMyCoupons() {
  const { data } = await getMyCouponsRes({ page: 1, limit: 1000 })
  coupons.value = data
}

onShow(() => {
  getMyCoupons()
})
</script>

<style lang="scss" scoped>
.__couponWrap {
  width: 100%;
  padding: 34rpx 32rpx;
  box-sizing: border-box;

  .content {
    display: flex;
    flex-direction: column;
    row-gap: 20rpx;
  }

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
