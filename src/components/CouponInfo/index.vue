<template>
  <div :class="['coupon', couponClassname]">
    <div class="inner">
      <div class="value money w-[50%]" v-if="data.result == 1">
        <span>￥</span>
        <span>{{ moneyOrDiscount }}</span>
      </div>
      <div class="value discount" v-if="data.result == 0">
        <span>
          {{ moneyOrDiscount }}
        </span>
        <span>折</span>
      </div>
      <div class="description w-[50%]">
        <div>
          {{ data.name }}
        </div>
        <div class="divider"></div>
        <div>
          {{ data.result_name }}
        </div>
      </div>
    </div>
    <div class="mask" v-if="data.status == 2">
      <div class="mask-inner">
        <div>未开始</div>
        <div class="divider"></div>
        <div>开始时间：{{ data.begin_time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { COUPON_STATUS } from '../../constant'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const moneyOrDiscount = computed(
  () => JSON.parse(props.data.result_data)?.number
)
const couponClassname = computed(() => {
  if (props.data.is_get == 1) {
    return 'received'
  }
  return COUPON_STATUS[props.data.status]?.key
})
</script>

<style lang="scss" scoped>
.coupon {
  position: relative;
  width: 100%;
  height: 282rpx;
  background-image: url(../../static/images/coupon/available.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 20rpx;

  &.used {
    background-image: url(../../static/images/coupon/used.png);
  }

  &.expired {
    background-image: url(../../static/images/coupon/expired.png);
  }

  &.received {
    background-image: url(../../static/images/coupon/received.png);
  }

  &.used,
  &.expired {
    .value,
    .description {
      color: rgba(125, 125, 125, 1) !important;
    }

    .divider {
      background: rgba(125, 125, 125, 1) !important;
    }
  }

  &.notStarted {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 15px;
      background: linear-gradient(
        134.76deg,
        rgba(168, 150, 130, 0.65) 0.87%,
        rgba(115, 57, 22, 0.49) 49.14%,
        rgba(212, 114, 114, 0.68) 100%
      );
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: center;

      .mask-inner {
        display: flex;
        flex-direction: column;
        color: #fff;
        text-align: center;

        view:first-child {
          font-size: 32rpx;
          font-weight: 700;
        }

        view:last-child {
          font-size: 22rpx;
          font-weight: 500;
        }

        .divider {
          width: 320rpx;
          height: 2rpx;
          background: #fff;
          margin: 10rpx 0;
        }
      }
    }
  }

  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20rpx 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .value {
      font-size: 40rpx;
      font-weight: 600;
      color: rgba(242, 69, 68, 1);
      text-shadow: inset 0 2rpx 4rpx rgba(163, 28, 13, 1);
      display: flex;
      align-items: flex-end;

      &.money {
        label:last-child {
          font-size: 100rpx;
          font-weight: 700;
          line-height: 80rpx;
        }
      }
      &.discount {
        label:first-child {
          margin-right: 5rpx;
          font-size: 100rpx;
          font-weight: 700;
          line-height: 80rpx;
        }
      }
    }

    .description {
      display: flex;
      flex-direction: column;
      color: rgba(242, 69, 68, 1);
      text-align: center;
      min-width: 320rpx;
      transform: translateY(-10rpx);

      view:first-child {
        font-size: 40rpx;
        font-weight: 500;
      }

      view:last-child {
        font-size: 28rpx;
        font-weight: 400;
      }

      .divider {
        margin-top: 10rpx;
        margin-bottom: 10rpx;
        width: 100%;
        height: 2rpx;
        background: rgba(242, 69, 68, 1);
      }
    }
  }
}
</style>
