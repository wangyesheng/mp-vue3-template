<template>
  <AppContainer>
    <nut-cell-group v-if="logs.length > 0">
      <nut-cell
        v-for="item in logs"
        :key="item.id"
        :title="item.memo"
        :sub-title="item.createtime">
        <template #desc>
          <span class="font-[550]" :style="{ color: item.color }">
            {{ item.label }}
          </span>
        </template>
      </nut-cell>
    </nut-cell-group>
    <div v-else class="h-screen">
      <nut-empty image="empty" description="暂无数据">
        <template #image>
          <img src="../../static/images/no-data.png" alt="" />
        </template>
      </nut-empty>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getMoneyLogsRes } from '../../api'

let page = 1,
  isEnd = false
const logs = ref([])
async function getMoneyLogs() {
  let { data, total } = await getMoneyLogsRes({
    page,
    limit: 20
  })
  data = data.map((x) => {
    // 正
    const isPositive = parseFloat(x.before) < parseFloat(x.after)
    const total = (parseFloat(x.money) + parseFloat(x.gift_money)).toFixed(2)
    return {
      ...x,
      label: `${isPositive ? '+' : '-'}${total}`,
      color: isPositive ? '#f1680d' : '#333'
    }
  })
  logs.value = page === 1 ? data : logs.value.concat(data)
  if (total === logs.value.length) {
    isEnd = true
  }
}

onReachBottom(() => {
  if (!isEnd) {
    page++
    getMoneyLogs()
  }
})

onLoad(() => {
  getMoneyLogs()
})
</script>

<style lang="scss" scoped>
::v-deep() {
  .nut-cell-group__wrap {
    margin: 0 !important;
    padding-bottom: 40rpx;
  }
}
</style>
