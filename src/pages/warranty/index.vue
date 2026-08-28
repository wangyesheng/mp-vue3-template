<template>
  <AppContainer>
    <view class="warranty-page">
      <!-- 顶部状态栏与背景区域 -->
      <view class="header-banner">
        <!-- 质保状态信息 -->
        <view class="header-inner" :style="{ paddingTop: bgTop + 'px' }">
          <view class="status-wrap">
            <view class="status-inner">
              <text class="status-title">
                {{ orderInfo.is_warranty == 1 ? '质保生效中' : '质保单生成中' }}
              </text>
              <text class="status-subtitle">品质保障 | 安全无忧</text>
            </view>

            <!-- 右侧半透明防伪大盾牌背景水印 -->
            <view class="watermark-shield">
              <image
                src="../../static/images/effective-bg1.png"
                class="w-full h-full"
                mode="aspectFill" />
            </view>
          </view>
        </view>
      </view>

      <!-- 卡片主体内容区域（负边距向上微压） -->
      <view class="cards-container">
        <!-- 1. 车辆信息卡片 -->
        <view class="info-card">
          <view class="card-header">
            <text class="card-title">车辆信息</text>
          </view>

          <view class="card-body">
            <!-- 车型 -->
            <view class="info-row">
              <view class="row-label-group">
                <text class="label-text">车型</text>
              </view>
              <text class="value-text font-dark">
                {{ orderInfo.vehicle_type }}
              </text>
            </view>

            <!-- 车牌号 (高亮蓝色) -->
            <view class="info-row">
              <view class="row-label-group">
                <text class="label-text">车牌号</text>
              </view>
              <text class="value-text font-dark">
                {{ orderInfo.plate_number || '-' }}
              </text>
            </view>

            <!-- 车架号 -->
            <view class="info-row">
              <view class="row-label-group">
                <text class="label-text">车架号</text>
              </view>
              <text class="value-text font-dark vin-text">
                {{ orderInfo.frame_number || '-' }}
              </text>
            </view>
          </view>
        </view>

        <!-- 2. 产品信息卡片 -->
        <view class="info-card">
          <view class="card-header">
            <text class="card-title">产品信息</text>
          </view>

          <view class="card-body">
            <!-- 产品名称 -->
            <view class="info-row">
              <view class="row-label-group">
                <text class="label-text">产品名称</text>
              </view>
              <text class="value-text font-dark">
                {{ orderInfo.product_name }}
              </text>
            </view>

            <!-- 产品详情（时间轴/分项列表） -->
            <view class="info-row align-start">
              <view class="row-label-group pt-4">
                <text class="label-text">产品详情</text>
              </view>

              <!-- 右侧部位详情时间轴 -->
              <view class="timeline-list">
                <view
                  v-for="(item, index) in orderInfo.sn_number"
                  :key="index"
                  class="timeline-item"
                  :class="{
                    'has-line': index < orderInfo.sn_number.length - 1
                  }">
                  <!-- 部位信息内容 -->
                  <view class="timeline-content">
                    <view v-if="item.part_name" class="position-tag">
                      {{ item.part_name }}
                    </view>
                    <view class="detail-line">
                      <text class="detail-label">型号：</text>
                      <text class="detail-value">{{ item.part_marque }}</text>
                    </view>
                    <view class="detail-line">
                      <text class="detail-label">SN：</text>
                      <text class="detail-value">{{ item.part_sn }}</text>
                    </view>

                    <view class="detail-line">
                      <text class="detail-label">质保有效期：</text>
                      <text class="detail-value !text-[#1890ff] !font-bold">
                        {{ item.warranty_years }} 年
                      </text>
                    </view>
                    <view class="detail-line">
                      <text class="detail-label"></text>
                      <text
                        class="detail-value !text-[#1890ff] !font-bold !text-[24rpx]">
                        {{ item.warranty_start_time }} 至
                        {{ item.warranty_end_time }}
                      </text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <div v-if="completeCarPhotos.length" class="info-card">
          <view class="card-header">
            <text class="card-title">完工图片</text>
          </view>
          <div class="card-body">
            <div class="photo-grid">
              <div
                v-for="(photo, index) in completeCarPhotos"
                :key="index"
                class="photo-item"
                @click="previewImage(index, completeCarPhotos)">
                <image mode="aspectFill" :src="photo" />
                <div class="photo-mask">
                  <text class="mask-text">点击查看</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </view>
      <div
        class="fixed left-[20rpx]"
        :style="{ top: iconTop + 'px' }"
        @click="back">
        <nut-icon name="rect-left" custom-color="#fff" size="20" />
      </div>
    </view>
  </AppContainer>
</template>

<script setup>
import { getOrderDetailRes } from '@/api'
import { previewImage } from '@/utils/uni'

const menuButtonInfo = (() => {
  try {
    return uni.getMenuButtonBoundingClientRect()
  } catch {
    return { height: 0, top: 20 }
  }
})()
const bgTop = menuButtonInfo.height + menuButtonInfo.top + 10
// menuButtonInfo.top 胶囊距离顶部得距离
// menuButtonInfo.height / 2 胶囊自身高度的一半
// 10 图标自身高度的一半
const iconTop = menuButtonInfo.top + menuButtonInfo.height / 2 - 10

