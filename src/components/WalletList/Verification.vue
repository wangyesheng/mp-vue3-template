<template>
  <div :class="['wallet-item']">
    <div
      :class="[
        'orderType',
        'type' + (data.is_give == 1 ? 3 : data.order_type ?? 2)
      ]">
      {{
        data.is_give == 1
          ? '赠送票'
          : data.order_type == 1
            ? '购买票'
            : '积分票'
      }}
    </div>
    <div class="inner">
      <image :src="data.image" mode="aspectFill" />
      <div class="info">
        <div class="info-left">
          <div class="title">
            {{ data.title }}
          </div>
          <!-- 实物礼品 -->
          <div v-if="data.mall_id" class="text-[#555] text-[24rpx]">
            {{ data.content }}
          </div>
          <!-- 门票 -->
          <div v-if="!data.mall_id" class="row">
            <span class="label">
              剩余 / {{ data.type == 3 ? '天' : '次' }}：
            </span>
            <span class="value">{{ data.residue_quantity }}</span>
          </div>

          <div
            v-if="data.baby_info.length"
            class="flex items-center text-[24rpx] text-[#555] font-[500]"
            @click="() => emit('showBabyPopupVisible')">
            <span>宝贝信息：</span>
            <span>{{ data.baby_info.length }}个</span>
            <nut-icon name="rect-right" custom-color="#555" size="12" />
          </div>

          <div v-if="!data.mall_id" class="row">
            <span class="label">适用日期：</span>
            <span class="value">
              {{ data.use_time_text }}
            </span>
          </div>

          <div class="row">
            <span class="label">
              {{ data.mall_id ? '兑换日期：' : '失效日期：' }}
            </span>
            <span class="value">
              {{ data.mall_id ? data.createtime : data.end_time }}
            </span>
          </div>
        </div>
        <div class="info-right">
          <nut-button type="primary" size="small" @click="onVerify">
            核销
          </nut-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { verifyGiftRes, verifyRes } from '../../api'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['refresh', 'showBabyPopupVisible'])

function onVerify() {
  uni.showModal({
    title: '提示',
    content: '核销前请仔细确认卡票信息！',
    confirmText: '确认无误',
    success: async ({ confirm }) => {
      if (confirm) {
        await (props.data.mall_id
          ? verifyGiftRes(props.data.id)
          : verifyRes(props.data.id))
        emit('refresh')
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.wallet-item {
  border-radius: 15rpx;
  // 如果不设置该属性，则会导致子元素的圆角效果无法显示（子元素添加背景色溢出导致圆角被遮盖）
  overflow: hidden;
  position: relative;

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
      padding: 20rpx 10rpx 20rpx 20rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      &-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        row-gap: 8rpx;

        .title {
          font-weight: 550;
          font-size: 30rpx;
        }

        .row {
          display: flex;
          align-items: center;
          font-size: 24rpx;
          color: #555;
          font-weight: 500;
        }
      }

      &-right {
        width: 24%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10%;
      }
    }
  }

  .footer {
    width: 100%;
    padding: 8rpx 0;
    background: var(--hw-primary-color);
    text-align: center;
    font-weight: 400;
    font-size: 32rpx;
    color: #fff;
  }
}
</style>
