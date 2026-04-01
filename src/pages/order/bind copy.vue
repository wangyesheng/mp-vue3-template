<template>
  <AppContainer custom-class="!bg-[#f5f6fa]" :need-min-height="true">
    <div class="__order-bind">
      <div class="section">
        <div class="__title pl-[30rpx] mb-[20rpx]">订单信息</div>
        <div class="info-list">
          <div class="info-item">
            <span class="label">订单号</span>
            <span class="value">{{ orderInfo.order_sn || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">产品型号</span>
            <span class="value">{{ orderInfo.product_name || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">SN批次号</span>
            <span class="value">{{ orderInfo.sn_code || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">施工时间</span>
            <span class="value">{{ orderInfo.construction_time || '-' }}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="__title pl-[30rpx] mb-[20rpx]">施工门店</div>
        <div class="info-list">
          <div class="info-item">
            <span class="label">门店名称</span>
            <span class="value">{{ orderInfo.store_name || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">地址</span>
            <span class="value">{{ orderInfo.store_address || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">联系电话</span>
            <span class="value phone" @tap="callStore">
              {{ orderInfo.store_phone || '-' }}
            </span>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="__title pl-[30rpx] mb-[20rpx]">推荐信息</div>
        <div class="referral-input">
          <nut-input placeholder="选填，请输入推荐人的推荐码" clearable />
        </div>
      </div>

      <div class="bottom-bar">
        <nut-button block type="primary" size="large" @click="handleBind">
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
import { getOrderBindInfoRes, bindOrderRes } from '@/api'
import { toast, callPhone } from '../../utils/uni'
import { useAppStore } from '@/stores/app'
import { useLogin } from '@/hooks/useLogin'

const appStore = useAppStore()
const { appToken } = storeToRefs(appStore)

const orderSn = ref('')
const orderInfo = ref({})
const referralCode = ref('')

const { bindMobileVisible, login, getPhoneNumber } = useLogin(handleBind)

onLoad((options) => {
  if (options.order_sn) {
    orderSn.value = options.order_sn
    getOrderBindInfo()
  }
})

async function getOrderBindInfo() {
  const data = await getOrderBindInfoRes(orderSn.value)
  if (data) {
    orderInfo.value = data
  }
}

async function handleBind() {
  if (!appToken.value) {
    login()
    return
  }

  if (!orderSn.value) {
    return toast('订单信息异常')
  }

  try {
    uni.showLoading({ title: '绑定中...', mask: true })
    await bindOrderRes({
      order_sn: orderSn.value,
      referral_code: referralCode.value || undefined
    })
    uni.hideLoading()
    uni.showModal({
      title: '绑定成功',
      content: '订单已成功绑定到您的账户',
      confirmText: '确定',
      showCancel: false,
      success: () => {
        uni.switchTab({ url: '/pages/home/index' })
      }
    })
  } catch (error) {
    uni.hideLoading()
  }
}

function callStore() {
  if (orderInfo.value.store_phone) {
    callPhone(orderInfo.value.store_phone)
  }
}
</script>

<style lang="scss" scoped>
.__order-bind {
  padding: 24rpx;
  padding-bottom: 100rpx;

  .section {
    background: #fff;
    border-radius: 16rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;

    .section-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 24rpx;
      padding-left: 16rpx;
      border-left: 6rpx solid #1890ff;
    }

    .info-list {
      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 16rpx 0;
        border-bottom: 1rpx solid #f5f5f5;

        &:last-child {
          border-bottom: none;
        }

        .label {
          font-size: 28rpx;
          color: #999;
          flex-shrink: 0;
          width: 160rpx;
        }

        .value {
          font-size: 28rpx;
          color: #333;
          text-align: right;
          flex: 1;

          &.phone {
            color: #1890ff;
            text-decoration: underline;
          }
        }
      }
    }

    .referral-input {
      :deep(.nut-input) {
        background: #f5f6fa;
        border-radius: 10rpx;
      }
    }
  }

  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    padding: 24rpx 32rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    background: #fff;
    box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);
  }
}
</style>
