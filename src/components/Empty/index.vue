<template>
  <div :class="customClass">
    <nut-empty :description="description">
      <template #image>
        <img src="../../static/images/no-data.png" />
      </template>
    </nut-empty>
  </div>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    default: '暂无数据'
  },
  customClass: {
    type: [String, Array],
    default: ''
  }
})
</script>
