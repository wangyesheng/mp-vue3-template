<template>
  <AppContainer>
    <div class="order-bind">
      <!-- 订单信息 -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">订单信息</div>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span class="info-label">订单号</span>
            <span class="info-value">{{ orderInfo.order_sn }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">购买产品</span>
            <span class="info-value">{{ orderInfo.product_name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">服务项目</span>
            <span class="info-value">{{ orderInfo.service_name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">备注</span>
            <span class="info-value">{{ orderInfo.remark }}</span>
          </div>
        </div>
      </div>

      <!-- 施工门店 -->
      <div v-if="orderInfo.is_construction == 1" class="card">
        <div class="card-header">
          <div class="card-title">施工门店</div>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span class="info-label">门店名称</span>
            <span class="info-value">{{ orderInfo.store.store_name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">地址</span>
            <text class="info-value address" user-select>
              {{ orderInfo.store.store_address }}
            </text>
          </div>
          <div class="info-row last" @tap="callStore">
            <span class="info-label">联系电话</span>
            <div class="phone-row">
              <span class="info-value phone">
                {{ orderInfo.store.store_mobile }}
              </span>
              <nut-button plain size="mini" type="primary">拨打</nut-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐信息 -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">推荐信息</div>
          <nut-tag plain round custom-color="#999">选填</nut-tag>
        </div>
        <div class="referral-wrap">
          <nut-input
            v-model="referralCode"
            placeholder="请输入推荐人的推荐码"
            clearable />
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="bottom-bar">
        <nut-button
          v-if="appToken"
          block
          size="large"
          type="primary"
          custom-color="linear-gradient(135deg, #1890ff 0%, #0e4fc4 100%)"
          :disabled="loading"
          :loading="loading"
          @click="onBind">
          {{ loading ? '绑定中...' : '立即绑定' }}
        </nut-button>
        <nut-button
          v-else
          block
          size="large"
          type="primary"
          custom-color="linear-gradient(135deg, #1890ff 0%, #0e4fc4 100%)"
          @click="login">
          立即绑定
        </nut-button>
      </div>
    </div>

    <BindMobile
      v-model:visible="bindMobileVisible"
      :get-phone-number="getPhoneNumber" />
  </AppContainer>
</template>

<script setup>
import { bindOrderRes, getOrderInfoRes } from '@/api'
import { callPhone, navTo } from '../../utils/uni'
import { useAppStore } from '@/stores/app'
import { useLogin } from '@/hooks/useLogin'

const appStore = useAppStore()
const { appToken } = storeToRefs(appStore)

const orderInfo = ref({})
const referralCode = ref('')
const loading = ref(false)

const { bindMobileVisible, login, getPhoneNumber } = useLogin()

onLoad(async ({ order_sn = '20260402235440329548' }) => {
  if (order_sn) {
    const data = await getOrderInfoRes(order_sn)
    orderInfo.value = data
  }
})

async function onBind() {
  try {
    loading.value = true
    await bindOrderRes({
      order_sn: orderInfo.value.order_sn,
      referral_code: referralCode.value || undefined
    })
    navTo('/pages/home/index')
  } finally {
    loading.value = false
  }
}

function callStore() {
  if (orderInfo.value.store.store_phone) {
    callPhone(orderInfo.value.store.store_phone)
  }
}
</script>

<style lang="scss" scoped>
.order-bind {
  padding: 24rpx 24rpx 160rpx;

  // 顶部产品卡片
  .product-card {
    display: flex;
    align-items: center;
    gap: 24rpx;
    background: linear-gradient(135deg, #1a6ff5 0%, #0e4fc4 100%);
    border-radius: 20rpx;
    padding: 36rpx 32rpx;
    margin-bottom: 24rpx;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      right: -40rpx;
      top: -40rpx;
      width: 200rpx;
      height: 200rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
    }

    &::before {
      content: '';
      position: absolute;
      right: 60rpx;
      bottom: -60rpx;
      width: 240rpx;
      height: 240rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.04);
    }

    .product-icon {
      width: 88rpx;
      height: 88rpx;
      border-radius: 20rpx;
      background: rgba(255, 255, 255, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 44rpx;
      flex-shrink: 0;
    }

    .product-info {
      flex: 1;
      min-width: 0;

      .product-name {
        font-size: 32rpx;
        font-weight: 600;
        color: #fff;
        margin-bottom: 10rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .product-sn {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.7);
        font-family: monospace;
      }
    }

    .status-badge {
      flex-shrink: 0;
      font-size: 22rpx;
      color: #1a6ff5;
      background: #fff;
      border-radius: 20rpx;
      padding: 8rpx 20rpx;
      font-weight: 500;
    }
  }

  // 通用卡片
  .card {
    background: #fff;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    overflow: hidden;

    .card-header {
      display: flex;
      align-items: center;
      gap: 12rpx;
      padding: 32rpx 32rpx 0;

      .card-title {
        font-size: 30rpx;
        font-weight: 600;
        color: #1a1a1a;
      }

      .optional-tag {
        font-size: 22rpx;
        color: #999;
        background: #f5f5f5;
        border-radius: 8rpx;
        padding: 4rpx 14rpx;
      }
    }

    .card-body {
      padding: 16rpx 32rpx 8rpx;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 22rpx 0;
      border-bottom: 1rpx solid #f7f7f7;

      &.last {
        border-bottom: none;
      }

      .info-label {
        font-size: 28rpx;
        color: #888;
        flex-shrink: 0;
        width: 160rpx;
      }

      .info-value {
        font-size: 28rpx;
        color: #222;
        text-align: right;
        flex: 1;

        &.mono {
          font-family: monospace;
          font-size: 26rpx;
          letter-spacing: 1rpx;
        }

        &.address {
          line-height: 1.5;
        }

        &.phone {
          color: var(--uvt-primary-color);
          font-weight: 500;
        }
      }

      .phone-row {
        display: flex;
        align-items: center;
        gap: 16rpx;
      }
    }

    .referral-wrap {
      padding: 20rpx 24rpx 28rpx;
      :deep() {
        .nut-input {
          background: #f5f6fa;
          border-radius: 10rpx;
        }
      }
    }
  }

  // 底部按钮
  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    padding: 20rpx 32rpx;
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20rpx);
    border-top: 1rpx solid rgba(0, 0, 0, 0.04);
  }
}
</style>
