<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.swiper {
  height: 668rpx;

  ::v-deep() {
    .nut-swiper {
      z-index: 1;
      height: 100%;
    }
  }
}

.position {
  position: absolute;
  top: 560rpx;
  left: 0;
  z-index: 2;

  .inner {
    background: url(https://hwly.tuomuit.com/wechat/img/home-position-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 750rpx;
    height: 138rpx;
    padding: 32rpx 88rpx;
    box-sizing: border-box;

    view {
      display: flex;
      align-items: center;
      image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 16rpx;
      }

      label {
        color: #000;
        font-size: 28rpx;
      }
    }
  }
}

.funcs {
  padding: 30rpx 34rpx;
  box-sizing: border-box;

  .common {
    box-shadow:
      0rpx 2rpx 6rpx 2rpx rgba(0, 0, 0, 0.15),
      0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.3);
    border-radius: 24rpx;
    background: #fff;
    padding: 24rpx 22rpx;
    box-sizing: border-box;
    color: #000000;
    display: flex;
    flex-direction: column;

    label:first-child {
      font-weight: 550;
      font-size: 40rpx;
      margin-bottom: 8rpx;
    }

    label:last-child {
      font-weight: 400;
      font-size: 28rpx;
    }
  }

  .entry {
    display: flex;
    justify-content: space-between;

    .ticket {
      width: 336rpx;
      height: 336rpx;
    }

    .third-mp {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      view {
        width: 334rpx;
        height: 160rpx;
      }
    }
  }

  .extra {
    margin-top: 16rpx;
    width: 686rpx;
    height: 238rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 28rpx 30rpx !important;

    & > view {
      view {
        width: 112rpx;
        height: 112rpx;
        background: #8153fe;
        border-radius: 8rpx;
      }
    }
  }

  .activity {
    margin-top: 16rpx;
    width: 686rpx;
    height: 354rpx;
    background: #94dc23;

    .title {
      font-weight: bold;
      font-size: 32rpx;
      margin-bottom: 24rpx;
    }

    .scroll-container {
      width: 100%;
      height: 280rpx;
      overflow: hidden;
    }

    .scroll-content {
      display: flex;
      gap: 16rpx;
      padding-right: 22rpx;
    }

    .activity-item {
      flex-shrink: 0;
      width: 480rpx;
      height: 280rpx;
      border-radius: 16rpx;
      overflow: hidden;
      background: #fff;

      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>

<template>
  <AppContainer>
    <div class="home">
      <div class="swiper">
        <nut-swiper :auto-play="3000">
          <nut-swiper-item v-for="banner in banners" :key="banner.id">
            <img :src="banner.image" class="w-full h-full" draggable="false" />
          </nut-swiper-item>
        </nut-swiper>
      </div>

      <div class="position">
        <div class="inner">
          <div>
            <img src="../../static/images/home/map.png" alt="" />
            <span>HAOWEN LAND北京密云店</span>
          </div>
        </div>
      </div>

      <div class="funcs">
        <div class="entry">
          <div class="ticket common">
            <span>门票购买</span>
            <span>menpiaogoumai</span>
          </div>
          <div class="third-mp">
            <div class="common">
              <span>电玩</span>
              <span>dianwan</span>
            </div>
            <div class="common">
              <span>简餐</span>
              <span>jiancan</span>
            </div>
          </div>
        </div>
        <div class="extra common">
          <div>
            <div></div>
            <span>券码核销</span>
          </div>
          <div>
            <div></div>
            <span>客服中心</span>
          </div>
          <div>
            <div></div>
            <span>活动信息</span>
          </div>
        </div>
        <div class="activity common">
          <div class="title">HAOWEN LAND活动</div>
          <scroll-view
            class="scroll-container"
            scroll-x
            :show-scrollbar="false">
            <div class="scroll-content">
              <div
                v-for="(activity, index) in banners"
                :key="index"
                class="activity-item">
                <image :src="activity.image" mode="aspectFill" />
              </div>
            </div>
          </scroll-view>
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

import positionBg from '../../static/images/home/position.png'

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

// 活动数据 - 示例数据，可以从API获取
const activities = ref([
  {
    image: 'https://via.placeholder.com/480x280/FF6B6B/ffffff?text=Activity+1'
  },
  {
    image: 'https://via.placeholder.com/480x280/4ECDC4/ffffff?text=Activity+2'
  },
  {
    image: 'https://via.placeholder.com/480x280/45B7D1/ffffff?text=Activity+3'
  },
  {
    image: 'https://via.placeholder.com/480x280/FFA07A/ffffff?text=Activity+4'
  }
])

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
