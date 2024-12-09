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
    <div class="footer flex justify-center items-center">
      <nut-button
        v-if="appUser.id"
        block
        size="large"
        type="primary"
        @click="navTo('/pages/template/create-contract')">
        创建合同
      </nut-button>

      <nut-button
        v-else
        block
        size="large"
        type="primary"
        open-type="getUserInfo"
        @click="login">
        创建合同
      </nut-button>
    </div>
    <BindMobile
      v-model:visible="bindMobileVisible"
      :getPhoneNumber="getPhoneNumber" />
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onLoad } from '@dcloudio/uni-app'
import { getTemplateDetailRes } from '../../api'
import { navTo, previewImage } from '../../utils/uni'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'
import { useLogin } from '../../hooks/useLogin'

const appStore = useAppStore()
const { currentTemplate, appUser } = storeToRefs(appStore)

const { bindMobileVisible, login, getPhoneNumber } = useLogin()

onLoad(async ({ id }) => {
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
