<template>
  <AppContainer>
    <div class="p-[30rpx] box-border preview-wrap">
      <image
        class="w-full mb-[20rpx] block"
        mode="widthFix"
        v-for="(src, index) in currentContract.template_sign_images || []"
        :key="index"
        :src="src"
        @click="previewImage(currentContract.template_sign_images)" />
    </div>

    <div class="footer">
      <nut-button block size="large" type="primary" @click="onShowSignPopup">
        签署
      </nut-button>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onLoad } from '@dcloudio/uni-app'
import { getContractDetailsRes } from '../../api'
import { previewImage } from '../../utils/uni'
import { ref } from 'vue'

const currentContract = ref({})
onLoad(async ({ id = 6 }) => {
  const data = await getContractDetailsRes(id)
  currentContract.value = data || {}
})

function onShowSignPopup() {}
</script>

<style lang="scss" scoped>
.preview-wrap {
  image:last-child {
    margin-bottom: 10vh;
  }
}
</style>
