<template>
  <div
    :class="[
      'wallet-item',
      data.status > 1 ? 'forbiden' : '',
      data.status == 2 ? 'verification' : '',
      data.status == 4 ? 'expired' : '',
      data.status == 5 ? 'received' : ''
    ]">
    <!-- 门票类型 积分兑换的实物礼品走的是新接口没有order_type，所以这里默认为2 -->
    <div :class="['orderType', 'type' + (data.is_give == 1 ? 3 : orderType)]">
      {{ data.is_give == 1 ? '赠送票' : orderType == 1 ? '购买票' : '积分票' }}
    </div>

    <div class="inner">
      <image :src="data.image" mode="aspectFill" />
      <div class="info flex justify-between">
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
            v-if="data.baby_info?.length"
            class="text-[24rpx] text-[#999] flex items-center"
            @click="() => emit('showBabyPopupVisible')">
            <span>宝贝信息：</span>
            <BabyStackingInfo :baby-list="data.baby_info" />
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

    <div
      v-if="
        !onlyShowBindBabyAction &&
        // 实物礼品没有 order_type 字段，也不用绑定宝贝，所以直接去使用就行
        !props.data.order_type
      "
      class="footer"
      @click="switchTab('/pages/scan/index')">
      去使用
    </div>

    <div
      v-else
      class="flex justify-end items-center gap-x-[15rpx] p-[15rpx] mt-[10rpx] border-t-[2rpx] border-solid border-[#f5f5f5]">
      <nut-button
        v-if="data?.baby_info.length === 0 && data.bind_number > 0"
        plain
        type="primary"
        size="mini"
        @click="emit('showSelectBabyPopupVisible')">
        绑定宝贝
      </nut-button>

      <nut-button
        v-if="
          // 只有自己买的票可以赠送，积分兑换或者别人赠送的票不可以
          !onlyShowBindBabyAction &&
          orderType == 1 &&
          data.is_give != 1 &&
          (data?.baby_info.length === 0 || data.bind_number == 0)
        "
        plain
        type="primary"
        size="mini"
        open-type="share"
        @click="emit('share')">
        赠送
      </nut-button>

      <nut-button
        v-if="
          !onlyShowBindBabyAction &&
          // 已绑定了宝贝
          (data?.baby_info.length ||
            // 无需绑定宝贝
            data.bind_number == 0)
        "
        type="primary"
        size="mini"
        @click="switchTab('/pages/scan/index')">
        去使用
      </nut-button>
    </div>
  </div>
</template>

<script setup>
import { switchTab } from '../../utils/uni'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  onlyShowBindBabyAction: {
    type: Boolean,
    default: false
  }
})

const orderType = computed(() => props.data.order_type ?? 2)

const emit = defineEmits([
  'showBabyPopupVisible',
  'showSelectBabyPopupVisible',
  'share'
])
</script>

<style lang="scss" scoped>
.wallet-item {
  border-radius: 15rpx;
  // 如果不设置该属性，则会导致子元素的圆角效果无法显示（子元素添加背景色溢出导致圆角被遮盖）
  overflow: hidden;
  position: relative;
  background: #fff;

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
      top: 60rpx;
      right: 10rpx;
      width: 106.66rpx;
      height: 106.66rpx;
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

  &.forbiden.received::after {
    background-image: url(https://hwly.tuomuit.com/wechat/img/received.png?ts=123);
  }

  .inner {
    width: 100%;
    display: flex;
    align-items: center;

    image {
      width: 200rpx;
      height: auto;
      align-self: stretch; // 拉伸填充父元素高度
      border-bottom-right-radius: 15rpx;
    }

    .info {
      flex: 1;
      color: #000;
      padding: 20rpx 10rpx 10rpx;
      box-sizing: border-box;

      &-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        row-gap: 12rpx;

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
    padding: 10rpx 0;
    background: #8153fe;
    text-align: center;
    font-weight: 550;
    font-size: 28rpx;
    color: #fff;
  }
}
</style>
