<style lang="scss" scoped>
.__home {
  position: relative;
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
  padding: 30rpx 34rpx 80rpx;
  box-sizing: border-box;

  .common {
    box-shadow:
      0rpx 2rpx 6rpx 2rpx rgba(0, 0, 0, 0.15),
      0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.3);
    border-radius: 24rpx;
    background: #fff;
    box-sizing: border-box;
    color: #000;
    display: flex;
    flex-direction: column;

    label:first-child {
      font-weight: 550;
      font-size: 40rpx;
    }

    label:last-child {
      font-weight: 400;
      font-size: 28rpx;
    }
  }

  .entry {
    display: flex;
    column-gap: 16rpx;

    .ticket {
      width: 336rpx;
      padding: 24rpx 22rpx;

      & > view {
        display: flex;
        flex-direction: column;
      }

      image {
        width: 292rpx;
        height: 190rpx;
      }
    }

    .third-mp {
      display: flex;
      flex-direction: column;
      row-gap: 16rpx;

      & > view {
        width: 334rpx;
        min-height: 160rpx;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 8rpx 22rpx 8rpx 40rpx;

        & > view {
          display: flex;
          flex-direction: column;
        }

        image {
          width: 110rpx;
          height: 144rpx;
        }
      }
    }
  }

  .extra {
    margin-top: 16rpx;
    width: 686rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 28rpx 30rpx;

    & > view {
      display: flex;
      flex-direction: column;
      image {
        width: 112rpx;
        height: 112rpx;
        border-radius: 8rpx;
        margin-bottom: 16rpx;
      }
    }
  }

  .activity {
    margin-top: 16rpx;
    width: 686rpx;
    background: #94dc23;
    padding: 18rpx 24rpx;

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
    }

    .activity-item {
      flex-shrink: 0;
      height: 280rpx;
      width: var(--w);
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
    <div class="__home">
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
          <div
            class="ticket common"
            @click="navTo('/pages/ticket/index', false)">
            <div>
              <span>门票购买</span>
              <span>menpiaogoumai</span>
            </div>
            <image
              src="../../static/images/home/ticket.png"
              mode="aspectFill" />
          </div>
          <div class="third-mp">
            <div class="common">
              <div>
                <span>电玩</span>
                <span>dianwan</span>
              </div>
              <image
                src="../../static/images/home/game.png"
                mode="aspectFill" />
            </div>
            <div class="common">
              <div>
                <span>简餐</span>
                <span>jiancan</span>
              </div>
              <image
                src="../../static/images/home/dinner.png"
                mode="aspectFill" />
            </div>
          </div>
        </div>
        <div class="extra common">
          <div @click="switchTab('/pages/scan/index', false)">
            <image
              src="../../static/images/home/writeOff.png"
              mode="aspectFill" />
            <span>券码核销</span>
          </div>
          <div @click="navTo('/pages/help/customer-service', false)">
            <image
              src="../../static/images/home/contract.png"
              mode="aspectFill" />
            <span>客服中心</span>
          </div>
          <div>
            <image
              src="../../static/images/home/activity.png"
              mode="aspectFill" />
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
                :style="{ '--w': banners.length === 1 ? '100%' : '80%' }"
                class="activity-item">
                <image :src="activity.image" mode="aspectFill" />
              </div>
            </div>
          </scroll-view>
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
import { useLogin } from '../../hooks/useLogin'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { getBannersRes } from '../../api'
import { callPhone, navTo, switchTab } from '../../utils/uni'

const appStore = useAppStore()
const { appUser, merchantTel } = storeToRefs(appStore)

const { bindMobileVisible, login, getPhoneNumber } = useLogin()

const banners = ref([])

onLoad(async () => {
  const data = await getBannersRes()
  banners.value = data
})

onShareAppMessage(() => {
  return {
    title: 'HAOWEN LAND',
    path: '/pages/home/index'
  }
})

onShareTimeline(() => {
  return {
    title: 'HAOWEN LAND',
    path: '/pages/home/index'
  }
})
</script>
