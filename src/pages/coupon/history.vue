<template>
  <AppContainer>
    <div class="__couponWrap">
      <div class="content" v-if="coupons.length > 0">
        <div class="title">历史优惠券</div>
        <CouponInfo :data="item" v-for="item in coupons" :key="item.id" />
      </div>
      <div v-else>
        <nut-empty image="empty" description="暂无数据">
          <template #image>
            <img src="../../static/images/no-data.png" alt="" />
          </template>
        </nut-empty>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getMyCouponsRes } from '../../api'
import CouponInfo from '@/components/CouponInfo/index'

// onShow(() => {
//   getMyCoupons()
// })
const coupons = ref([{ type: 1 }, { type: 2 }])
async function getMyCoupons() {
  coupons.value = await getMyCouponsRes()
}
</script>

<style lang="scss" scoped>
.__couponWrap {
  width: 100%;
  padding: 34rpx 32rpx;
  box-sizing: border-box;

  .content {
    box-sizing: border-box;
    padding: 44rpx 22rpx;
    overflow-y: scroll;
    background: #fff;
    border-radius: 24rpx;

    .title {
      font-weight: bold;
      font-size: 32rpx;
      color: #000000;
    }
  }
}
</style>
