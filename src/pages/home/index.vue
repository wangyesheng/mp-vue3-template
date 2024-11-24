<style lang="scss" scoped>
.__order-tabs {
  ::v-deep() {
    .nut-tabs__titles {
      height: 120rpx !important;
    }
    .nut-tabs__list {
      .nut-tabs__titles-item {
        border-bottom: 2rpx solid #f7f7f7;

        &__line {
          bottom: 0 !important;
          width: 100% !important;
          background: #344ad9 !important;
        }
      }
    }
  }
}
</style>

<template>
  <AppContainer>
    <div class="min-w-full min-h-screen pb-[50rpx]">
      <nut-swiper height="348" :auto-play="3000">
        <nut-swiper-item v-for="banner in banners" :key="banner.id">
          <img :src="banner.image" class="w-full h-full" draggable="false" />
        </nut-swiper-item>
      </nut-swiper>
      <BindMobile
        v-model:visible="bindMobileVisible"
        :getPhoneNumber="getPhoneNumber" />
    </div>
  </AppContainer>
</template>
<script setup>
import AppContainer from '@/components/AppContainer/index'
import BindMobile from '@/components/BindMobile/index'
import { ref, watch } from 'vue'
import { useLogin } from '../../hooks/useLogin'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { getBannersRes } from '../../api'
import { navTo } from '../../utils/uni'

const appStore = useAppStore()
const { appUser } = storeToRefs(appStore)

const { bindMobileVisible, login, getPhoneNumber } = useLogin()

const banners = ref([])
onLoad(async () => {
  banners.value = await getBannersRes()
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
