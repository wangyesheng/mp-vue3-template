<template>
  <div class="box-border p-[30rpx]">
    <div class="richtext" v-html="addHtmlClassName(richText)"></div>
  </div>
</template>

<script setup>
// import { getAboutUsRes, getUserAgreementRes } from '../../api'
import { addHtmlClassName } from '@/utils/uni'

const richText = ref(null)
// onLoad(async (options) => {
//   let content
//   if (options.type === 'aboutUs') {
//     uni.setNavigationBarTitle({ title: '关于我们' })
//     content = await getAboutUsRes()
//   } else if (options.type === 'agreement') {
//     uni.setNavigationBarTitle({ title: '用户协议' })
//     content = await getUserAgreementRes()
//   }
//   richText.value = content?.replace(/<img/g, `<img style="width: 100%;"`)
// })
</script>

<style lang="scss" scoped></style>
