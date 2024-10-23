<template>
  <nut-popup
    round
    pop-class="__bindMobilePopup"
    :visible="props.visible"
    @close="() => emits('update:visible', !props.visible)">
    <div>
      <div class="title">提示：</div>
      <div class="tips">为更好的向您提供服务，申请获取您的手机号！</div>

      <nut-button
        block
        type="primary"
        open-type="getPhoneNumber"
        @getphonenumber="props.getPhoneNumber">
        <img src="../../static/images/home/icon-wechat.png" alt="" />
        <span>获取手机号</span>
      </nut-button>
    </div>
  </nut-popup>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  getPhoneNumber: {
    type: [Function, null],
    default: null
  }
})
const emits = defineEmits(['update:visible'])
</script>

<style lang="scss" scoped></style>
