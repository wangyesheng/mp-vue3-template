<!-- 文章详情页 -->
<template>
  <web-view :src="articleUrl"></web-view>
</template>

<script setup>
const articleUrl = ref('')

onLoad((options) => {
  articleUrl.value = decodeURIComponent(options.url)
})
</script>
