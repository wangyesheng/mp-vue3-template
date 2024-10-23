<template>
  <div class="relative box-border p-[30rpx] min-h-screen bg-[#F7F9FC]">
    <div v-html="richText"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAboutUsRes, getFlowProcessRes } from '../../api'

const richText = ref(null)
onLoad(async (options) => {
  let content
  if (options.type === 'aboutUs') {
    uni.setNavigationBarTitle({ title: '关于我们' })
    content = await getAboutUsRes()
  } else if (options.type === 'flowProcess') {
    uni.setNavigationBarTitle({ title: '下单流程' })
    content = await getFlowProcessRes()
  }
  richText.value = content?.replace(/\<img/g, `<img style="width: 100%;"`)
})
</script>

<style lang="scss" scoped></style>
