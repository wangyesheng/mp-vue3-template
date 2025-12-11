<template>
  <AppContainer>
    <image :src="activityInfo.image" mode="aspectFill" class="w-full"></image>
    <div class="p-[20rpx] box-border flex flex-col gap-y-[20rpx]">
      <div class="text-[36rpx] font-[550] text-[#333] text-center">
        {{ activityInfo.title }}
      </div>
      <div class="text-[28rpx] text-[#444] flex items-center gap-x-10rpx">
        <nut-icon name="clock" custom-color="#444" size="12" />
        <span>{{ activityInfo.begin_time }} ~ {{ activityInfo.end_time }}</span>
      </div>
      <div class="text-[28rpx] text-[#444] flex items-center gap-x-10rpx">
        <nut-icon name="locationg3" custom-color="#444" size="14" />
        <span>{{ activityInfo.address }}</span>
      </div>
      <div
        class="content"
        v-html="addHtmlClassName(activityInfo.content)"></div>
    </div>
  </AppContainer>
</template>

<script setup>
import { getActivityInfoRes } from '@/api'
import { addHtmlClassName } from '@/utils/uni'

const activityInfo = ref({})
onLoad(async ({ id }) => {
  activityInfo.value = await getActivityInfoRes(id)
})
</script>

<style lang="scss" scoped>
.content {
  ::v-deep() {
    .div,
    .p,
    .strong {
      color: #555 !important;
      font-size: 28rpx !important;

      .span {
        font-size: 28rpx !important;
      }
    }

    .li {
      color: #555 !important;
      font-size: 28rpx !important;

      .span {
        font-size: 28rpx !important;
      }
    }

    .img {
      width: 100% !important;
    }
  }
}
</style>
