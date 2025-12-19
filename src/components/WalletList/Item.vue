<template>
  <div
    :class="[
      'wallet-item',
      data.status > 1 ? 'forbiden' : '',
      data.status == 2 ? 'verification' : '',
      data.status == 4 ? 'expired' : ''
    ]">
    <!-- 门票类型 积分兑换的礼品走的是新接口没有order_type，所以这里默认为2 -->
    <div :class="['orderType', 'type' + (data.order_type ?? 2)]">
      {{ data.order_type == 1 ? '门票购买' : '积分兑换' }}
    </div>
    <div class="inner">
      <image :src="data.image" mode="aspectFill" />
      <div class="info">
        <div class="info-left">
          <div class="title">
            {{ data.title }}
          </div>
          <!-- 实物礼品 -->
          <div v-if="data.mall_id" class="text-[#999] text-[26rpx]">
            {{ data.content }}
          </div>
          <!-- 门票 -->
          <div v-else class="tag">
            <nut-tag plain custom-color="#999">
              {{ data.use_time_text }}
            </nut-tag>
            <nut-tag plain custom-color="#999">免预约</nut-tag>
          </div>

          <div
            v-if="data.baby_info.length"
            class="flex items-center text-[24rpx] text-[#999]"
            @click="() => emit('showBabyPopupVisible')">
            <span>宝贝信息：</span>
            <span>{{ data.baby_info.length }}个</span>
            <nut-icon name="rect-right" custom-color="#999" size="12" />
          </div>

          <div class="date">
            {{
              data.mall_id
                ? `兑换日期：${data.createtime}`
                : `失效日期：${data.end_time}`
            }}
          </div>
        </div>
        <div v-if="data.status == 1" class="info-right">
          <span>{{ data.residue_quantity }}</span>
          <span>剩余/{{ data.type == 3 ? '天' : '次' }}</span>
        </div>
      </div>
    </div>
    <div class="footer" @click="switchTab('/pages/scan/index')">去使用</div>
  </div>
</template>

<script setup>
import { switchTab } from '../../utils/uni'

defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['showBabyPopupVisible'])
</script>

<style lang="scss" scoped>
.wallet-item {
  border-radius: 15rpx;
  // 如果不设置该属性，则会导致子元素的圆角效果无法显示（子元素添加背景色溢出导致圆角被遮盖）
  overflow: hidden;
  position: relative;

  .orderType {
    position: absolute;
    top: 0;
    right: 0;
    width: 130rpx;
    height: 45rpx;
    border-top-right-radius: 15rpx;
    border-bottom-left-radius: 15rpx;
    line-height: 45rpx;
    text-align: center;
    font-size: 24rpx;
    font-weight: 550;

    &.type1 {
      background: rgba(129, 83, 254, 0.1);
      color: #8153fe;
    }

    &.type2 {
      background: rgba(220, 35, 149, 0.1);
      color: #dc2395;
    }
  }

  &.forbiden {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.5);
      pointer-events: all; /* 遮罩阻止点击穿透 */
      z-index: 1000;
    }

    &::after {
      content: '';
      position: absolute;
      top: 40rpx;
      right: 10rpx;
      width: 128rpx;
      height: 128rpx;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index: 1001;
    }
  }

  &.forbiden.verification::after {
    background-image: url(https://hwly.tuomuit.com/wechat/img/verification.png);
  }

  &.forbiden.expired::after {
    background-image: url(https://hwly.tuomuit.com/wechat/img/expired.png);
  }

  .inner {
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;

    image {
      width: 200rpx;
      height: auto;
      align-self: stretch; // 拉伸填充父元素高度
    }

    .info {
      flex: 1;
      color: #000;
      padding: 20rpx 10rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      &-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        row-gap: 15rpx;

        .title {
          font-weight: 550;
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

        .date {
          font-size: 24rpx;
          color: #999;
        }
      }

      &-right {
        width: 26%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        font-weight: 550;
        color: #000;

        label:first-child {
          font-size: 55rpx;
        }

        label:last-child {
          font-size: 30rpx;
        }
      }
    }
  }

  .footer {
    width: 100%;
    padding: 8rpx 0;
    background: #8153fe;
    text-align: center;

    font-weight: 400;
    font-size: 32rpx;
    color: #fff;
  }
}
</style>
