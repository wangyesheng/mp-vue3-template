<template>
  <AppContainer>
    <!-- <nut-signature @confirm="confirm" @clear="clear" /> -->
    <div class="w-[80%] mx-[auto] box-border py-[100rpx]">
      <nut-button type="primary" block @click="onPreviewPDF">
        预览PDF
      </nut-button>
    </div>
    <nut-popup position="bottom" v-model:visible="pdfPopupVisible">
      <web-view :src="pdfUrl"></web-view>
    </nut-popup>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { ref } from 'vue'

const pdfUrl = ref('https://www.cnblogs.com/linhan8888/p/16723182.html'),
  pdfPopupVisible = ref(false)
function onPreviewPDF() {
  // uni.downloadFile({
  //   url: pdfUrl.value,
  //   success: ({ tempFilePath, statusCode }) => {
  //     uni.openDocument({
  //       filePath: tempFilePath,
  //       showMenu: true,
  //       success: (result) => {},
  //       fail: (error) => {}
  //     })
  //   },
  //   fail: (error) => {}
  // })
  pdfPopupVisible.value = true
}

const confirm = (canvas, data) => {
  if (data === '') {
    console.log(canvas)
    return false
  }
  const avatar =
    'data:image/jpeg;base64,' +
    uni.getFileSystemManager().readFileSync(data, 'base64')
  console.log('图片地址', avatar)
}
const clear = () => {
  console.log('清除事件')
}
</script>

<style lang="scss" scoped></style>
