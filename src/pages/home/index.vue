<style lang="scss" scoped>
.__order-tabs {
  ::v-deep() {
    .nut-tabs {
      border-radius: 20rpx !important;
    }
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

.funcs {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30rpx;

  .func-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 116rpx;
      height: 116rpx;
    }

    label {
      font-size: 26rpx;
      color: #333;
    }
  }
}

.service {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30rpx;

  .service-item {
    &:first-child {
      width: 326rpx;
      height: 378rpx;
      background-image: url(../../static/images/home/bg1.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    &:last-child {
      width: 330rpx;
      height: 378rpx;
      background-image: url(../../static/images/home/bg2.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    & > view {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 60rpx;

      label:first-child {
        color: #0f2930;
        font-size: 32rpx;
        margin-bottom: 10rpx;
      }

      label:last-child {
        color: #78829e;
        font-size: 24rpx;
      }
    }
  }
}

.advantage {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 2rpx solid #344ad9;
  border-radius: 10rpx;
  box-sizing: border-box;
  padding: 20rpx 0;
  background: rgba(52 74 217 / 5%);

  & > view {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &:not(:last-child) {
      &::after {
        content: '';
        position: absolute;
        background: #d6d6d6;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 50%;
        width: 2rpx;
      }
    }

    label:first-child {
      font-size: 28rpx;
      font-weight: 500;
      color: #344ad9;
      margin-bottom: 10rpx;
    }

    label:last-child {
      font-size: 28rpx;
      font-weight: 500;
      color: #6b6b6b;
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
            @click="onSwitchTab('1', {})"
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

      <div class="funcs">
        <div class="func-item" @click="onSwitchTab('1', null)">
          <image src="../../static/images/home/icon1.png" mode="aspectFit" />
          <span>我要代驾</span>
        </div>
        <div class="func-item" @click="onSwitchTab('2', null)">
          <image src="../../static/images/home/icon2.png" mode="aspectFit" />
          <span>轿车托运</span>
        </div>
        <div class="func-item" @click="onClickComingSoonFunc">
          <image src="../../static/images/home/icon3.png" mode="aspectFit" />
          <span>商务代驾</span>
        </div>
        <div class="func-item" @click="onClickComingSoonFunc">
          <image src="../../static/images/home/icon4.png" mode="aspectFit" />
          <span>车辆检测</span>
        </div>
      </div>

      <div class="service">
        <div class="service-item" @click="navTo('/pages/resource-cart/index')">
          <div>
            <span>资源车</span>
            <span>大量车辆任你选择</span>
          </div>
        </div>
        <div class="service-item" @click="onClickComingSoonFunc">
          <div>
            <span>搭电送油</span>
            <span>立马到达现场</span>
          </div>
        </div>
      </div>

      <div
        class="box-border px-[30rpx] w-full h-[192rpx] rounded-[16rpx]"
        @click="navTo('/pages/coupon/index')">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-[16rpx]"
          :src="couponUrl"
          alt="" />
      </div>

      <div class="__order-tabs px-[30rpx] box-border mt-[30rpx]">
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
                    @click="onSwitchTab('1', route)">
                    下单
                  </nut-button>
                </div>
              </div>
            </div>
          </nut-tab-pane>
          <nut-tab-pane title="托运路线" pane-key="2">
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
                    @click="onSwitchTab('2', route)">
                    下单
                  </nut-button>
                </div>
              </div>
            </div>
          </nut-tab-pane>
        </nut-tabs>
      </div>

      <div class="box-border px-[30rpx] mt-[30rpx]">
        <div
          class="box-border px-[40rpx] py-[30rpx] bg-[#fff] w-full rounded-[20rpx]">
          <div class="text-[32rpx] font-[500] mb-[20rpx]">平台优势</div>
          <div class="advantage">
            <div>
              <span>品牌服务</span>
              <span>覆盖全国</span>
            </div>
            <div>
              <span>服务价格</span>
              <span>公开透明</span>
            </div>
            <div>
              <span>平台背书</span>
              <span>使用安心</span>
            </div>
            <div>
              <span>7*24小时</span>
              <span>售后服务</span>
            </div>
          </div>
        </div>
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
  getTelRes,
  getRoutesRes
} from '../../api'
import { callPhone, navTo } from '../../utils/uni'
import { isNullOrUndef } from '../../utils/is'

const appStore = useAppStore()
const { appUser, merchantTel } = storeToRefs(appStore)

const { bindMobileVisible, login, getPhoneNumber } = useLogin()
const { originLocation, arrivedLocation, chooseLocation } = useChooseLocation()

const orderType = ref('1')
const driverRoutes = ref([])
const logisticsRoutes = ref([])
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

const banners = ref([])
const couponUrl = ref(null)
onLoad(async () => {
  banners.value = await getBannersRes()
  couponUrl.value = await getCouponUrlRes()
  const tel = await getTelRes()
  appStore.setMerchantTel(tel)
})

function onSwitchTab(type, route) {
  if (isNullOrUndef(route)) {
    appStore.setOriginLocation()
    appStore.setArrivedLocation()
  } else if (route.order_amount) {
    appStore.setOriginLocation({
      province: route.s_province,
      city: route.s_city,
      district: route.s_area,
      orderAmount: route.order_amount
    })
    appStore.setArrivedLocation({
      province: route.r_province,
      city: route.r_city,
      district: route.r_area,
      orderAmount: route.order_amount
    })
  } else {
    appStore.setOriginLocation(originLocation.value)
    appStore.setArrivedLocation(arrivedLocation.value)
  }
  appStore.setOrderType(type)
  uni.switchTab({ url: '/pages/place-order/index' })
}

function onClickComingSoonFunc() {
  uni.showModal({
    title: '请拨打平台热线电话',
    content: `平台热线：${merchantTel.value}`,
    confirmText: '拨打热线',
    success({ confirm }) {
      if (confirm) {
        callPhone(merchantTel.value)
      }
    }
  })
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
