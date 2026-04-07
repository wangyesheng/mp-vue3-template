<template>
  <AppContainer>
    <PageList ref="pageListRef" class="p-3" :api="getOrderListRes">
      <template #item="{ data }">
        <OrderInfo
          :data="data"
          @refresh="refresh"
          @show-rate-popup="() => ratePopupRef.showPopup(data)" />
      </template>
    </PageList>
    <RatePopup ref="ratePopupRef" />
  </AppContainer>
</template>

<script setup>
import { getOrderListRes } from '@/api'

const pageListRef = ref(),
  ratePopupRef = ref()

function refresh() {
  pageListRef.value?.refresh()
}
</script>
