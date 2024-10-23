<template>
  <AppContainer>
    <div
      class="relative w-full min-h-screen bg-[#F7F9FC] box-border pb-[40rpx]">
      <div class="bg-[#fff] flex flex-col mb-[20rpx]">
        <nut-swiper height="348" :auto-play="3000">
          <nut-swiper-item
            v-for="(image, index) in carDetails.images_arr"
            :key="index">
            <img :src="image" class="w-full h-full" draggable="false" />
          </nut-swiper-item>
        </nut-swiper>
        <div class="flex flex-col box-border p-[40rpx] font-[550]">
          <span class="text-[32rpx] mb-[30rpx]">{{ carDetails.title }}</span>
          <div class="text-[#FA5050]">
            <span class="text-[36rpx] mr-[20rpx]">
              ￥{{ carDetails.price }}
            </span>
            <span class="text-[26rpx]">首付￥{{ carDetails.first_price }}</span>
          </div>
        </div>
      </div>

      <div class="bg-[#fff] box-border p-[30rpx] text-[28rpx]">
        <div class="font-[550] text-[32rpx] mb-[32rpx]">车辆档案</div>
        <div>
          <span class="text-[#A1A1A1]">上牌时间：</span>
          <span class="text-[#0F0F0F]">{{ carDetails.card_time }}</span>
        </div>
        <div class="mt-[24rpx]">
          <span class="text-[#A1A1A1]">车源城市：</span>
          <span class="text-[#0F0F0F]">{{ carDetails.on_city }}</span>
        </div>
        <div class="mt-[24rpx]">
          <span class="text-[#A1A1A1]">表显里程：</span>
          <span class="text-[#0F0F0F]">{{ carDetails.mileage }}公里</span>
        </div>
        <div class="mt-[24rpx]">
          <span class="text-[#A1A1A1]">过户次数：</span>
          <span class="text-[#0F0F0F]">{{ carDetails.pass_times }}次</span>
        </div>
        <div class="mt-[24rpx]">
          <span class="text-[#A1A1A1]">车况描述：</span>
          <span class="text-[#0F0F0F]">{{ carDetails.description }}</span>
        </div>
      </div>
      <div class="box-border p-[40rpx]">
        <nut-button block type="primary" @click="callPhone(carDetails.phone)">
          联系卖家
        </nut-button>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index.vue'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getSingleResourceCarRes } from '@/api'
import { callPhone } from '../../utils/uni'

const carDetails = ref({})
async function getSingleResourceCar(id) {
  const data = await getSingleResourceCarRes(id)
  carDetails.value = data
}

onLoad((options) => {
  getSingleResourceCar(options.id)
})
</script>

<style lang="scss" scoped></style>
