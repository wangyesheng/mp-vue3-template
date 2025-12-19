<template>
  <AppContainer>
    <div v-if="babyList.length" class="baby-wrap">
      <BabyInfo v-for="item in babyList" :key="item.id" :data="item" />
    </div>

    <div
      v-else
      class="flex flex-col justify-center items-center gap-y-[30rpx] h-[50vh]">
      <image
        class="w-[120rpx] h-[170rpx]"
        src="https://hwly.tuomuit.com/wechat/img/empty.png"
        mode="aspectFill" />
      <span class="text-[#666] text-[28rpx] font-[500]">暂未添加宝贝信息</span>
    </div>
  </AppContainer>
</template>

<script setup>
import { getBabyListRes } from '@/api'

const babyList = ref([])

onLoad(async () => {
  try {
    uni.showLoading({
      title: '数据获取中...'
    })
    babyList.value = await getBabyListRes()
  } finally {
    uni.hideLoading()
  }
})
</script>

<style lang="scss" scoped>
.baby-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
  padding: 30rpx 50rpx;

  ::v-deep() {
    .baby-item {
      border-bottom: 2rpx solid #eeee;
      padding-bottom: 20rpx;
    }
  }
}
</style>
