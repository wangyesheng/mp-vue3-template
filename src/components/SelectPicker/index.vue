<template>
  <div
    class="__selectWrap"
    hover-stay-time="150"
    :hover-class="needHoverClass ? 'activeHoverClass' : 'unactiveHoverClass'"
    :style="customStyle">
    <div class="control" @click="onPopupShow(true)">
      <span :style="{ color: titleObj.color }">{{ titleObj.label }}</span>
      <img
        class="w-[19rpx] h-[11rpx]"
        src="../../static/images/order/arrow.png"
        alt="" />
    </div>

    <nut-popup
      v-model:visible="popupVisible"
      position="bottom"
      safe-area-inset-bottom
      :close-on-click-overlay="false">
      <nut-picker
        v-model="selectedPickerValue"
        :columns="options"
        :title="title"
        @confirm="onConfirm"
        @cancel="onPopupShow(false)" />
    </nut-popup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { isNullOrUndef } from '../../utils/is'

const props = defineProps({
  customStyle: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    default: () => [],
    required: true
  },
  value: {
    type: [Array, String, Number, null],
    default: null
  },
  needHoverClass: {
    type: Boolean,
    default: true
  },
  clickable: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:value', 'confirm'])

const popupVisible = ref(false)
const selectedPickerValue = ref([])

// 同步 props.value 到 selectedPickerValue
watch(
  () => props.value,
  (newValue) => {
    if (isNullOrUndef(newValue)) {
      selectedPickerValue.value = []
    } else {
      selectedPickerValue.value = Array.isArray(newValue)
        ? newValue
        : [newValue]
    }
  },
  { immediate: true }
)

const titleObj = computed(() => {
  if (isNullOrUndef(props.value)) {
    return {
      label: props.title,
      color: '#7a7a7a'
    }
  }
  const values = Array.isArray(props.value) ? props.value : [props.value]
  return {
    label: props.options
      .filter((x) => values.includes(x.value))
      .map((x) => x.text)
      .join('、'),
    color: '#333'
  }
})

function onPopupShow(value) {
  if (!props.clickable) {
    return
  }
  popupVisible.value = value
}

function formatSelectedValue(selectedValue) {
  return selectedValue.length === 1 ? selectedValue[0] : selectedValue
}

function onConfirm({ selectedValue, selectedOptions }) {
  selectedPickerValue.value = selectedValue
  emits('update:value', formatSelectedValue(selectedValue))
  emits('confirm', { selectedValue, selectedOptions })
  popupVisible.value = false
}
</script>

<style lang="scss" scoped>
.__selectWrap {
  background: #ebebeb;
  height: 90rpx;
  line-height: 90rpx;
  padding-left: 40rpx;
  padding-right: 30rpx;
  color: #7a7a7a;
  font-size: 28rpx;
  border-radius: 10rpx;

  .control {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.activeHoverClass {
  background: #f5f5f5 !important;

  image {
    transform: rotate(180deg) !important;
  }
}

.unactiveHoverClass {
  background: transparent !important;

  image {
    transform: rotate(180deg) !important;
  }
}
</style>
