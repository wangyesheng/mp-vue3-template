<template>
  <AppContainer>
    <div class="bg-[#fff] box-border px-[40rpx] py-[20rpx] __orderDetails">
      <div class="flex items-center justify-between text-[26rpx]">
        <div class="text-[#A3A3A3] w-[140rpx]">订单编号：</div>
        <div
          class="text-right text-[#333] font-bold"
          @click="copy(currentOrderInfo.order_number)">
          {{ currentOrderInfo.order_number }}
        </div>
      </div>
      <div class="flex items-center justify-between text-[26rpx]">
        <div class="text-[#A3A3A3] w-[140rpx]">起始地：</div>
        <div class="flex flex-col text-right text-[#333] font-bold">
          <span>
            {{ currentOrderInfo.s_city }} -
            {{ currentOrderInfo.send_address_name }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-between text-[26rpx] ]">
        <div class="text-[#A3A3A3] w-[140rpx]">目的地：</div>
        <div class="flex flex-col text-right text-[#333] font-bold">
          <span>
            {{ currentOrderInfo.r_city }} -
            {{ currentOrderInfo.receive_address_name }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-between text-[26rpx]">
        <div class="text-[#A3A3A3] w-[140rpx]">车型：</div>
        <div class="text-right text-[#333] font-bold">
          {{ currentOrderInfo.vehicle_type }}
        </div>
      </div>
      <div class="flex items-center justify-between text-[26rpx]">
        <div class="text-[#A3A3A3] w-[140rpx]">姓名：</div>
        <div class="text-right text-[#333] font-bold">
          {{ currentOrderInfo.user_name }}
        </div>
      </div>
      <div class="flex items-center justify-between text-[26rpx]">
        <div class="text-[#A3A3A3] w-[140rpx]">手机号：</div>
        <div class="text-right text-[#333] font-bold">
          {{ currentOrderInfo.user_phone }}
        </div>
      </div>
      <div class="flex items-center justify-between text-[26rpx]">
        <div class="text-[#A3A3A3] w-[140rpx]">订单状态：</div>
        <div class="text-right text-[#333] font-bold">
          {{ orderStatus?.label }}
        </div>
      </div>
      <div
        class="flex items-center justify-between text-[26rpx]"
        v-if="currentOrderInfo.order_status > 0">
        <div class="text-[#A3A3A3] w-[140rpx]">订单总额：</div>
        <div class="text-right text-[#333] font-bold">
          ￥{{ currentOrderInfo.order_amount }}元
        </div>
      </div>
      <div
        class="flex items-center justify-between text-[26rpx]"
        v-if="
          currentOrderInfo.order_status > 1 && currentOrderInfo.coupon_id > 0
        ">
        <div class="text-[#A3A3A3] w-[140rpx]">优惠金额：</div>
        <div class="text-right text-[#333] font-bold">
          ￥{{ currentOrderInfo.coupon_amount }}元
        </div>
      </div>
      <div
        v-if="currentOrderInfo.order_status > 1"
        class="flex items-center justify-between text-[26rpx]">
        <div class="text-[#A3A3A3] w-[140rpx]">实付金额：</div>
        <div class="text-right text-[#333] font-bold">
          ￥{{ currentOrderInfo.real_amount }}元
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onLoad } from '@dcloudio/uni-app'
import { getOrderDetailsRes } from '../../api'
import { ref } from 'vue'
import { copy } from '../../utils/uni'
import { ORDER_STATUS } from '../../constant'

const currentOrderInfo = ref({})
const orderStatus = computed(
  () => ORDER_STATUS[currentOrderInfo.value.order_status]
)
onLoad(async ({ order_number }) => {
  currentOrderInfo.value = await getOrderDetailsRes(order_number)
})
</script>

<style lang="scss" scoped>
.__orderDetails {
  & > view {
    box-sizing: border-box;
    padding: 30rpx 0;
    &:not(:last-child) {
      border-bottom: 2rpx solid #f5f5f5;
    }
  }
}
</style>
