<template>
  <AppContainer>
    <div class="__warranty">
      <div class="header">
        <div class="header-content">
          <div class="shield">
            <div class="shield-icon">
              <text class="icon-text">✓</text>
            </div>
          </div>
          <div class="status-text">质保生效中</div>
          <div class="warranty-period">
            <text class="period-label">质保有效期</text>
            <text class="period-value">
              {{ warrantyInfo.warranty_start }} 至
              {{ warrantyInfo.warranty_end }}
            </text>
          </div>
        </div>
      </div>

      <div class="card vehicle-card">
        <div class="card-header">
          <div class="card-icon vehicle-icon">
            <text>🚗</text>
          </div>
          <span class="card-title">车辆信息</span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span class="info-label">车型</span>
            <span class="info-value">{{ warrantyInfo.vehicle_model }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">车牌号</span>
            <span class="info-value plate">
              {{ warrantyInfo.plate_number }}
            </span>
          </div>
          <div class="info-row no-border">
            <span class="info-label">车架号</span>
            <span class="info-value mono">{{ warrantyInfo.vin }}</span>
          </div>
        </div>
      </div>

      <div class="card product-card">
        <div class="card-header">
          <div class="card-icon product-icon">
            <text>📋</text>
          </div>
          <span class="card-title">产品与施工</span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span class="info-label">产品型号</span>
            <span class="info-value">{{ warrantyInfo.product_name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">SN批次号</span>
            <span class="info-value mono">{{ warrantyInfo.sn_code }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">施工时间</span>
            <span class="info-value">{{ warrantyInfo.construction_time }}</span>
          </div>
          <div class="info-row no-border">
            <span class="info-label">施工门店</span>
            <span class="info-value">{{ warrantyInfo.store_name }}</span>
          </div>
        </div>
      </div>

      <div class="card photo-card">
        <div class="card-header">
          <div class="card-icon photo-icon">
            <text>📷</text>
          </div>
          <span class="card-title">完工图片</span>
          <span class="photo-count">共{{ warrantyInfo.photos.length }}张</span>
        </div>
        <div class="card-body">
          <div class="photo-grid">
            <div
              v-for="(photo, index) in warrantyInfo.photos"
              :key="index"
              class="photo-item"
              @tap="previewPhoto(index)">
              <image :src="photo" mode="aspectFill" />
              <div class="photo-mask">
                <text class="mask-text">点击查看</text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-tips">
        <text>如有疑问请联系施工门店或客服</text>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
const warrantyInfo = ref({
  vehicle_model: '特斯拉 Model Y 2024款',
  plate_number: '京A·88888',
  vin: 'LRWYGCEK5NC123456',
  product_name: '车衣/CY001',
  sn_code: '20260313-1',
  construction_time: '2026-03-13 14:00',
  store_name: '北京朝阳旗舰店',
  warranty_start: '2026-03-13',
  warranty_end: '2031-03-13',
  photos: [
    'https://img.zcool.cn/community/01a0a75c3c05c5a801213f26a5dfaa.jpg',
    'https://img.zcool.cn/community/01a0a75c3c05c5a801213f26a5dfaa.jpg',
    'https://img.zcool.cn/community/01a0a75c3c05c5a801213f26a5dfaa.jpg',
    'https://img.zcool.cn/community/01a0a75c3c05c5a801213f26a5dfaa.jpg'
  ]
})

function previewPhoto(index) {
  uni.previewImage({
    current: index,
    urls: warrantyInfo.value.photos
  })
}
</script>

<style lang="scss" scoped>
.__warranty {
  .header {
    width: 100%;
    height: 500rpx;
    overflow: hidden;
    background: linear-gradient(135deg, #1890ff 0%, #40a9ff 50%, #096dd9 100%);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 40rpx;

    .header-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .shield {
        width: 120rpx;
        height: 120rpx;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20rpx;

        .shield-icon {
          width: 84rpx;
          height: 84rpx;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .icon-text {
            font-size: 48rpx;
            color: #1890ff;
            font-weight: bold;
          }
        }
      }

      .status-text {
        font-size: 36rpx;
        font-weight: 700;
        color: #fff;
        letter-spacing: 4rpx;
        margin-bottom: 24rpx;
      }

      .warranty-period {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 40rpx;
        padding: 16rpx 40rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6rpx;
        backdrop-filter: blur(10px);

        .period-label {
          font-size: 22rpx;
          color: rgba(255, 255, 255, 0.8);
        }

        .period-value {
          font-size: 26rpx;
          color: #fff;
          font-weight: 500;
        }
      }
    }
  }

  .card {
    margin: 24rpx;
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 24rpx rgba(24, 144, 255, 0.06);

    .card-header {
      display: flex;
      align-items: center;
      padding: 28rpx 32rpx 0;

      .card-icon {
        width: 52rpx;
        height: 52rpx;
        border-radius: 14rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16rpx;
        font-size: 28rpx;

        &.vehicle-icon {
          background: rgba(24, 144, 255, 0.1);
        }

        &.product-icon {
          background: rgba(59, 130, 246, 0.1);
        }

        &.photo-icon {
          background: rgba(245, 158, 11, 0.1);
        }
      }

      .card-title {
        font-size: 30rpx;
        font-weight: 600;
        color: #1a1a2e;
        flex: 1;
      }

      .photo-count {
        font-size: 24rpx;
        color: #999;
      }
    }

    .card-body {
      padding: 20rpx 32rpx 8rpx;

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 22rpx 0;
        border-bottom: 1rpx solid #f2f3f5;

        &.no-border {
          border-bottom: none;
        }

        .info-label {
          font-size: 27rpx;
          color: #8c8c8c;
          flex-shrink: 0;
        }

        .info-value {
          font-size: 27rpx;
          color: #1a1a2e;
          font-weight: 500;
          text-align: right;
          flex: 1;
          margin-left: 32rpx;

          &.plate {
            color: #1890ff;
            font-weight: 600;
            font-size: 30rpx;
          }

          &.mono {
            font-family: 'Courier New', monospace;
            letter-spacing: 2rpx;
            font-size: 25rpx;
          }
        }
      }

      .photo-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 16rpx;
        padding-bottom: 24rpx;

        .photo-item {
          width: calc((100% - 32rpx) / 3);
          height: 200rpx;
          border-radius: 12rpx;
          overflow: hidden;
          position: relative;

          image {
            width: 100%;
            height: 100%;
          }

          .photo-mask {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 56rpx;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.4));
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding-bottom: 8rpx;

            .mask-text {
              font-size: 20rpx;
              color: rgba(255, 255, 255, 0.9);
            }
          }
        }
      }
    }
  }

  .footer-tips {
    text-align: center;
    padding: 20rpx 0 0;

    text {
      font-size: 24rpx;
      color: #bbb;
    }
  }
}
</style>
