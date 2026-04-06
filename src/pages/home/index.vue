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
            <image :src="appUser.avatar" mode="aspectFill" />
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
          </div>

          <PageList ref="pageListRef" :api="getOrderListRes">
            <template #item="{ data }">
              <div class="order-card">
                <div class="card-head">
                  <span class="sn">订单号：{{ data.order_sn }}</span>
                  <span
                    v-if="data.is_aftersaled == 0"
                    class="status"
                    :style="{ color: orderTypeMap[data.status].color }">
                    {{ orderTypeMap[data.status].label }}
                  </span>
                  <span v-else class="status text-[#ff0000]">售后中</span>
                </div>
                <div class="card-body">
                  <div class="product-info">
                    <div class="flex items-center gap-x-1 mb-2">
                      <span class="i-mdi-taxi text-[#1890ff] text-xl"></span>
                      <span class="text-base font-bold">
                        {{ data.vehicle_type }}
                      </span>
                    </div>
                    <div class="product-item">
                      <div class="label">
                        <!-- <span class="i-mdi-package-variant-closed"></span> -->
                        <span>购买产品：</span>
                      </div>
                      <div class="value">
                        {{ data.product_name }}
                      </div>
                    </div>
                    <div class="product-item">
                      <div class="label">
                        <!-- <span class="i-mdi-car-wrench"></span> -->
                        <span>服务项目：</span>
                      </div>
                      <div class="value">
                        {{ data.service_name }}
                      </div>
                    </div>
                    <div class="product-item">
                      <div class="label">
                        <!-- <span class="i-mdi-store-cog-outline"></span> -->
                        <span>施工门店：</span>
                      </div>
                      <div class="value">
                        <span>
                          {{ data.store?.store_name }}
                        </span>
                        <image
                          class="w-[40rpx] h-[40rpx] rounded-xl"
                          :src="data.store?.store_image"
                          mode="aspectFill"
                          @click="previewImage(0, [data.store?.store_image])" />
                      </div>
                    </div>
                    <div class="product-item">
                      <div class="label">
                        <!-- <span class="i-mdi-phone"></span> -->
                        <span>门店电话：</span>
                      </div>
                      <div class="value">
                        {{ data.store?.store_mobile }}
                        <span
                          class="text-[#1890ff]"
                          @click="callPhone(data.store?.store_mobile)">
                          拨打
                        </span>
                      </div>
                    </div>
                    <div class="product-item">
                      <div class="label">
                        <!-- <span class="i-mdi-map-marker-outline"></span> -->
                        <span>施工地址：</span>
                      </div>
                      <div class="value">
                        {{ data.store?.store_address }}

                        <span
                          class="text-[#1890ff]"
                          @click="copy(data.store?.store_address)">
                          复制
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="data.status < 4" class="card-foot">
                  <nut-button
                    size="small"
                    type="primary"
                    @click="onOrderConfirm(data.id)">
                    确认施工完成
                  </nut-button>
                </div>
                <div v-if="data.status == 4" class="card-foot">
                  <nut-button
                    type="primary"
                    size="small"
                    @click="navTo(`/pages/warranty/index?id=${data.id}`)">
                    查看质保单
                  </nut-button>
                  <nut-button size="small" @click="onCheckRate(data)">
                    {{ data.is_reviewed == 1 ? '查看评价' : '去评价' }}
                  </nut-button>
                  <nut-button
                    v-if="data.is_aftersaled == 0"
                    size="small"
                    @click="navTo(`/pages/after-sale/index?id=${data.id}`)">
                    申请售后
                  </nut-button>
                  <nut-button
                    v-if="data.is_aftersaled == 1"
                    size="small"
                    @click="
                      navTo(
                        `/pages/after-sale/timeline?id=${data.aftersale_id}`
                      )
                    ">
                    查看进度
                  </nut-button>
                </div>
              </div>
            </template>
          </PageList>
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
          <scroll-view class="mall-scroll" scroll-x :show-scrollbar="false">
            <div class="mall-track">
              <div v-for="item in goods" :key="item.id" class="mall-card">
                <div class="img-wrap">
                  <image
                    class="goods-img"
                    :src="item.image"
                    mode="aspectFill" />
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
      <nut-popup
        v-model:visible="ratePopupVisible"
        round
        position="bottom"
        safe-area-inset-bottom>
        <div class="popupWrap">
          <div class="__title px-[20rpx]">订单评价</div>
          <div class="popup-inner rate">
            <div class="mx-[40rpx]">
              <div v-for="item in rateMap" :key="item.key" class="rate-field">
                <div class="rate-field__label">{{ item.label }}</div>
                <nut-rate
                  v-model="rateInfo[item.key]"
                  active-color="#fa200c"
                  size="20" />
              </div>
              <nut-button
                v-if="currentOrder.is_reviewed != 1"
                block
                size="large"
                type="primary"
                @click="debounce(onSubmitRate)">
                确认提交
              </nut-button>
            </div>
          </div>
        </div>
      </nut-popup>
    </div>
  </AppContainer>
