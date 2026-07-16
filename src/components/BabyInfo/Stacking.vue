<template>
  <div class="baby-wrap" :style="wrapperStyle">
    <image
      v-for="(baby, index) in babyList"
      :key="baby.id"
      :src="baby.avatar"
      :class="customClass"
      :style="{
        marginLeft: index > 0 ? '-15%' : '0',
        zIndex: babyList.length - index
      }"
      mode="aspectFill" />
  </div>
</template>

<script setup>
const props = defineProps({
  babyList: {
    type: Array,
    default: () => []
  },
  customClass: {
    type: [String, Array],
    default: ''
  },
  position: {
    type: String,
    default: 'left'
  }
})

const wrapperStyle = computed(() => {
  return {
    'justify-content': props.position == 'right' ? 'flex-end' : 'flex-start'
  }
})
</script>

<style lang="scss" scoped>
.baby-wrap {
  display: flex;
  align-items: center;

  image {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    border: 4rpx solid rgba(129, 83, 254, 0.1);
    box-sizing: border-box;
    position: relative;
  }
}
</style>
