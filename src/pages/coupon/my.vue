<template>
  <div class="__couponWrap">
    <div class="content" v-if="coupons.length > 0">
      <div v-for="item in coupons" :key="item.id" @click="onCouponClick(item)">
        <CouponInfo :data="item" />
      </div>
    </div>
    <div v-else class="h-[90vh]">
      <nut-empty image="empty" description="暂无数据">
        <template #image>
          <img src="../../static/images/no-data.png" alt="" />
        </template>
      </nut-empty>
    </div>
    <div class="footer" @click="onNavTo">前往领券</div>
  </div>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getMyCouponsRes } from '../../api'
import CouponInfo from '@/components/CouponInfo/index'

onShow(() => {
  getMyCoupons()
})
const coupons = ref([])
async function getMyCoupons() {
  coupons.value = await getMyCouponsRes()
}

function onCouponClick(data) {
  console.log(data)
}

function onNavTo() {
  uni.navigateTo({
    url: '/pages/coupon/index'
  })
}
</script>

<style lang="scss" scoped>
.__couponWrap {
  width: 100%;
  min-height: 100vh;
  position: relative;

  .content {
    height: 90vh;
    box-sizing: border-box;
    padding: 30rpx;
    overflow-y: scroll;
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
    font-size: 28rpx;
    color: #666;
    box-shadow: 0rpx -10rpx 20rpx #eeeeee;
  }
}
</style>
