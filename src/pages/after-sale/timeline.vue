<template>
  <app-container>
    <div class="timeline">
      <nut-cell-group title="售后详情">
        <nut-cell
          title="问题描述"
          :desc="afterSaleInfo.problem_desc"></nut-cell>
        <nut-cell title="问题图片">
          <template #desc>
            <div class="image-wrap">
              <div
                v-for="url in afterSaleInfo.images"
                :key="url"
                class="image-item">
                <image :src="url" mode="aspectFill" />
              </div>
            </div>
          </template>
        </nut-cell>
        <nut-cell title="联系人" :desc="afterSaleInfo.contact_name"></nut-cell>
        <nut-cell
          title="联系电话"
          :desc="afterSaleInfo.contact_phone"></nut-cell>
        <nut-cell title="申请时间" :desc="afterSaleInfo.createtime"></nut-cell>
      </nut-cell-group>
      <div class="px-[20rpx] mt-[30rpx]">
        <div class="text-[#909ca4] text-[26rpx] mb-[20rpx]">售后进度</div>
        <nut-steps :current="steps.length" direction="vertical">
          <nut-step
            v-for="step in steps"
            :key="step.id"
            :title="step.content"></nut-step>
        </nut-steps>
      </div>
    </div>
  </app-container>
</template>

<script setup>
import { getAfterSaleDetailRes, getAfterSaleTimelineRes } from '@/api'

const steps = ref([]),
  afterSaleInfo = ref({})

onLoad(async ({ id }) => {
  afterSaleInfo.value = await getAfterSaleDetailRes(id)
  steps.value = await getAfterSaleTimelineRes(id)
})
</script>

<style lang="scss" scoped>
.timeline {
  :deep() {
    .nut-cell__value {
      color: #333 !important;
    }
  }
  .image-wrap {
    display: flex;
    justify-content: flex-end;
    gap: 20rpx;

    .image-item {
      overflow: hidden;
      border: 2rpx solid #e5e7eb;
      background: #f8fafc;
      padding: 10rpx;
      height: 100rpx;
      width: 100rpx;
      border-radius: 10rpx;

      image {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
