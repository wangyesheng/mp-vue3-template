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
    <RatePopup ref="ratePopupRef" @refresh="refresh" />
  </AppContainer>
</template>

<script setup>
import { getOrderListRes } from '@/api'
import { useAppStore } from '@/stores/app'

const pageListRef = ref(),
  ratePopupRef = ref(),
  appStore = useAppStore()

function refresh() {
  pageListRef.value?.refresh()
}

onShow(() => {
  if (appStore.checkNeedRefresh()) {
    refresh()
  }
})
</script>
