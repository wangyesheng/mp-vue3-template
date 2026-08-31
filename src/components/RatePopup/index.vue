<template>
  <nut-popup
    v-model:visible="ratePopupVisible"
    round
    safe-area-inset-bottom
    position="bottom">
    <div class="popupWrap">
      <div class="__title px-[20rpx]">施工评价</div>
      <div class="popup-inner rate">
        <div class="mx-[40rpx]">
          <div v-for="item in rateMap" :key="item.key" class="rate-field">
            <div class="rate-field__label">{{ item.label }}</div>
            <nut-rate
              v-model="rateInfo[item.key]"
              active-color="#fa200c"
              size="20" />
          </div>
          <nut-button
            v-if="currentOrder.is_reviewed != 1"
            block
            size="large"
            type="primary"
            @click="debounce(onSubmitRate)">
            确认提交
          </nut-button>
        </div>
      </div>
    </div>
  </nut-popup>
</template>

<script setup>
import { getRateInfoRes, rateOrderRes } from '@/api'
import debounce from '@/utils/debounce'
import { toast } from '@/utils/uni'

const rateMap = [
  {
    key: 'service_rating',
    label: '服务评价'
  },
  {
    key: 'environment_rating',
    label: '环境评价'
  },
  {
    key: 'technology_rating',
    label: '技术评价'
  }
]

const emit = defineEmits(['refresh'])

const ratePopupVisible = ref(false),
  rateInfo = ref({
    service_rating: 0,
    environment_rating: 0,
    technology_rating: 0
  }),
  currentOrder = ref({})

async function onSubmitRate() {
  await rateOrderRes({
    order_id: currentOrder.value.id,
    ...rateInfo.value
  })
  toast('评价成功！')
  emit('refresh')
  ratePopupVisible.value = false
}

defineExpose({
  async showPopup(data) {
    currentOrder.value = data
    if (data.is_reviewed == 1) {
      const result = await getRateInfoRes(data.id)
      rateInfo.value.service_rating = result.service_rating
      rateInfo.value.environment_rating = result.environment_rating
      rateInfo.value.technology_rating = result.technology_rating
    } else {
      rateInfo.value = {
        service_rating: 0,
        environment_rating: 0,
        technology_rating: 0
      }
    }
    ratePopupVisible.value = true
  }
})
</script>

<style lang="scss" scoped></style>
