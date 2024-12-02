<template>
  <AppContainer>
    <div class="p-[30rpx] box-border preview-wrap">
      <image
        class="w-full mb-[20rpx] block"
        mode="widthFix"
        v-for="(src, index) in currentTemplate.content_images || []"
        :key="index"
        :src="src"
        @click="previewImage(currentTemplate.content_images)" />
    </div>
    <div class="footer">
      <nut-button
        block
        size="large"
        type="primary"
        @click="navTo('/pages/template/create-contract')">
        创建合同
      </nut-button>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onLoad } from '@dcloudio/uni-app'
import { getTemplateDetailRes } from '../../api'
import { navTo, previewImage } from '../../utils/uni'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'

const appStore = useAppStore()
const { currentTemplate } = storeToRefs(appStore)

onLoad(async ({ id = 1 }) => {
  const data = await getTemplateDetailRes(id)
  appStore.setCurrentTemplate(data || {})
})
</script>

<style lang="scss" scoped>
.preview-wrap {
  image:last-child {
    margin-bottom: 10vh;
  }
}
</style>
