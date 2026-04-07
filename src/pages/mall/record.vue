<template>
  <AppContainer>
    <div class="mall-record">
      <PageList :api="getGoodRecoedsRes">
        <template #item="{ data: record }">
          <div class="record-card">
            <image mode="aspectFill" class="thumb" :src="record.goods_image" />
            <div class="record-content">
              <div class="top-row">
                <div class="name">{{ record.goods_name }}</div>
                <div class="points">-{{ record.total_points }} 积分</div>
              </div>
              <div class="meta-row">
                <div>数量：{{ record.quantity }}</div>
              </div>
              <div class="meta-row">
                <div>兑换时间：{{ record.createtime }}</div>
                <div :class="['status', statusMap[record.status].key]">
                  {{ statusMap[record.status].label }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </PageList>
    </div>
  </AppContainer>
</template>

<script setup>
import { getGoodRecoedsRes } from '@/api'

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
    display: flex;
    gap: 20rpx;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #ffffff;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.06);

    .thumb {
      width: 120rpx;
      height: 120rpx;
      border-radius: 20rpx;
      flex-shrink: 0;
      object-fit: cover;
    }

    .record-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .top-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10rpx;

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
        margin-bottom: 12rpx;

        .status {
          font-weight: 600;
          padding: 4rpx 12rpx;
          border-radius: 20rpx;
          color: #0f172a;
        }

        .pending {
          background: rgba(24, 144, 255, 0.12);
          color: #096dd9;
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
