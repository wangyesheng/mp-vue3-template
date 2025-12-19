<template>
  <div :class="['coupon']" @click="onClick">
    <div :class="['inner', selected ? 'selected' : '']">
      <div class="left">
        <span class="price">{{ data.amount_text }}</span>
        <span v-if="data.type == 2" class="tips">
          最高可减{{ data.max_discount }}元
        </span>
      </div>
      <div class="right">
        <span class="type">{{ data.type_text }}</span>
        <span class="name">{{ data.name }}</span>
        <div @click.stop>
          <slot name="action" :data="data"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
function onClick() {
  emit('click', props.data)
}
</script>

<style lang="scss" scoped>
.coupon {
  position: relative;
  width: 100%;

  .inner {
    background: #fff;
    display: flex;
    padding: 20rpx 0;
    border: 2rpx solid var(--hw-primary-color);
    box-sizing: border-box;
    border-radius: 10rpx;

    &.selected::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 48rpx;
      height: 48rpx;
      background-image: url(https://hwly.tuomuit.com/wechat/img/selected.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }

  &.history::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);
  }

  .left {
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10rpx;
    border-right: 2rpx dashed var(--hw-primary-color);

    .price {
      font-size: 38rpx;
      font-weight: 550;
      color: var(--hw-primary-color);
    }

    .tips {
      font-size: 24rpx;
      color: var(--hw-primary-color);
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;

    .type {
      font-size: 30rpx;
      font-weight: 500;
      color: var(--hw-primary-color);
    }

    .name {
      font-size: 26rpx;
      font-weight: 400;
      color: var(--hw-primary-color);
    }
  }
}
</style>
