<style lang="scss" scoped>
.__orderInfo {
  .orderType {
    position: absolute;
    top: 0;
    right: 0;
    width: 100rpx;
    height: 40rpx;
    border-top-right-radius: 20rpx;
    border-bottom-left-radius: 20rpx;
    line-height: 40rpx;
    text-align: center;
    font-size: 24rpx;
    font-weight: 550;

    // 代驾
    &.driver {
      background: rgba(52, 74, 217, 0.1);
      color: #344ad9;
    }

    // 托运
    &.check {
      background: rgba(107, 186, 91, 0.1);
      color: #6bba5b;
    }
  }

  .footer {
    ::v-deep() {
      button:last-child {
        margin-left: 10rpx;
      }
    }
  }
}
</style>

<template>
  <div
    class="__orderInfo relative w-full bg-[#fff] box-border px-[30rpx] py-[30rpx] mb-[20rpx] rounded-[20rpx]">
    <div :class="['orderType', data.order_type == 1 ? 'driver' : 'check']">
      {{ data.order_type == 1 ? '代驾' : '托运' }}
    </div>
    <div
      class="flex justify-between items-center text-[24rpx] border-b-[2rpx] border-solid border-[#f5f5f5] pb-[16rpx]">
      <span class="text-[#A3A3A3]" @click="copy(data.order_number)">
        订单号：{{ data.order_number }}
      </span>
    </div>
    <div
      @click="
        onNavTo(`/pages/order/details?order_number=${data.order_number}`)
      ">
      <div class="flex justify-between items-center mt-[30rpx]">
        <div class="flex flex-col w-[45%] min-h-[120rpx]">
          <span class="text-[28rpx] font-bold mb-[10rpx]">
            {{ data.s_city }}
          </span>
          <span class="text-[24rpx] text-[#A3A3A3]">
            {{ data.send_address_name }}
          </span>
        </div>
        <img
          class="w-[32rpx] h-[32rpx]"
          src="../../static/images/order/to.png"
          alt="" />

        <div class="flex flex-col text-right w-[45%] min-h-[120rpx]">
          <span class="text-[28rpx] font-bold mb-[10rpx]">
            {{ data.r_city }}
          </span>
          <span class="text-[24rpx] text-[#A3A3A3]">
            {{ data.receive_address_name }}
          </span>
        </div>
      </div>
      <div v-if="data.order_status == 1">
        <div class="text-[24rpx] text-[#CC3535] mt-[10rpx]">
          <span>订单总额：</span>
          <span class="text-[28rpx] font">￥{{ data.order_amount }}元</span>
        </div>
      </div>
      <div v-if="data.order_status > 1">
        <div class="text-[24rpx] text-[#A3A3A3] mt-[10rpx]">
          <span>订单总额：</span>
          <span class="text-[28rpx] text-[#333]">
            ￥{{ data.order_amount }}元
          </span>
        </div>
        <div
          class="text-[24rpx] text-[#A3A3A3] mt-[10rpx]"
          v-if="data.coupon_id > 0">
          <span>优惠金额：</span>
          <span class="text-[28rpx] text-[#333]">
            ￥{{ data.coupon_amount }}元
          </span>
        </div>
        <div class="text-[24rpx] text-[#A3A3A3] mt-[10rpx]">
          <span>实付金额：</span>
          <span class="text-[28rpx] text-[#333]">
            ￥{{ data.real_amount }}元
          </span>
        </div>
      </div>
    </div>
    <div
      v-if="data.order_status < 5"
      class="footer flex justify-end items-center mt-[20rpx] pt-[20rpx] border-t-[2rpx] border-solid border-[#f5f5f5]">
      <nut-button
        v-if="data.order_status == 1"
        plain
        size="mini"
        type="primary"
        @click="debounce(onCallPayPopup)">
        立即支付
      </nut-button>
      <nut-button
        v-if="data.order_status == 3"
        plain
        size="mini"
        type="primary"
        @click="debounce(onConfirmOrder)">
        确认收车
      </nut-button>
      <nut-button
        v-if="data.order_status < 3"
        plain
        size="mini"
        type="default"
        @click="debounce(onCancelOrder)">
        取消订单
      </nut-button>
      <nut-button
        v-if="data.order_status == 4"
        plain
        size="mini"
        type="default"
        @click="debounce(onProcessComplaint)">
        {{ data.complaint_info?.id ? '查看投诉' : '投诉' }}
      </nut-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { copy, navTo } from '../../utils/uni'
import { ORDER_STATUS } from '../../constant'
import { cancelOrderRes, confirmOrderRes } from '../../api'
import debounce from '../../utils/debounce'
import { useAppStore } from '../../stores/app'
import { isNullOrUndef } from '../../utils/is'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['refresh', 'callPayPopup'])

const appStore = useAppStore()

const orderStatus = computed(() => ORDER_STATUS[props.data.order_status])

function onCallPayPopup() {
  emit('callPayPopup', props.data)
}

function onProcessComplaint() {
  if (isNullOrUndef(props.data.complaint_info)) {
    navTo(`/pages/complaint/index?order_number=${props.data.order_number}`)
  } else {
    navTo(
      `/pages/me/complaint-details?type=1&key=${props.data.complaint_info.id}`
    )
  }
}

async function onCancelOrder() {
  uni.showModal({
    title: '提示',
    content: '确定要取消订单吗？',
    confirmText: '确定',
    success: async ({ confirm }) => {
      if (confirm) {
        await cancelOrderRes(props.data.order_number)
        if (props.data.pay_type === 'wallet') appStore.refreshAppUser()
        emit('refresh')
      }
    }
  })
}

async function onConfirmOrder() {
  uni.showModal({
    title: '提示',
    content: '确定要确认收车吗？',
    confirmText: '确定',
    success: async ({ confirm }) => {
      if (confirm) {
        await confirmOrderRes(props.data.order_number)
        emit('refresh')
      }
    }
  })
}

function onNavTo(url) {
  uni.navigateTo({
    url
  })
}
</script>
