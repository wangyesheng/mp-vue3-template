<template>
  <app-container>
    <div class="timeline">
      <nut-cell-group>
        <template #title>
          <span class="__title px-3 !text-sm">售后详情</span>
        </template>
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
                <image mode="aspectFill" :src="url" />
              </div>
            </div>
          </template>
        </nut-cell>
        <nut-cell title="联系人" :desc="afterSaleInfo.contact_name"></nut-cell>
        <nut-cell title="联系电话">
          <template #desc>
            <div class="flex items-center justify-end">
              <span>{{ afterSaleInfo.contact_phone }}</span>
            </div>
          </template>
        </nut-cell>
        <nut-cell title="申请时间" :desc="afterSaleInfo.createtime"></nut-cell>
      </nut-cell-group>

      <nut-cell-group>
        <template #title>
          <span class="__title px-3 !text-sm">售后进度</span>
        </template>
        <div class="p-4">
          <nut-steps direction="vertical" :current="steps.length">
            <nut-step
              v-for="step in steps"
              :key="step.id"
              :title="step.content"
              :content="step.createtime" />
          </nut-steps>
        </div>
      </nut-cell-group>
    </div>
  </app-container>
</template>

<script setup lang="ts">
import { getAfterSaleDetailRes, getAfterSaleTimelineRes } from '@/api'

let currentId: string | undefined
const steps = ref<any[]>([]),
  afterSaleInfo = ref<any>({})

async function getSaleInfo() {
  afterSaleInfo.value = await getAfterSaleDetailRes(currentId)
  steps.value = await getAfterSaleTimelineRes(currentId)
}

onLoad(async ({ id }) => {
  if (id) {
    currentId = id
    getSaleInfo()
  }
})
</script>

<style lang="scss" scoped>
.timeline {
  padding: 20rpx 30rpx;

  :deep() {
    .nut-cell-group__wrap,
    .nut-cell {
      background: #fff !important;
      box-shadow: none !important;
    }

    .nut-cell {
      border-bottom: 1rpx solid #fafafa;
    }

    .nut-cell__value {
      color: #333 !important;
    }

    .nut-step-main {
      padding-bottom: 6%;
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
        border-radius: inherit;
      }
    }
  }
}
</style>
