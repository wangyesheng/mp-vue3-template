<template>
  <div>
    <div
      :class="[
        'order-card',
        data.is_aftersale_order == 1 ? 'after-sale-order' : ''
      ]">
      <div class="card-head">
        <div class="flex flex-col gap-y-1">
          <span class="text-base font-bold">
            {{ data.vehicle_type }}
          </span>
          <span class="text-xs text-[#666]">订单号：{{ data.order_sn }}</span>
        </div>
        <div class="text-xs font-[550]">
          <span
            v-if="data.aftersale_status < 2"
            :style="{ color: orderTypeMap[data.status].color }">
            {{ orderTypeMap[data.status].label }}
          </span>
          <span
            v-else
            :style="{
              color: data.aftersale_status == 2 ? '#22c55e' : '#6b6b6b'
            }">
            {{ data.aftersale_status == 2 ? '已售后完成' : '已关闭售后' }}
          </span>
        </div>
      </div>
      <div class="card-body">
        <div class="product-info">
          <div class="product-content">
            <div class="product-item">
              <div class="label">
                <!-- <span class="i-mdi-package-variant-closed"></span> -->
                <span>购买产品</span>
              </div>
              <div class="value">
                {{ data.product_name }}
              </div>
            </div>
            <div class="product-item">
              <div class="label">
                <!-- <span class="i-mdi-car-wrench"></span> -->
                <span>服务项目</span>
              </div>
              <div class="value">
                {{ data.service_name }}
              </div>
            </div>
            <div class="product-item">
              <div class="label">
                <!-- <span class="i-mdi-store-cog-outline"></span> -->
                <image
                  class="w-[30rpx] h-[30rpx] rounded-xl"
                  mode="aspectFill"
                  :src="data.store?.store_image"
                  @click="previewImage(0, [data.store?.store_image])" />
                <span>施工门店</span>
              </div>
              <div class="value">
                <span class="whitespace-normal">
                  {{ data.store?.store_name }}
                </span>
                <span
                  class="text-[#1890ff] text-xs"
                  @click="copy(data.store?.store_name)">
                  复制
                </span>
              </div>
            </div>
            <div class="product-item">
              <div class="label">
                <!-- <span class="i-mdi-phone"></span> -->
                <span>门店电话</span>
              </div>
              <div class="value">
                {{ data.store?.store_mobile }}
                <span
                  class="text-[#1890ff] text-xs"
                  @click="callPhone(data.store?.store_mobile)">
                  拨打
                </span>
              </div>
            </div>
            <div class="product-item">
              <div class="label">
                <!-- <span class="i-mdi-map-marker-outline"></span> -->
                <span>门店地址</span>
              </div>
              <div class="value">
                {{ data.store?.store_address }}

                <span
                  class="text-[#1890ff] text-xs"
                  @click="copy(data.store?.store_address)">
                  复制
                </span>
              </div>
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
        <!-- 已完成订单 -->
        <nut-button size="small" @click="emit('showRatePopup')">
          {{ data.is_reviewed == 1 ? '查看评价' : '去评价' }}
        </nut-button>
        <nut-button
          size="small"
          @click="navTo(`/pages/after-sale/index?id=${data.id}`)">
          申请售后
        </nut-button>
        <nut-button
          type="primary"
          size="small"
          @click="navTo(`/pages/warranty/index?id=${data.id}`)">
          查看质保单
        </nut-button>
      </div>
      <div v-if="data.status == 5" class="card-foot">
        <!-- 售后订单 -->
        <nut-button
          plain
          size="small"
          type="primary"
          @click="navTo(`/pages/after-sale/timeline?id=${data.aftersale_id}`)">
          查看进度
        </nut-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { confirmOrderRes } from '@/api'
import { orderTypeMap } from '@/constant'
import { callPhone, copy, navTo, previewImage } from '@/utils/uni'

defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['refresh', 'showRatePopup'])

async function onOrderConfirm(id) {
  uni.showModal({
    title: '提示',
    content: '请仔细检查车辆施工后状况',
    async success({ confirm }) {
      if (confirm) {
        await confirmOrderRes(id)
        emit('refresh')
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.order-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 0 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  position: relative;

  &.after-sale-order {
    &::after {
      content: '售后订单';
      position: absolute;
      top: 0;
      right: 0;
      padding: 5rpx 10rpx;
      background: rgb(255, 140, 0, 0.1);
      color: rgb(255, 140, 0);
      font-size: 22rpx;
      font-weight: 550;
      border-top-right-radius: 20rpx;
      border-bottom-left-radius: 20rpx;
    }
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #eeeeee;
  }

  .card-body {
    padding: 15rpx 0;

    .product-info {
      padding: 0 10rpx;
      flex: 1;
      display: flex;
      flex-direction: column;

      .product-content {
        display: flex;
        flex-wrap: wrap;
        row-gap: 20rpx;
        column-gap: 1%;

        .product-item {
          width: 49%;
          display: flex;
          flex-direction: column;
          row-gap: 8rpx;

          .label {
            font-size: 22rpx;
            color: #aaa;
            font-weight: 500;
            display: flex;
            align-items: center;
            column-gap: 5rpx;
          }

          .value {
            flex: 1;
            display: flex;
            align-items: center;
            column-gap: 5rpx;
            font-size: 26rpx;
            color: #333;
            font-weight: 500;
          }
        }
      }
    }
  }

  .card-foot {
    padding: 20rpx 0;
    border-top: 1rpx solid #eeeeee;
    display: flex;
    justify-content: flex-end;
    column-gap: 10rpx;
  }
}
</style>
