<template>
  <div class="__couponWrap">
    <div class="content" v-if="coupons.length > 0">
      <div
        v-for="item in coupons"
        :key="item.id"
        @click="onReceiveCoupon(item)">
        <CouponInfo :data="item" />
      </div>
    </div>
    <div v-else class="h-screen">
      <nut-empty image="empty" description="暂无数据">
        <template #image>
          <img src="../../static/images/no-data.png" alt="" />
        </template>
      </nut-empty>
    </div>
  </div>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getCouponsRes, receiveCouponRes } from '../../api'
import CouponInfo from '@/components/CouponInfo/index'
import { toast } from '../../utils/uni'

onLoad(() => {
  getCoupons()
})
const coupons = ref([])
async function getCoupons() {
  coupons.value = await getCouponsRes()
}

async function onReceiveCoupon(scope) {
  if (scope.is_get) {
    return toast('已领取')
  }
  await receiveCouponRes(scope.id)
  toast('领取成功！')
  getCoupons()
}
</script>

<style lang="scss" scoped>
.__couponWrap {
  width: 100%;
  min-height: 100vh;
  position: relative;

  .content {
    height: 100%;
    box-sizing: border-box;
    padding: 30rpx;
    overflow-y: scroll;
  }
}
</style>
