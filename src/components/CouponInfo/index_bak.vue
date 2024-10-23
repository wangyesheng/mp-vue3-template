<template>
  <div class="coupon">
    <div class="inner">
      <div class="value money" v-if="data.result == 1">
        <span>￥</span>
        <span>{{ moneyOrDiscount }}</span>
      </div>
      <div class="value discount" v-if="data.result == 0">
        <span>
          {{ moneyOrDiscount }}
        </span>
        <span>折</span>
      </div>
      <div class="description">
        <div>
          {{ data.name }}
        </div>
        <div class="divider"></div>
        <div>
          {{ data.result_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const moneyOrDiscount = computed(
  () => JSON.parse(props.data.result_data)?.number
)
</script>

<style lang="scss" scoped>
.coupon {
  width: 100%;
  height: 280rpx;
  border-radius: 30rpx;
  box-sizing: border-box;
  padding: 20rpx;
  margin-bottom: 30rpx;
  background: linear-gradient(
    90deg,
    rgba(255, 168, 61, 1) 0%,
    rgba(242, 68, 68, 1) 100%
  );
  position: relative;

  &::before {
    content: '';
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background: rgba(255, 168, 61, 1);
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 10;
  }

  &::after {
    content: '';
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background: rgba(242, 68, 68, 1);
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 10;
  }

  .sign {
    position: absolute;
    top: 6rpx;
    right: 22rpx;
    width: 128rpx;
    height: 128rpx;
  }

  .inner {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
    background: linear-gradient(
      90deg,
      rgba(255, 239, 214, 1) 0%,
      rgba(255, 248, 237, 1) 57%,
      rgba(236, 214, 188, 1) 100%
    );
    position: relative;
    box-sizing: border-box;
    padding-left: 20rpx;
    padding-right: 20rpx;
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
          font-size: 80rpx;
          font-weight: 700;
          line-height: 80rpx;
        }
      }
      &.discount {
        label:first-child {
          margin-right: 5rpx;
          font-size: 80rpx;
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
      transform: translateY(8rpx);

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

    // &::before {
    //   display: block;
    //   content: '优惠券';
    //   width: 86rpx;
    //   height: 81rpx;
    //   background: linear-gradient(
    //     131.55deg,
    //     rgba(232, 51, 51, 1) 0%,
    //     rgba(252, 126, 63, 1) 100%
    //   );
    //   font-size: 24rpx;
    //   color: #fff;
    //   text-align: center;
    // }
  }
}
</style>
