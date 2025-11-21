<template>
  <nut-config-provider :theme-vars="themeVars">
    <div class="app-contanier">
      <nut-toast />
      <slot />
    </div>
  </nut-config-provider>
</template>

<script setup>
const themeVars = reactive({
  primaryColor: '#8153FE',
  primaryColorEnd: '#8153FE'
})
</script>

<style lang="scss" scoped>
.app-contanier {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  background: #e8e8e8;
}
</style>
