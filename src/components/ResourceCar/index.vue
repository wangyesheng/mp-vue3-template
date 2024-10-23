<template>
  <div
    class="rounded-[12rpx] bg-[#fff] mb-[20rpx] box-border px-[30rpx] py-[20rpx]">
    <div class="flex items-center">
      <div class="mainImageWrap">
        <image
          class="max-w-full max-h-full"
          mode="aspectFit"
          :src="data.image"
          alt="" />
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <div>{{ data.title }}</div>
          <div class="text-[#969696] text-[24rpx] mt-[10rpx]">
            {{ `${data.card_time}/${data.mileage}公里/${data.on_city}` }}
          </div>
        </div>
        <div class="text-[#E02B2B] mt-[10rpx]">
          <div class="text-[28rpx] mb-[10rpx]">总价{{ data.price }}元</div>
          <div class="text-[24rpx]">首付{{ data.first_price }}元</div>
        </div>
      </div>
    </div>
    <div class="action" v-if="type == 2">
      <nut-button
        plain
        size="mini"
        type="primary"
        @click="navTo(`/pages/resource-cart/form?id=${data.id}`)">
        编辑
      </nut-button>
    </div>
  </div>
</template>

<script setup>
import { navTo } from '../../utils/uni'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  // 1: 资源车列表；2：我的资源车
  type: {
    type: String,
    default: '1'
  }
})
</script>

<style lang="scss" scoped>
.mainImageWrap {
  width: 220rpx;
  height: 220rpx;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 10rpx;
  margin-right: 20rpx;
  border: 2rpx solid #f5f5f5;
}
.action {
  margin-top: 20rpx;
  padding-top: 10rpx;
  border-top: 2rpx solid #f5f5f5;
  display: flex;
  justify-content: flex-end;
}
</style>
