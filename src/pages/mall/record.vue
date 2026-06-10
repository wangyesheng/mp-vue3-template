<template>
  <AppContainer>
    <div class="mall-record">
      <PageList ref="pageListRef" :api="getGoodRecoedsRes">
        <template #item="{ data: record }">
          <div class="record-card">
            <div class="record-inner">
              <div class="thumb-wrap">
                <image
                  mode="widthFix"
                  class="thumb"
                  :src="record.goods_image" />
              </div>
              <div class="record-content">
                <div class="top-row">
                  <div class="name">{{ record.goods_name }}</div>
                  <div class="points">-{{ record.total_points }} 积分</div>
                </div>
                <div v-if="record.status != 0" class="meta-row">
                  <span>物流公司：{{ record.express_company }}</span>
                </div>
                <div v-if="record.status != 0" class="meta-row">
                  <div>
                    <span>物流单号：{{ record.express_no }}</span>
                    <span
                      class="ml-0.5 text-[var(--uvt-primary-color)]"
                      @click="copy(record.express_no)">
                      复制
                    </span>
                  </div>
                </div>
                <div class="meta-row">
                  <div>兑换时间：{{ record.createtime }}</div>
                  <div :class="['status', statusMap[record.status].key]">
                    {{ statusMap[record.status].label }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="record.status == 1" class="record-footer">
              <nut-button
                size="mini"
                type="primary"
                @click="onReceiveConfirm(record)">
                确认收货
              </nut-button>
            </div>
          </div>
        </template>
      </PageList>
    </div>
  </AppContainer>
</template>

<script setup>
import { confirmReceiveRes, getGoodRecoedsRes } from '@/api'
import { copy } from '@/utils/uni'

const statusMap = {
  0: {
    key: 'pending',
    label: '待发货'
  },
  1: {
    key: 'wait',
    label: '已发货'
  },
  2: {
    key: 'done',
    label: '已完成'
  }
}

const pageListRef = ref()

function onReceiveConfirm(record) {
  uni.showModal({
    title: '提示',
    content: '确定要确认收货吗？',
    async success({ confirm }) {
      if (confirm) {
        await confirmReceiveRes(record.id)
        pageListRef.value.refresh()
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.mall-record {
  padding: 30rpx;

  .header {
    margin-bottom: 30rpx;

    h1 {
      font-size: 34rpx;
      font-weight: 700;
      color: #1f2d3d;
      margin-bottom: 10rpx;
    }

    p {
      color: #667084;
      font-size: 26rpx;
      line-height: 36rpx;
    }
  }

  .record-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
  }

  .record-card {
    padding: 24rpx;
    border-radius: 24rpx;
    background: #ffffff;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.06);

    .record-inner {
      display: flex;
      gap: 20rpx;
      align-items: stretch;
    }

    .record-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 15rpx;
      border-top: 2rpx solid #f5f5f5;
      padding-top: 15rpx;
    }

    .thumb-wrap {
      width: 130rpx;
      border-radius: 20rpx;
      flex-shrink: 0;
      overflow: hidden;
      padding: 5rpx;
      border: 2rpx solid #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .thumb {
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
    }

    .record-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      row-gap: 8rpx;

      .top-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .name {
          font-size: 30rpx;
          font-weight: 700;
          color: #0f172a;
          line-height: 40rpx;
          max-width: 60%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .points {
          color: #1890ff;
          font-size: 28rpx;
          font-weight: 700;
        }
      }

      .meta-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #67748a;
        font-size: 24rpx;

        .status {
          font-weight: 500;
          padding: 2rpx 12rpx;
          font-size: 22rpx;
          border-radius: 20rpx;
          color: #0f172a;
        }

        .pending {
          background: rgba(184, 184, 184, 0.12);
          color: #686868;
        }

        .wait {
          background: rgba(250, 173, 20, 0.12);
          color: #d48806;
        }

        .done {
          background: rgba(38, 166, 154, 0.12);
          color: #0d9488;
        }
      }
    }
  }
}
</style>
