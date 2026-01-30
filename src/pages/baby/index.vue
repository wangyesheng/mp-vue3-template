<template>
  <AppContainer>
    <div v-if="babyList.length" class="baby-container">
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

    <div v-if="appUser.group_id == 2" class="footer">
      <div class="inner">
        <nut-button
          block
          size="large"
          type="primary"
          @click="navTo(`/pages/baby/search`)">
          为客户添加宝贝
        </nut-button>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import { getBabyListRes } from '@/api'
import { useAppStore } from '@/stores/app'
import { navTo } from '@/utils/uni'

const { appUser } = storeToRefs(useAppStore())
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
.baby-container {
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

.footer {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 0rpx -2rpx 2rpx #f5f5f5;
  padding-bottom: calc(env(safe-area-inset-bottom) + 10rpx);
  padding-top: 30rpx;

  .inner {
    width: 100%;
    height: 100%;
    padding: 0 50rpx;
    box-sizing: border-box;
  }
}
</style>
