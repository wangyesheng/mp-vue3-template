<template>
  <div class="__babyPopup">
    <nut-popup
      v-model:visible="babyPopupVisible"
      round
      position="bottom"
      safe-area-inset-bottom>
      <div class="pt-[40rpx]">
        <div class="__title flex justify-between items-center px-[40rpx]">
          <span>
            {{ faceVerify ? '选择宝贝进行人脸比对' : '宝贝信息' }}
          </span>
        </div>
        <div
          v-if="data.baby_info?.length"
          class="p-[40rpx] flex flex-col gap-y-[20rpx]">
          <BabyInfo
            v-for="baby in data.baby_info"
            :key="baby.id"
            :data="baby"
            :raw="data"
            :face-verify="faceVerify" />
        </div>
        <div
          v-else
          class="flex flex-col justify-center items-center gap-y-[30rpx] py-[60rpx]">
          <image
            class="w-[120rpx] h-[170rpx]"
            src="https://hwly.tuomuit.com/wechat/img/empty.png"
            mode="aspectFill" />
          <span class="text-[#666] text-[28rpx] font-[500]">
            暂未添加宝贝信息
          </span>
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
defineProps({
  faceVerify: {
    type: Boolean,
    default: false
  }
})

const babyPopupVisible = ref(false),
  data = ref({})

defineExpose({
  show(value) {
    data.value = value
    babyPopupVisible.value = true
  }
})
</script>
