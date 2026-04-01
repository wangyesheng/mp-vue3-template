<template>
  <AppContainer>
    <div class="__home">
      <!-- 顶部渐变背景 -->
      <div class="header-bg">
        <!-- 第一板块：用户信息 -->
        <div class="user-card">
          <image class="avatar" mode="aspectFill" :src="appUser.avatar" />
          <div class="user-info">
            <div class="nickname">{{ appUser.nickname }}</div>
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
          <div class="section-head">
            <div class="title-wrap">
              <span class="title">订单管理</span>
            </div>
          </div>

          <nut-tabs v-model="orderType" type="smile">
            <nut-tab-pane title="我的订单" :type="0">
              <PageList :api="getOrderListRes">
                <template #item="{ data }">
                  <div class="order-card">
                    <div class="card-head">
                      <span class="sn">订单号：{{ data.order_sn }}</span>
                    </div>
                    <div class="card-body">
                      <image
                        class="product-img border-2 border-white shadow-md"
                        :src="data.store?.store_image"
                        mode="aspectFill" />
                      <div class="product-info">
                        <div class="name">
                          {{ data.product_name }}
                          {{ data.service_name && ` - ${data.service_name}` }}
                        </div>
                        <div class="shop">
                          施工门店：{{ data.store?.store_name }}
                        </div>
                        <div class="shop">
                          施工地址：{{ data.store?.store_address }}
                        </div>
                      </div>
                    </div>
                    <div class="card-foot">
                      <nut-button
                        size="small"
                        type="primary"
                        custom-color="linear-gradient(135deg, #1890ff 0%, #40a9ff 50%, #096dd9 100%)">
                        确认施工完成
                      </nut-button>
                    </div>
                  </div>
                </template>
              </PageList>
              <!-- <div class="order-list">
                <div
                  v-for="item in mockOrders"
                  :key="item.id"
                  class="order-card"></div>
              </div> -->
            </nut-tab-pane>

            <nut-tab-pane title="积分商城">
              <div class="order-list">
                <div
                  v-for="item in mockOrders"
                  :key="item.id"
                  class="order-card">
                  <div class="card-head">
                    <span class="sn">订单号：{{ item.sn }}</span>
                  </div>
                  <div class="card-body">
                    <image
                      class="product-img"
                      :src="item.img"
                      mode="aspectFill" />
                    <div class="product-info">
                      <div class="name">{{ item.product }}</div>
                      <div class="shop">施工门店：{{ item.shop }}</div>
                      <div class="time">施工时间：{{ item.time }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </nut-tab-pane>

            <nut-tab-pane title="已完成">
              <div class="order-list">
                <div
                  v-for="item in mockOrders"
                  :key="item.id"
                  class="order-card">
                  <div class="card-head">
                    <span class="sn">订单号：{{ item.sn }}</span>
                  </div>
                  <div class="card-body">
                    <image
                      class="product-img"
                      :src="item.img"
                      mode="aspectFill" />
                    <div class="product-info">
                      <div class="name">{{ item.product }}</div>
                      <div class="shop">施工门店：{{ item.shop }}</div>
                      <div class="time">施工时间：{{ item.time }}</div>
                    </div>
                  </div>
                  <div class="card-foot">
                    <nut-button
                      type="primary"
                      size="small"
                      @click="navTo('/pages/warranty/index', false)">
                      查看质保单
                    </nut-button>
                    <nut-button size="small">去评价</nut-button>
                    <nut-button size="small">申请售后</nut-button>
                  </div>
                </div>
              </div>
            </nut-tab-pane>
            <nut-tab-pane title="售后处理">
              <div class="order-list">
                <div
                  v-for="item in mockOrders"
                  :key="item.id"
                  class="order-card">
                  <div class="card-head">
                    <span class="sn">订单号：{{ item.sn }}</span>
                  </div>
                  <div class="card-body">
                    <image
                      class="product-img"
                      :src="item.img"
                      mode="aspectFill" />
                    <div class="product-info">
                      <div class="name">{{ item.product }}</div>
                      <div class="shop">施工门店：{{ item.shop }}</div>
                      <div class="time">施工时间：{{ item.time }}</div>
                    </div>
                  </div>
                  <div class="card-foot">
                    <nut-button size="small">查看进度</nut-button>
                  </div>
                </div>
              </div>
            </nut-tab-pane>
          </nut-tabs>
        </div>

        <!-- 第三板块：积分商城 -->
        <div class="section">
          <div class="section-head mb-[30rpx]">
            <div class="title-wrap">
              <span class="title">积分商城</span>
            </div>
            <div class="more" @tap="navTo('/pages/mall/index')">
              更多好物
              <text class="arrow">></text>
            </div>
          </div>

          <scroll-view class="mall-scroll" scroll-x :show-scrollbar="false">
            <div class="mall-track">
              <div v-for="item in mockGoods" :key="item.id" class="mall-card">
                <div class="img-wrap">
                  <image class="goods-img" :src="item.img" mode="aspectFill" />
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
    </div>
  </AppContainer>
</template>

<script setup>
import { getOrderListRes } from '@/api'
import { navTo } from '../../utils/uni'
import { useAppStore } from '@/stores/app'

const orderType = ref(0)
const { appUser, appToken } = storeToRefs(useAppStore())

// Mock 待绑定订单数据
const mockOrders = ref([
  {
    id: 1,
    sn: '20260313-001',
    product: '隐形车衣 CY001',
    shop: '北京朝阳旗舰店',
    time: '2026-03-13 14:00',
    img: null
  },
  {
    id: 2,
    sn: '20260313-002',
    product: '全车隔热膜 尊享版',
    shop: '北京海淀体验中心',
    time: '2026-03-14 10:00',
    img: null
  }
])

// Mock 积分商城数据
const mockGoods = ref([
  {
    id: 1,
    name: '高级洗车毛巾套装',
    points: 500,
    tag: '热兑',
    img: null
  },
  {
    id: 2,
    name: '内饰深层清洁剂',
    points: 1200,
    tag: '新品',
    img: null
  },
  {
    id: 3,
    name: '高效燃油宝',
    points: 800,
    img: null
  },
  {
    id: 4,
    name: '车载香薰挂件',
    points: 1500,
    img: null
  }
])

onShow(() => {
  if (!appToken.value) {
    navTo('/pages/login/index', false)
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
    background: linear-gradient(180deg, #1890ff 0%, #40a9ff 90%, #f5f6fa 100%);
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
        width: 112rpx;
        height: 112rpx;
        border-radius: 50%;
        border: 4rpx solid #f0f0f0;
        flex-shrink: 0;
      }

      .user-info {
        flex: 1;
        margin-left: 24rpx;

        .nickname {
          font-size: 34rpx;
          font-weight: 600;
          color: #333;
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
    margin-top: 48rpx;

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

        .arrow {
          margin-left: 4rpx;
          font-family: monospace;
        }
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
        color: #f59e0b;
        font-weight: 500;
      }
    }

    .card-body {
      display: flex;
      padding: 24rpx 0;

      .product-img {
        width: 140rpx;
        height: 140rpx;
        border-radius: 12rpx;
        background: #f5f5f5;
        flex-shrink: 0;
      }

      .product-info {
        margin-left: 20rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          font-size: 30rpx;
          font-weight: 600;
          color: #333;
        }

        .shop,
        .time {
          font-size: 24rpx;
          color: #888;
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
