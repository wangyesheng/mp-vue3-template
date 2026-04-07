<template>
  <div>
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
                mode="aspectFill"
                :src="data.store?.store_image"
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
          v-if="data.is_aftersaled == 0"
          type="primary"
          size="small"
          @click="navTo(`/pages/warranty/index?id=${data.id}`)">
          查看质保单
        </nut-button>
        <nut-button size="small" @click="emit('showRatePopup')">
          {{ data.is_reviewed == 1 ? '查看评价' : '去评价' }}
        </nut-button>
        <nut-button
          v-if="data.is_aftersaled == 0"
          size="small"
          @click="navTo(`/pages/after-sale/index?id=${data.id}`)">
          申请售后
        </nut-button>
      </div>
      <div v-if="data.status == 5" class="card-foot">
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
    padding: 15rpx 0;

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
</style>