const orderInfo = ref({}),
  completeCarPhotos = computed(() => {
    const {
      end_front_photos,
      end_side_photos = [],
      end_back_photos
    } = orderInfo.value
    return [end_front_photos, ...end_side_photos, end_back_photos].filter(
      (p) => p
    )
  })

onLoad(async ({ id }) => {
  const data = await getOrderDetailRes(id)
  orderInfo.value = data
})

const back = () => uni.navigateBack()
</script>

<style lang="scss" scoped>
/* 顶部渐变背景横幅 */
.header-banner {
  position: relative;
  height: 500rpx;
  background: linear-gradient(145deg, #0243b8 0%, #1976d2 45%, #1890ff 100%);
  overflow: hidden;
  padding: 0 40rpx;
  box-sizing: border-box;

  .header-inner {
    position: absolute;
    z-index: 10;
    left: 40rpx;
    right: 40rpx;
  }
}

/* 质保核心状态文字区 */
.status-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .status-inner {
    display: flex;
    flex-direction: column;

    .shield-badge {
      width: 76rpx;
      height: 76rpx;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8rpx 20rpx rgba(0, 40, 130, 0.3);
      margin-bottom: 24rpx;
      animation: shield-glow 2.4s ease-in-out infinite;

      .shield-inner {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .check-icon {
          color: #ffffff;
          font-size: 34rpx;
          font-weight: bold;
        }
      }
    }

    .status-title {
      font-size: 50rpx;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 1rpx;
      line-height: 1.2;
      margin-bottom: 12rpx;
    }

    .status-subtitle {
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.85);
      letter-spacing: 2rpx;
    }
  }

  /* 右上侧防伪半透明盾牌水印 */
  .watermark-shield {
    pointer-events: none;
    opacity: 0.38;
    width: 256rpx;
    height: 256rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* 卡片容器 */
.cards-container {
  position: relative;
  z-index: 20;
  margin-top: -46rpx;
  padding: 0 28rpx;
}

/* 通用白色圆角卡片 */
.info-card {
  background: #ffffff;
  border-radius: 28rpx;
  padding: 34rpx 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 10rpx 30rpx rgba(18, 43, 94, 0.05);

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
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 8rpx;

        .mask-text {
          font-size: 20rpx;
          color: rgba(255, 255, 255, 0.9);
        }
      }
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 28rpx;

    .header-icon-box {
      width: 54rpx;
      height: 54rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 18rpx;

      &.bg-blue {
        background: linear-gradient(135deg, #2b7afb 0%, #175fe6 100%);
      }

      .header-icon {
        color: #ffffff;
        font-size: 30rpx;
      }
    }

    .card-title {
      font-size: 32rpx;
      font-weight: 700;
      color: #1a202c;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
  }
}

/* 单行信息布局 */
.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.align-start {
    align-items: flex-start;
  }

  .row-label-group {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    &.pt-4 {
      padding-top: 4rpx;
    }

    .row-icon {
      font-size: 34rpx;
      color: #64748b;
      margin-right: 18rpx;
    }

    .label-text {
      font-size: 28rpx;
      color: #475569;
    }
  }

  .value-text {
    font-size: 28rpx;
    text-align: right;
    word-break: break-all;

    &.font-dark {
      color: #1e293b;
      font-weight: 500;
    }
  }
}

/* 产品详情纵向时间轴列表 */
.timeline-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 36rpx;
  row-gap: 16rpx;

  .timeline-item {
    position: relative;

    &:not(:last-child) {
      padding-bottom: 16rpx;
      border-bottom: 1rpx solid #f0f0f0;
    }

    .timeline-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .position-tag {
        background-color: #1890ff;
        border-radius: 8rpx;
        padding: 4rpx 16rpx;
        color: #ffffff;
        font-size: 22rpx;
        font-weight: 600;
        margin-bottom: 12rpx;
      }

      .detail-line {
        display: flex;
        font-size: 25rpx;
        line-height: 1.6;
        color: #475569;

        .detail-label {
          color: #64748b;
        }

        .detail-value {
          color: #1e293b;
          font-weight: 500;
        }
      }
    }
  }
}

/* 质保信息行 */
.warranty-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .row-label-group {
    display: flex;
    align-items: center;

    .row-icon {
      font-size: 36rpx;
      color: #64748b;
      margin-right: 18rpx;
    }

    .label-text {
      font-size: 28rpx;
      color: #475569;
    }
  }

  .warranty-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .duration-row {
      display: flex;
      align-items: baseline;
      margin-bottom: 6rpx;

      .duration-label {
        font-size: 24rpx;
        color: #64748b;
        margin-right: 8rpx;
      }

      .duration-highlight {
        font-size: 26rpx;
        color: #1d4ed8;
        font-weight: 600;
      }
    }

    .date-range {
      font-size: 23rpx;
      color: #1890ff;
      letter-spacing: -0.2rpx;
    }
  }
}
</style>
