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
  primaryColor: '#344AD9',
  primaryColorEnd: '#344AD9',
  successColor: '#1CBF1E',
  successColorEnd: '#344AD9'
})
</script>

<style lang="scss" scoped>
.app-contanier {
  position: relative;
}
</style>
