<template>
  <div v-if="data.length > 0">
    <div v-if="type == 1" class="wallet-wrap">
      <Item
        v-for="item in data"
        :key="item.id"
        :data="item"
        @refresh="emit('refresh')" />
    </div>

    <div v-else class="wallet-wrap">
      <Verification
        v-for="item in data"
        :key="item.id"
        :data="item"
        @refresh="emit('refresh')" />
    </div>
  </div>

  <Empty
    v-else
    :custom-class="[type == 2 ? `mt-[20vh]` : '']"
    :description="type == 1 ? '暂无数据' : '暂无待核销数据'" />
</template>

<script setup>
import Verification from './Verification.vue'
import Item from './Item.vue'
import Empty from '../Empty/index.vue'

defineProps({
  data: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: '1' // 1卡包 2核销
  }
})
const emit = defineEmits(['refresh'])
</script>

<style lang="scss" scoped>
.wallet-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
}
</style>
