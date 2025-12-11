<template>
  <AppContainer>
    <div class="__couponWrap">
      <PageList ref="pageListRef" :api="getCouponsRes">
        <template #item="{ data }">
          <CouponInfo :data="data">
            <template #action="{ data: coupon }">
              <nut-button
                type="primary"
                size="small"
                @click="debounce(() => onReceiveCoupon(coupon))">
                立即领取
              </nut-button>
            </template>
          </CouponInfo>
        </template>
      </PageList>
    </div>
  </AppContainer>
</template>

<script setup>
import { getCouponsRes, receiveCouponRes } from '../../api'
import { toast } from '../../utils/uni'
import debounce from '../../utils/debounce'

const pageListRef = ref()
async function onReceiveCoupon(scope) {
  await receiveCouponRes(scope.id)
  toast('领取成功！')
  pageListRef.value.refresh()
}
</script>

<style lang="scss" scoped>
.__couponWrap {
  width: 100%;
  padding: 34rpx 32rpx;
  box-sizing: border-box;
}
</style>
