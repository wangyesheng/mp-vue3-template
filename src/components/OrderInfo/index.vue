<template>
  <div
    class="__orderInfo relative w-full bg-[#fff] box-border px-[20rpx] py-[20rpx] rounded-[20rpx]">
    <div :class="['orderType', 'type' + data.order_type]">
      {{ data.order_type == 1 ? '门票购买' : '积分兑换' }}
    </div>
    <div
      class="flex justify-between items-center border-b-[2rpx] border-solid border-[#f5f5f5] pb-[20rpx]">
      <span
        class="text-[#333] text-[30rpx] font-[550]"
        @click="copy(data.order_number)">
        {{ data.title }}
      </span>
    </div>
    <div class="content">
      <div class="layer">
        <span>订单号</span>
        <span class="text-[#333]">{{ data.order_sn }}</span>
      </div>
      <div class="layer">
        <span>订单总额</span>
        <span>￥{{ data.price }}</span>
      </div>
      <div v-if="data.coupon_id > 0" class="layer">
        <span>优惠金额</span>
        <span>￥{{ data.discount }}</span>
      </div>
      <div class="layer">
        <span>{{ data.order_type == 2 ? '消耗积分' : '实付金额' }}</span>
        <span>
          {{ data.order_type == 2 ? data.real_price : `￥${data.real_price}` }}
        </span>
      </div>

      <div
        v-if="data.status == 0 && data.baby_info.length"
        class="layer"
        @click="() => emit('showBabyPopupVisible')">
        <span>宝贝信息</span>
        <div class="flex">
          <p class="text-[#666]">{{ data.baby_info.length }}个</p>
          <nut-icon name="rect-right" custom-color="#666" size="12" />
        </div>
      </div>

      <div
        v-if="data.status > 0"
        class="flex items-center justify-center text-[24rpx] text-[var(--hw-primary-color)] gap-x-[10rpx]"
        @click="onExpand">
        <span class="h-[40rpx]">{{ isExpand ? '收起' : '展开更多' }}</span>
        <nut-icon :name="isExpand ? 'rect-up' : 'rect-down'" size="12" />
      </div>

      <div v-if="isExpand" class="flex flex-col gap-y-[20rpx]">
        <div
          v-if="data.baby_info.length"
          class="layer"
          @click="() => emit('showBabyPopupVisible')">
          <span>宝贝信息</span>
          <div class="flex">
            <p class="text-[#666]">{{ data.baby_info.length }}个</p>
            <nut-icon name="rect-right" custom-color="#666" size="12" />
          </div>
        </div>
        <!-- 多次卡显示剩余次数 -->
        <div v-if="data.status > 0 && data.type == 2" class="layer">
          <span>剩余次数</span>
          <span>{{ data.residue_quantity }} / {{ data.quantity }}</span>
        </div>
        <div v-if="data.status > 0" class="layer">
          <span>支付时间</span>
          <span>{{ data.pay_time || '-' }}</span>
        </div>
        <div v-if="data.status > 0" class="layer">
          <span>过期时间</span>
          <span>{{ data.end_time || '-' }}</span>
        </div>
      </div>
    </div>
    <div
      v-if="data.status != 3 && data.order_type != 2"
      class="flex justify-end items-center gap-x-[15rpx] pt-[20rpx] border-t-[2rpx] border-solid border-[#f5f5f5]">
      <nut-button
        v-if="data.status == 0"
        plain
        size="mini"
        type="primary"
        @click="debounce(onCallPayPopup)">
        立即支付
      </nut-button>

      <nut-button
        v-if="data.status == 0"
        plain
        size="mini"
        type="default"
        @click="debounce(onCancelOrder)">
        取消订单
      </nut-button>

      <nut-button
        v-if="data.status == 1 && data.order_type == 1"
        plain
        size="mini"
        type="primary"
        @click="debounce(onCancelOrder)">
        申请退款
      </nut-button>

      <nut-button
        v-if="data.status == 2"
        plain
        size="mini"
        type="primary"
        @click="navTo(`/pages/ticket/details?id=${data.ticket_id}`)">
        再来一单
      </nut-button>

      <nut-button
        v-if="data.status == 4"
        plain
        size="mini"
        type="primary"
        @click="navTo(`/pages/ticket/details?id=${data.ticket_id}`)">
        重新购买
      </nut-button>
    </div>
  </div>
</template>

<script setup>
import { copy, navTo, toast } from '../../utils/uni'
import { cancelOrderRes } from '../../api'
import debounce from '../../utils/debounce'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['refresh', 'callPayPopup', 'showBabyPopupVisible'])

const isExpand = ref(false)
function onExpand() {
  isExpand.value = !isExpand.value
}

async function onCancelOrder() {
  const type = props.data.status == 0 ? '取消订单' : '申请退款'
  uni.showModal({
    title: '提示',
    content: `确定要${type}吗？`,
    confirmText: '确定',
    success: async ({ confirm }) => {
      if (confirm) {
        await cancelOrderRes(props.data.order_sn)
        toast(type + '成功')
        emit('refresh')
      }
    }
  })
}

function onCallPayPopup() {
  emit('callPayPopup', props.data)
}
</script>

<style lang="scss" scoped>
.__orderInfo {
  .orderType {
    position: absolute;
    top: 0;
    right: 0;
    width: 130rpx;
    height: 45rpx;
    border-top-right-radius: 20rpx;
    border-bottom-left-radius: 20rpx;
    line-height: 45rpx;
    text-align: center;
    font-size: 24rpx;
    font-weight: 550;

    &.type1 {
      background: rgba(129, 83, 254, 0.1);
      color: #8153fe;
    }

    &.type2 {
      background: rgba(220, 35, 149, 0.1);
      color: #dc2395;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    row-gap: 20rpx;
    padding: 20rpx 0;

    .layer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;

      label:first-child {
        color: #999;
      }

      label:last-child {
        color: #666;
      }
    }
  }
}
</style>
