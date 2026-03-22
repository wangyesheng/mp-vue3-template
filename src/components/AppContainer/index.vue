<template>
  <nut-config-provider :theme-vars="themeVars">
    <div :class="['app-contanier', customClass]">
      <nut-toast />
      <slot />
    </div>
  </nut-config-provider>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: ''
  }
})

const themeVars = reactive({
  primaryColor: '#1890ff',
  primaryColorEnd: '#1890ff',
  tagPrimaryBackgroundColor: '#1890ff'
})
</script>

<style lang="scss">
.app-contanier {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  padding-bottom: calc(50rpx + env(safe-area-inset-bottom));
}
</style>
