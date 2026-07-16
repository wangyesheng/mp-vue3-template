<template>
  <AppContainer custom-class="!bg-[#f2f2f2]">
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
          <div class="store-address">
            <span class="icon i-mdi-map-marker-outline"></span>
            <span>{{ appName }}</span>
          </div>
        </div>
      </div>
      <div class="funcs">
        <div
          v-if="appUser.group_id != 1"
          class="invoice-entry"
          @tap="navTo('/pages/scan/record')">
          <div class="invoice-entry-left">
            <image
              src="@/static/images/home/revoke-icon.png"
              class="entry-icon"></image>
            <div class="entry-info">
              <div class="entry-title">核销记录</div>
              <div class="entry-sub">
                <span>点此查看核销记录</span>
              </div>
            </div>
          </div>
          <nut-icon name="rect-right" custom-color="#f28519" />
        </div>
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
            <div class="common" @click="onNavToMP(1)">
              <div>
                <span>电玩</span>
                <span>dianwan</span>
              </div>
              <image
                src="../../static/images/home/game.png"
                mode="aspectFill" />
            </div>
            <div class="common" @click="onNavToMP(2)">
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
          <div v-if="appUser.id" @click="onScan">
            <image
              src="../../static/images/home/writeOff.png"
              mode="aspectFill" />
            <span>券码核销</span>
          </div>
          <div v-else open-type="getUserInfo" @click="login">
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
          <div @click="navTo('/pages/home/activity-list', false)">
            <image
              src="../../static/images/home/activity.png"
              mode="aspectFill" />
            <span>活动信息</span>
          </div>
        </div>
        <div class="activity common">
          <div class="title">HAOWEN LAND 动态</div>
          <scroll-view
            class="scroll-container"
            scroll-x
            :show-scrollbar="false">
            <div class="scroll-content">
              <div
                v-for="(activity, index) in wxActivityList"
                :key="index"
                :style="{ '--w': wxActivityList.length === 1 ? '100%' : '90%' }"
                class="activity-item"
                @click="onToWebView(activity)">
                <image :src="activity.thumb_url" mode="aspectFill" />
                <div class="text-[26rpx] text-[#333] font-[550]">
                  {{ activity.title }}
                </div>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>
    </div>
    <BindMobile
      v-model:visible="bindMobileVisible"
      :get-phone-number="getPhoneNumber" />
  </AppContainer>
</template>

<script setup>
import { getBannersRes } from '@/api'
import { navTo, toast } from '../../utils/uni'
import { useAppStore } from '@/stores/app'
import { useLogin } from '@/hooks/useLogin'
import { getWXActivityListRes } from '../../api'

const { login, getPhoneNumber, bindMobileVisible } = useLogin(onScan)
const appStore = useAppStore()
const { appName, appUser } = storeToRefs(appStore)
const banners = ref([])
const wxActivityList = ref([])
onLoad(async () => {
  appStore.getAppName()
  banners.value = await getBannersRes()
  const result = await getWXActivityListRes()
  wxActivityList.value = result?.data ?? []
})

function onScan() {
  appUser.value.group_id == 1
    ? uni.switchTab({ url: '/pages/scan/index' })
    : uni.scanCode({
        onlyFromCamera: true,
        success({ result }) {
          navTo(`/pages/scan/verification?code=${result}`)
        }
      })
}

function onToWebView(activity) {
  navTo(`/pages/web-view/index?url=${encodeURIComponent(activity.url)}`, false)
}

function onNavToMP(flag) {
  if (flag == 1) {
    uni.navigateToMiniProgram({
      appId: 'wx4545c343b6965595',
      path: 'pages/weapp/home/home?MallCode=77910002'
    })
  } else {
    toast('Coming Soon')
  }
}

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
    background: url(https://hwly.tuomuit.com/wechat/img/home-position-bg.png?ts=2);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 750rpx;
    height: 138rpx;
    padding: 32rpx 88rpx;
    box-sizing: border-box;
  }
}

.funcs {
  padding: 30rpx 34rpx 30rpx;
  box-sizing: border-box;

  .invoice-entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 30rpx;
    background: linear-gradient(135deg, #fffaed, #ffe3be);
    border: 2rpx solid #ffc375;
    border-radius: 20rpx;
    margin: 6rpx 0 16rpx;

    .invoice-entry-left {
      display: flex;
      gap: 20rpx;
      align-items: center;

      .entry-icon {
        width: 64rpx;
        height: 64rpx;
      }

      .entry-info {
        .entry-title {
          margin-bottom: 5rpx;
          font-size: 28rpx;
          font-weight: 700;
          color: #f28519;
        }

        .entry-sub {
          font-size: 24rpx;
          color: #f28519;
        }
      }
    }
  }

  .common {
    box-shadow:
      0rpx 2rpx 2rpx 2rpx rgba(0, 0, 0, 0.05),
      0rpx 2rpx 2rpx 0rpx rgba(0, 0, 0, 0.05);
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
    justify-content: space-between;
    width: 680rpx;
    height: 340rpx;

    .ticket {
      width: 49%;
      padding: 24rpx 22rpx;
      row-gap: 15rpx;

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
      width: 49%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      & > view {
        width: 100%;
        min-height: 48%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10rpx 22rpx 10rpx 40rpx;

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
    width: 100%;
    padding: 18rpx 24rpx 32rpx;
    background: #fff;

    .title {
      font-weight: bold;
      font-size: 32rpx;
      margin-bottom: 24rpx;
    }

    .scroll-container {
      width: 100%;
    }

    .scroll-content {
      display: flex;
      gap: 20rpx;
    }

    .activity-item {
      flex-shrink: 0;
      width: var(--w);
      display: flex;
      flex-direction: column;
      row-gap: 20rpx;

      image {
        width: 100%;
        height: 220rpx;
        object-fit: cover;
        border-radius: 15rpx;
      }
    }
  }
}
</style>
