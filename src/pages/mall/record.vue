<template>
  <AppContainer>
    <div class="mall-record">
      <div v-if="records.length" class="record-list">
        <div v-for="record in records" :key="record.id" class="record-card">
          <image :src="record.image" mode="aspectFill" class="thumb" />
          <div class="record-content">
            <div class="top-row">
              <div class="name">{{ record.name }}</div>
              <div class="points">-{{ record.points }} 积分</div>
            </div>
            <div class="meta-row">
              <div>数量：{{ record.quantity }}</div>
              <div>兑换单号：{{ record.orderNo }}</div>
            </div>
            <div class="meta-row">
              <div>兑换时间：{{ record.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <Empty v-else description="暂无兑换记录" custom-class="mt-[10vh]" />
    </div>
  </AppContainer>
</template>

<script setup>
const records = ref([
  {
    id: 1,
    image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
    name: '高级洗车毛巾套装',
    points: 500,
    quantity: 1,
    orderNo: 'EX202604060001',
    time: '2026-04-06 10:23',
    status: '已完成',
    statusClass: 'done'
  },
  {
    id: 2,
    image: 'https://img.yzcdn.cn/vant/apple-2.jpg',
    name: '内饰深层清洁剂',
    points: 1200,
    quantity: 1,
    orderNo: 'EX202604050024',
    time: '2026-04-05 17:42',
    status: '待发货',
    statusClass: 'pending'
  },
  {
    id: 3,
    image: 'https://img.yzcdn.cn/vant/apple-3.jpg',
    name: '车载香薰挂件',
    points: 1500,
    quantity: 1,
    orderNo: 'EX202604030008',
    time: '2026-04-03 13:05',
    status: '已发货',
    statusClass: 'shipped'
  }
])
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
      width: 180rpx;
      height: 180rpx;
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
        margin-bottom: 18rpx;

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

        .done {
          background: rgba(24, 144, 255, 0.12);
          color: #096dd9;
        }

        .pending {
          background: rgba(250, 173, 20, 0.12);
          color: #d48806;
        }

        .shipped {
          background: rgba(38, 166, 154, 0.12);
          color: #0d9488;
        }
      }
    }
  }
}
</style>
