<template>
  <AppContainer>
    <div class="__home">
      <!-- 顶部渐变背景 -->
      <div class="header-bg">
        <!-- 第一板块：用户信息 -->
        <div class="user-card">
          <button
            class="avatar"
            open-type="chooseAvatar"
            @chooseavatar="onChooseAvatar">
            <image mode="aspectFill" :src="appUser.avatar" />
          </button>
          <div class="user-info">
            <input
              class="nickname"
              type="nickname"
              placeholder="请输入用户名"
              maxlength="14"
              :value="appUser.nickname"
              @change="onNicknameChange" />
            <div class="phone">{{ appUser.mobile }}</div>
          </div>
          <div class="points-tag">
            <text class="i-mdi-diamond-stone !text-[32rpx]"></text>
            <text>积分 {{ appUser.score }}</text>
          </div>
        </div>
      </div>

      <div class="main-content">
        <!-- 第二板块：待绑定订单 -->
        <div class="section">
          <div class="section-head mb-[30rpx]">
            <div class="title-wrap">
              <span class="title">我的订单</span>
            </div>
            <div class="more" @tap="navTo('/pages/order/list')">
              <span>查看更多</span>
              <span class="i-mdi-chevron-right ml-[5rpx]"></span>
            </div>
          </div>

          <scroll-view
            scroll-x
            class="scroll-container"
            :show-scrollbar="false">
            <div class="order-container">
              <OrderInfo
                v-for="order in orders"
                :key="order.id"
                class="flex-shrink-0 basis-[88%]"
                :data="order"
                @refresh="getOrders"
                @show-rate-popup="() => ratePopupRef.showPopup(order)" />
            </div>
          </scroll-view>
        </div>

        <!-- 第三板块：积分商城 -->
        <div class="section">
          <div class="section-head mb-[30rpx]">
            <div class="title-wrap">
              <span class="title">积分商城</span>
            </div>
            <div class="more" @tap="navTo('/pages/mall/index')">
              <span>更多好物</span>
              <span class="i-mdi-chevron-right ml-[5rpx]"></span>
            </div>
          </div>
          <scroll-view
            scroll-x
            class="scroll-container"
            :show-scrollbar="false">
            <div class="mall-track">
              <div v-for="item in goods" :key="item.id" class="mall-card">
                <div class="img-wrap">
                  <image
                    class="goods-img"
                    mode="aspectFill"
                    :src="item.image" />
                  <div v-if="item.tag" class="tag">{{ item.tag }}</div>
                </div>
                <div class="goods-info">
                  <div class="name">{{ item.name }}</div>
                  <div class="price">
                    <text class="num">{{ item.points }}</text>
                    <text class="unit">积分</text>
                  </div>
                </div>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>

      <RatePopup ref="ratePopupRef" />
    </div>
  </AppContainer>
</template>

<script setup>
import { getGoodsRes, getOrderListRes, updateUserRes } from '@/api'
import { useAppStore } from '@/stores/app'
import { useUploader } from '@/hooks/useUploader'
import { navTo } from '@/utils/uni'

const appStore = useAppStore()
const { appUser, appToken } = storeToRefs(appStore)
const { upload } = useUploader()
const goods = ref([]),
  orders = ref([]),
  ratePopupRef = ref()

async function onChooseAvatar(e) {
  const {
    detail: { avatarUrl }
  } = e
  const { url } = await upload(avatarUrl)
  await updateUserRes({ avatar: url })
  await appStore.refreshAppUser()
}

async function onNicknameChange(e) {
  const value = e.detail.value
  if (value) {
    await updateUserRes({ nickname: value, username: value })
    await appStore.refreshAppUser()
  }
}

async function getOrders() {
  const orderRes = await getOrderListRes({ page: 1, limit: 3 })
  orders.value = orderRes.data
}

onLoad(async () => {
  getOrders()
  const result = await getGoodsRes({ page: 1, limit: 5 })
  goods.value = result.data
})

onShow(() => {
  if (!appToken.value) {
    navTo('/pages/login/index', false)
    return
  }

  if (appStore.checkHomeOrderListNeedRefresh()) {
    getOrders()
  }
})