</template>

<script setup>
import {
  confirmOrderRes,
  getGoodsRes,
  getOrderListRes,
  getRateInfoRes,
  rateOrderRes,
  updateUserRes
} from '@/api'
import { callPhone, copy, navTo, previewImage } from '../../utils/uni'
import { useAppStore } from '@/stores/app'
import debounce from '@/utils/debounce'
import { orderTypeMap } from '@/constant'
import { useUploader } from '@/hooks/useUploader'

const appStore = useAppStore()
const { appUser, appToken } = storeToRefs(appStore)
const { upload } = useUploader()
const pageListRef = ref(),
  currentOrder = ref({}),
  ratePopupVisible = ref(false),
  rateInfo = ref({
    service_rating: 0,
    environment_rating: 0,
    technology_rating: 0
  }),
  rateMap = [
    {
      key: 'service_rating',
      label: '服务评价'
    },
    {
      key: 'environment_rating',
      label: '环境评价'
    },
    {
      key: 'technology_rating',
      label: '技术评价'
    }
  ],
  goods = ref([])

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

const onCheckRate = async (data) => {
  currentOrder.value = data
  if (data.is_reviewed == 1) {
    const result = await getRateInfoRes(data.id)
    rateInfo.value.service_rating = result.service_rating
    rateInfo.value.environment_rating = result.environment_rating
    rateInfo.value.technology_rating = result.technology_rating
  } else {
    rateInfo.value = {
      service_rating: 0,
      environment_rating: 0,
      technology_rating: 0
    }
  }
  ratePopupVisible.value = true
}

async function onSubmitRate() {
  await rateOrderRes({
    order_id: currentOrder.value.id,
    ...rateInfo.value
  })
  refresh()
  ratePopupVisible.value = false
}

async function onOrderConfirm(id) {
  uni.showModal({
    title: '提示',
    content: '请仔细检查车辆施工后状况',
    async success({ confirm }) {
      if (confirm) {
        await confirmOrderRes(id)
        pageListRef.value.refresh()
      }
    }
  })
}

function refresh() {
  pageListRef.value?.refresh()
}

onLoad(async () => {
  const result = await getGoodsRes({ page: 1, limit: 5 })
  goods.value = result.data
})

onShow(() => {
  if (!appToken.value) {
    navTo('/pages/login/index', false)
    return
  }

  if (appStore.checkHomeOrderListNeedRefresh()) {
    refresh()
  }
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

  // 订单列表
  .order-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 0 24rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 0;
      border-bottom: 1rpx solid #f5f5f5;

      .sn {
        font-size: 26rpx;
        color: #666;
      }

      .status {
        font-size: 26rpx;
        font-weight: 500;
      }
    }

    .card-body {
      // display: flex;
      // align-items: center;
      padding: 15rpx 0;

      // .product-img {
      //   width: 180rpx;
      //   height: 180rpx;
      //   border-radius: 12rpx;
      //   border: 2rpx solid #e6e6e6;
      //   flex-shrink: 0;
      //   padding: 20rpx;

      //   image {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .product-info {
        margin-left: 20rpx;
        flex: 1;
        display: flex;
        flex-direction: column;

        .product-item {
          margin-bottom: 5rpx;
          display: flex;
          align-items: center;
          font-size: 26rpx;

          .label {
            color: #666;
            display: flex;
            align-items: center;
            column-gap: 10rpx;
          }

          .value {
            flex: 1;
            display: flex;
            align-items: center;
            column-gap: 10rpx;
            color: #333;
          }

          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }

    .card-foot {
      padding: 20rpx 0;
      border-top: 1rpx solid #f5f5f5;
      display: flex;
      justify-content: flex-end;
      column-gap: 10rpx;
    }
  }

  // 积分商城横向滚动
  .mall-scroll {
    width: 100%;
    white-space: nowrap;

    .mall-track {
      display: inline-flex;
      gap: 20rpx;
      padding-bottom: 10rpx;

      .mall-card {
        width: 260rpx;
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
  }
}
</style>
