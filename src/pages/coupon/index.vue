<template>
  <AppContainer>
    <div class="__couponWrap">
      <div class="content" v-if="coupons.length > 0">
        <CouponInfo :data="item" v-for="item in coupons" :key="item.id">
          <template #action="{ data }">
            <nut-button
              type="primary"
              size="small"
              @click="debounce(() => onReceiveCoupon(data))">
              立即领取
            </nut-button>
          </template>
        </CouponInfo>
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
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getCouponsRes, receiveCouponRes } from '../../api'
import CouponInfo from '@/components/CouponInfo/index'
import { toast } from '../../utils/uni'
import debounce from '../../utils/debounce'

const coupons = ref([])
async function getCoupons() {
  const { data } = await getCouponsRes({
    page: 1,
    limit: 100
  })
  coupons.value = data
}

async function onReceiveCoupon(scope) {
  if (scope.is_get) {
    return toast('已领取')
  }
  await receiveCouponRes(scope.id)
  toast('领取成功！')
  getCoupons()
}

onLoad(() => {
  getCoupons()
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
}
</style>
