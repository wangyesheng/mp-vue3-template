<template>
  <div
    class="__selectWrap"
    :hover-class="needHoverClass ? 'activeHoverClass' : 'unactiveHoverClass'"
    hover-stay-time="150"
    :style="customStyle">
    <div class="control" @click="popupVisible = true">
      <span>{{ titleValue }}</span>
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
        @cancel="popupVisible = false"></nut-picker>
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
  }
})

const emits = defineEmits(['update:value', 'confirm'])

const popupVisible = ref(false),
  selectedPickerValue = ref([])
const titleValue = computed(() => {
  if (isNullOrUndef(props.value)) {
    selectedPickerValue.value = []
    return props.title
  }
  const values = Array.isArray(props.value) ? props.value : [props.value]
  selectedPickerValue.value = values
  return props.options
    .filter((x) => values.includes(x.value))
    .map((x) => x.text)
    .join('、')
})

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
