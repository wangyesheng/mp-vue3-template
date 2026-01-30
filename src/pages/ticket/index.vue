<template>
  <AppContainer>
    <div class="ticket">
      <PageList :api="getTicketsRes">
        <template #item="{ data }">
          <div
            class="ticket-item"
            @click="navTo(`/pages/ticket/details_old?id=${data.id}`, false)">
            <div class="inner">
              <image :src="data.image" mode="aspectFill" />
              <div class="info">
                <div class="info-left">
                  <div class="title">
                    {{ data.title }}
                  </div>
                  <div class="tag">
                    <nut-tag plain custom-color="#999">
                      {{ data.use_time_text }}
                    </nut-tag>
                    <nut-tag plain custom-color="#999">免预约</nut-tag>
                  </div>
                  <div class="price">
                    <span>¥ {{ data.price }}</span>
                    <nut-button type="primary" size="mini">购买</nut-button>
                  </div>
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
import { getTicketsRes } from '../../api'
import { navTo } from '../../utils/uni'
</script>

<style lang="scss" scoped>
.ticket {
  padding: 32rpx;
  box-sizing: border-box;
  position: relative;

  &-item {
    border-radius: 15rpx;
    // 如果不设置该属性，则会导致子元素的圆角效果无法显示（子元素添加背景色溢出导致圆角被遮盖）
    overflow: hidden;

    .inner {
      width: 100%;
      background: #fff;
      display: flex;
      align-items: center;

      image {
        width: 220rpx;
        height: auto;
        align-self: stretch; // 拉伸填充父元素高度
      }

      .info {
        flex: 1;
        color: #000;
        padding: 15rpx 20rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        &-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          row-gap: 10rpx;

          .title {
            font-weight: 500;
            font-size: 30rpx;
          }

          .tag {
            display: flex;
            flex-wrap: wrap;
            column-gap: 10rpx;
            row-gap: 10rpx;

            ::v-deep() {
              .nut-tag {
                width: fit-content !important;
              }
            }
          }

          .price {
            color: var(--hw-primary-color);
            font-weight: 550;
            font-size: 40rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
