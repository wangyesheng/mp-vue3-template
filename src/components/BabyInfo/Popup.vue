<template>
  <div class="__babyPopup">
    <nut-popup
      v-model:visible="babyPopupVisible"
      round
      position="bottom"
      safe-area-inset-bottom>
      <div class="pt-[40rpx]">
        <div class="__title flex justify-between items-center px-[40rpx]">
          <span>宝贝信息</span>
        </div>
        <div class="p-[40rpx] flex flex-col gap-y-[20rpx]">
          <BabyInfo
            v-for="baby in data.baby_info"
            :key="baby.id"
            :data="baby" />
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
const babyPopupVisible = ref(false),
  data = ref({})

defineExpose({
  show(value) {
    data.value = value
    babyPopupVisible.value = true
  }
})
</script>
