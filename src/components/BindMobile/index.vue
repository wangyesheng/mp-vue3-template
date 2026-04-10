<template>
  <nut-popup
    round
    pop-class="bind-mobile-popup"
    :visible="props.visible"
    @close="() => emits('update:visible', !props.visible)">
    <div class="popup-wrap">
      <!-- 顶部图标 -->
      <div class="icon-wrap">
        <text class="icon">📱</text>
      </div>

      <!-- 标题 -->
      <div class="title">授权手机号</div>

      <!-- 描述 -->
      <div class="desc">
        为了更好地为您提供服务，需要获取您的手机号用于快捷登录
      </div>

      <!-- 授权按钮 -->
      <nut-button
        block
        type="primary"
        size="large"
        open-type="getPhoneNumber"
        custom-color="linear-gradient(135deg, #1890ff, #0d8aff);"
        @getphonenumber="props.getPhoneNumber">
        <span class="btn-text">一键获取手机号</span>
      </nut-button>

      <!-- 取消 -->
      <div class="cancel" @click="emits('update:visible', !props.visible)">
        暂不授权
      </div>
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