onPullDownRefresh(async () => {
  try {
    uni.showLoading({
      title: '下拉刷新中...',
      mask: true
    })
    await getOrders()
  } finally {
    uni.hideLoading()
  }
  uni.stopPullDownRefresh()
})
</script>

<style lang="scss" scoped>
.__home {
  ::v-deep() {
    .nut-tab-pane {
      padding: 0 !important;
      background: transparent !important;
    }
  }

  .header-bg {
    width: 100%;
    height: 450rpx;
    background: linear-gradient(180deg, #1890ff 0%, #2563eb 90%, #f5f6fa 100%);
    border-radius: 0 0 50% 50% / 0 0 10% 10%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;

    // 用户卡片
    .user-card {
      width: 95%;
      background: #fff;
      border-radius: 24rpx 24rpx 0 0;
      padding: 32rpx;
      display: flex;
      align-items: center;
      box-shadow: 0 8rpx 32rpx rgba(24, 144, 255, 0.08);

      .avatar {
        margin: 0;
        padding: 0;
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
        border: 4rpx solid #f0f0f0;
        flex-shrink: 0;

        &::after {
          border: none;
        }

        image {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .user-info {
        flex: 1;
        margin-left: 24rpx;

        .nickname {
          font-size: 34rpx;
          font-weight: 600;
          color: #121836;
          margin-bottom: 8rpx;
        }

        .phone {
          font-size: 26rpx;
          color: #888;
        }
      }

      .points-tag {
        background: linear-gradient(90deg, #fff4e5, #ffe6c2);
        padding: 10rpx 24rpx;
        border-radius: 30rpx;
        display: flex;
        align-items: center;
        gap: 8rpx;

        .icon {
          font-size: 24rpx;
        }

        text {
          font-size: 24rpx;
          color: #d97706;
          font-weight: 600;
        }
      }
    }
  }

  .main-content {
    padding: 32rpx 5% 0;
    box-sizing: border-box;
  }

  // 通用板块样式
  .section {
    margin-top: 20rpx;

    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title-wrap {
        display: flex;
        align-items: center;
        gap: 12rpx;

        .title {
          font-size: 34rpx;
          font-weight: 600;
          color: #1a1a2e;
        }

        .badge {
          background: #ef4444;
          color: #fff;
          font-size: 22rpx;
          padding: 2rpx 12rpx;
          border-radius: 20rpx;
          font-weight: 500;
        }
      }

      .more {
        font-size: 26rpx;
        color: #8c8c8c;
        display: flex;
        align-items: center;
      }
    }
  }

  // 积分商城横向滚动
  .scroll-container {
    width: 100%;
    white-space: nowrap;

    .mall-track {
      display: inline-flex;
      gap: 20rpx;
      padding-bottom: 10rpx;

      .mall-card {
        width: 276rpx;
        background: #fff;
        border-radius: 16rpx;
        overflow: hidden;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03);
        display: inline-block;

        .img-wrap {
          position: relative;
          width: 100%;
          height: 260rpx;

          .goods-img {
            width: 100%;
            height: 100%;
            background: #f9f9f9;
          }

          .tag {
            position: absolute;
            top: 16rpx;
            left: 16rpx;
            background: linear-gradient(135deg, #ff4d4f, #dc2626);
            color: #fff;
            font-size: 20rpx;
            padding: 4rpx 12rpx;
            border-radius: 8rpx;
            font-weight: 500;
          }
        }

        .goods-info {
          padding: 16rpx;

          .name {
            font-size: 28rpx;
            color: #333;
            font-weight: 500;
            margin-bottom: 12rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .price {
            display: flex;
            align-items: baseline;
            color: #1890ff;

            .num {
              font-size: 32rpx;
              font-weight: bold;
              margin-right: 4rpx;
            }

            .unit {
              font-size: 22rpx;
            }
          }
        }
      }
    }

    .order-container {
      width: 100%;
      display: flex;
      column-gap: 20rpx;
    }
  }
}
</style>
