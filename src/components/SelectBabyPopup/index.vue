<template>
  <nut-popup
    v-model:visible="babyPopupVisible"
    round
    position="bottom"
    safe-area-inset-bottom>
    <div class="popupWrap">
      <div class="__title flex justify-between items-center px-[40rpx]">
        <span>绑定宝贝（最多可选{{ orderInfo.bind_number }}个）</span>
        <span
          class="text-[28rpx] font-[550] text-[var(--hw-primary-color)]"
          @click="navTo(`/pages/baby/form?code=${code}`)">
          添加宝贝
        </span>
      </div>
      <div v-if="babyList.length" class="popup-inner baby">
        <div class="baby-content">
          <div
            v-for="item in babyList"
            :key="item.id"
            :style="{ width: '49%' }"
            @click="onSelectBaby(item)">
            <BabyInfo :data="item" :selected="checkBabySelected(item)" />
          </div>
        </div>
        <div class="action">
          <nut-button size="large" type="primary" @click="onSelectBabyConfirm">
            确认绑定
          </nut-button>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col justify-center items-center gap-y-[30rpx] py-[60rpx]">
        <image
          class="w-[120rpx] h-[170rpx]"
          src="https://hwly.tuomuit.com/wechat/img/empty.png"
          mode="aspectFill" />
        <span class="text-[#666] text-[28rpx] font-[500]">
          暂未添加宝贝信息
        </span>
      </div>
    </div>
  </nut-popup>
</template>

<script setup>
import deepClone from '@/utils/deepClone'
import { toast, navTo } from '../../utils/uni'
import { bindBabyInOrderRes } from '@/api'

const props = defineProps({
  babyList: {
    type: Array,
    default: () => []
  },
  code: {
    type: String,
    default: ''
  },
  refresh: {
    type: Function,
    default: () => {}
  }
})

const babyPopupVisible = ref(false),
  selectedBabyList = ref([]),
  orderInfo = ref({})

function onSelectBaby(item) {
  if (selectedBabyList.value.find((x) => x.id == item.id)) {
    // 反选
    selectedBabyList.value = selectedBabyList.value.filter(
      (x) => x.id != item.id
    )
  } else {
    if (orderInfo.value.bind_number == 1) {
      selectedBabyList.value = []
      selectedBabyList.value.push(item)
    } else {
      if (selectedBabyList.value.length < orderInfo.value.bind_number) {
        selectedBabyList.value.push(item)
      } else {
        toast(`最多可选${orderInfo.value.bind_number}个宝贝`)
      }
    }
  }
}

function checkBabySelected(item) {
  return selectedBabyList.value.findIndex((x) => x.id == item.id) != -1
}

function onSelectBabyConfirm() {
  if (!selectedBabyList.value.length) return toast('请先选择宝贝！')
  uni.showModal({
    title: '提示',
    content: `确定为该门票绑定选中的宝贝信息吗？${
      props.code ? '' : '一旦绑定不可更改、不可赠予！'
    }`,
    async success({ confirm }) {
      if (confirm) {
        try {
          uni.showLoading({
            title: '宝贝绑定中',
            mask: true
          })
          await bindBabyInOrderRes({
            order_sn: orderInfo.value.order_sn,
            user_baby_ids: selectedBabyList.value.map((x) => x.id).join()
          })
          await props.refresh?.('refresh')
        } finally {
          uni.hideLoading()
          babyPopupVisible.value = false
        }
      }
    }
  })
}

defineExpose({
  async show(data) {
    orderInfo.value = data
    selectedBabyList.value = deepClone(data?.baby_info ?? [])
    babyPopupVisible.value = true
  }
})
</script>

<style lang="scss" scoped></style>
