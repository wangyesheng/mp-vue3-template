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
      <div class="px-[30rpx] box-border">
        <div
          class="bg-[#fff] w-full rounded-[24rpx] mt-[30rpx] box-border px-[30rpx] pt-[40rpx] pb-[44rpx] flex flex-col justify-center">
          <div
            class="flex justify-between items-center mb-[30rpx] box-border px-[10rpx] text-[40rpx] font-[500]">
            <div
              class="h-[100rpx] w-[260rpx] flex items-center"
              @click="() => chooseLocation('origin')">
              <div v-if="originLocation.city" class="flex flex-col w-full">
                <span class="text-[36rpx]">
                  {{ originLocation.city }}
                </span>
                <span
                  class="text-[28rpx] text-[#8c8c8c] w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {{ originLocation.name }}
                </span>
              </div>
              <span v-else>起始地</span>
            </div>
            <img
              class="w-[32rpx] h-[32rpx]"
              src="../../static/images/home/transfer.png"
              alt="" />
            <div
              class="h-[100rpx] w-[260rpx] flex items-center justify-end"
              @click="() => chooseLocation('arrived')">
              <div v-if="arrivedLocation.city" class="flex flex-col w-full">
                <span class="text-[36rpx] text-right">
                  {{ arrivedLocation.city }}
                </span>
                <span
                  class="text-[28rpx] text-right text-[#8c8c8c] w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {{ arrivedLocation.name }}
                </span>
              </div>
              <span v-else>目的地</span>
            </div>
          </div>
          <nut-button
            block
            size="large"
            type="primary"
            @click="onSwitchTab('1')"
            v-if="appUser.id">
            获取报价
          </nut-button>

          <nut-button
            v-else
            block
            type="primary"
            size="large"
            open-type="getUserInfo"
            @click="login">
            获取报价
          </nut-button>

          <BindMobile
            v-model:visible="bindMobileVisible"
            :getPhoneNumber="getPhoneNumber" />
        </div>
      </div>

      <div
        class="box-border px-[30rpx] w-full h-[192rpx] rounded-[16rpx] mt-[20rpx]"
        @click="navTo('/pages/coupon/index')">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-[16rpx]"
          :src="couponUrl"
          alt="" />
      </div>

      <div class="__order-tabs px-[20rpx] box-border mt-[20rpx]">
        <nut-tabs background="#fff" v-model="orderType">
          <nut-tab-pane title="代驾路线" pane-key="1">
            <div>
              <p
                class="text-[#A3A3A3] font-[400] text-[24rpx] text-center mb-[20rpx]">
                此处为估计，以实际下单价格为准
              </p>
              <div
                class="box-border py-[30rpx] border-b-[2rpx] border-solid border-[#F0F0F0] flex justify-between items-center"
                v-for="route in driverRoutes"
                :key="route.id">
                <div class="text-[28rpx] font-[400] flex items-center">
                  <span>
                    {{ route.s_city }}
                  </span>
                  <img
                    class="w-[34rpx] h-[10rpx] mx-[10rpx]"
                    src="../../static/images/home/to.png"
                    alt="" />
                  <span>
                    {{ route.r_city }}
                  </span>
                </div>

                <div class="flex justify-between items-center">
                  <div class="text-[#C72020] text-[22rpx] mr-[20rpx]">
                    <span>预估</span>
                    <span>￥</span>
                    <span
                      class="text-[32rpx] inline-block text-center min-w-[120rpx]">
                      {{ route.order_amount }}
                    </span>
                    <span>元</span>
                  </div>
                  <nut-button
                    type="primary"
                    size="mini"
                    shape="square"
                    @click="onSwitchTab('1')">
                    下单
                  </nut-button>
                </div>
              </div>
            </div>
          </nut-tab-pane>
          <nut-tab-pane title="物流路线" pane-key="2">
            <div>
              <p class="text-[#A3A3A3] font-[400] text-[24rpx] text-center">
                此处为估计，以实际下单价格为准
              </p>
              <div
                class="box-border py-[30rpx] border-b-[2rpx] border-solid border-[#F0F0F0] flex justify-between items-center"
                v-for="route in logisticsRoutes"
                :key="route.id">
                <div class="text-[28rpx] font-[400] flex items-center">
                  <span>
                    {{ route.s_city }}
                  </span>
                  <img
                    class="w-[34rpx] h-[10rpx] mx-[10rpx]"
                    src="../../static/images/home/to.png"
                    alt="" />
                  <span>
                    {{ route.r_city }}
                  </span>
                </div>

                <div class="flex justify-between items-center">
                  <div class="text-[#C72020] text-[22rpx] mr-[20rpx]">
                    <span>预估</span>
                    <span>￥</span>
                    <span
                      class="text-[32rpx] inline-block text-center min-w-[120rpx]">
                      {{ route.order_amount }}
                    </span>
                    <span>元</span>
                  </div>
                  <nut-button
                    type="primary"
                    size="mini"
                    shape="square"
                    @click="onSwitchTab('2')">
                    下单
                  </nut-button>
                </div>
              </div>
            </div>
          </nut-tab-pane>
        </nut-tabs>
      </div>
    </div>
  </AppContainer>
</template>
<script setup>
import AppContainer from '@/components/AppContainer/index'
import BindMobile from '@/components/BindMobile/index'
import { ref, watch } from 'vue'
import { useChooseLocation } from '../../hooks/useChooseLocation'
import { useLogin } from '../../hooks/useLogin'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import {
  getBannersRes,
  getCouponUrlRes,
  getRoutesRes,
  getTelRes
} from '../../api'
import { navTo } from '../../utils/uni'

const appStore = useAppStore()
const { appUser } = storeToRefs(appStore)

const { bindMobileVisible, login, getPhoneNumber } = useLogin()
const { originLocation, arrivedLocation, chooseLocation } = useChooseLocation()

const banners = ref([]),
  couponUrl = ref(null)
onLoad(async () => {
  banners.value = await getBannersRes()
  couponUrl.value = await getCouponUrlRes()
  const tel = await getTelRes()
  appStore.setMerchantTel(tel)
})

const orderType = ref('1'),
  driverRoutes = ref([]),
  logisticsRoutes = ref([])
watch(
  () => orderType.value,
  (newType) => {
    if (newType == 1 && driverRoutes.value.length === 0) {
      getRoutes(newType)
    } else if (newType == 2 && logisticsRoutes.value.length === 0) {
      getRoutes(newType)
    }
  },
  {
    immediate: true
  }
)

async function getRoutes(type) {
  const data = await getRoutesRes(type)
  if (type == 1) {
    driverRoutes.value = data
  } else if (type == 2) {
    logisticsRoutes.value = data
  }
}

function onSwitchTab(type) {
  appStore.setOrderType(type)
  uni.switchTab({ url: '/pages/place-order/index' })
}

onShareAppMessage(() => {
  return {
    title: '车捷速',
    path: '/pages/home/index'
  }
})

onShareTimeline(() => {
  return {
    title: '车捷速',
    path: '/pages/home/index'
  }
})
</script>
