<style lang="scss" scoped>
.home-wrap {
  .template {
    width: 45%;
    background: #fff;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    padding-bottom: 30rpx;

    image {
      width: 100%;
      height: 200rpx;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
      margin-bottom: 30rpx;
    }
  }
}
</style>

<template>
  <AppContainer>
    <div class="min-w-full min-h-screen home-wrap">
      <nut-swiper height="348" :auto-play="3000">
        <nut-swiper-item v-for="banner in banners" :key="banner.id">
          <img :src="banner.image" class="w-full h-full" draggable="false" />
        </nut-swiper-item>
      </nut-swiper>
      <div class="px-[20rpx] mt-[40rpx] box-border flex justify-around">
        <div
          v-for="template in templates"
          :key="template.id"
          class="template"
          @click="navTo(`/pages/template/preview?id=${template.id}`)">
          <image :src="template.image" mode="aspectFill" />
          <span class="text-[26rpx] text-[#333] font-[550] text-center">
            {{ template.name }}
          </span>
        </div>
      </div>
      <BindMobile
        v-model:visible="bindMobileVisible"
        :getPhoneNumber="getPhoneNumber" />
    </div>
  </AppContainer>
</template>
<script setup>
import AppContainer from '@/components/AppContainer/index'
import BindMobile from '@/components/BindMobile/index'
import { ref } from 'vue'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { getBannersRes, getTemplatesRes } from '../../api'
import { navTo } from '../../utils/uni'

const banners = ref([]),
  templates = ref([])
onLoad(async () => {
  banners.value = await getBannersRes()
  const { data } = await getTemplatesRes()
  templates.value = data
})

onShareAppMessage(() => {
  return {
    title: '远程协议',
    path: '/pages/home/index'
  }
})

onShareTimeline(() => {
  return {
    title: '远程协议',
    path: '/pages/home/index'
  }
})
</script>
