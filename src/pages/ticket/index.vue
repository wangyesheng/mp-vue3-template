<template>
  <AppContainer>
    <div class="ticket">
      <div
        class="ticket-item"
        v-for="ticket in ticketInfo.data"
        :key="ticket.id"
        @click="navTo(`/pages/ticket/details?id=${ticket.id}`)">
        <div class="inner">
          <image :src="ticket.image" mode="aspectFill" />
          <div class="info">
            <div class="info-left">
              <div class="title">
                {{ ticket.title }}
              </div>
              <div class="tag">
                <nut-tag plain custom-color="#999">
                  {{ ticket.use_time_text }}
                </nut-tag>
                <nut-tag plain custom-color="#999">免预约</nut-tag>
              </div>
              <div class="price">
                <span>¥ {{ ticket.price }}</span>
                <nut-button type="primary" size="mini">购买</nut-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getTicketsRes } from '../../api'
import { ref } from 'vue'
import { navTo } from '../../utils/uni'

const ticketInfo = ref({
  loading: false,
  data: [],
  page: 1,
  end: false
})

async function getTickets(page) {
  if (page == 1) {
    ticketInfo.value.page = page
    ticketInfo.value.end = false
  }

  const { data, total } = await getTicketsRes({
    page: ticketInfo.value.page,
    limit: 10
  })
  ticketInfo.value.data =
    ticketInfo.value.page == 1 ? data : ticketInfo.value.data.concat(data)
  if (total === ticketInfo.value.data.length) {
    ticketInfo.value.end = true
  }
}
onLoad(() => {
  getTickets(1)
})

onReachBottom(() => {
  if (!ticketInfo.value.end) {
    ticketInfo.value.page++
    getTickets()
  }
})
</script>

<style lang="scss" scoped>
.ticket {
  padding: 32rpx;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;

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
