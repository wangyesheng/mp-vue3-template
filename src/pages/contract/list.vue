<template>
  <AppContainer>
    <nut-tabs
      title-scroll
      background="#fff"
      :ellipsis="false"
      :title-gutter="10"
      :modelValue="selectedContractStatus"
      @update:modelValue="onUpdateContractStatus">
      <nut-tab-pane
        v-for="item in contractStatusFullList"
        :key="item.value"
        :title="item.label"
        :pane-key="item.value">
        <div
          class="relative h-[60vh]"
          v-if="loadingMap[selectedContractStatus]">
          <Loading position="absolute" showText />
        </div>
        <div v-else>
          <div v-if="contracts.length > 0">
            <div
              v-for="item in contracts"
              :key="item.id"
              class="mb-[20rpx] bg-[#fff] px-[20rpx] py-[30rpx] text-[26rpx] text-[#666] rounded-[10rpx]">
              <div
                class="flex justify-between items-center text-[24rpx] border-b-[2rpx] border-solid border-[#f5f5f5] pb-[16rpx]"
                @click="copy(item.sign_code)">
                <span class="text-[#333]">合同号：{{ item.sign_code }}</span>
                <span>复制</span>
              </div>

              <div
                class="mt-[16rpx]"
                @click="navTo(`/pages/contract/index?id=${item.id}`)">
                <div class="mb-[10rpx] flex justify-between items-center">
                  <span>合同名称</span>
                  <span class="text-right text-[#333]">
                    {{ item.template_name }}
                  </span>
                </div>
                <div class="mb-[10rpx] flex justify-between items-center">
                  <span>甲方姓名</span>
                  <span class="text-right text-[#333]">
                    {{ item.first_party }}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span>乙方姓名</span>
                  <span class="text-right text-[#333]">
                    {{ item.second_party || '-' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="h-[60vh]" v-else>
            <nut-empty image="empty" description="暂无数据">
              <template #image>
                <img src="../../static/images/no-data.png" />
              </template>
            </nut-empty>
          </div>
        </div>
      </nut-tab-pane>
    </nut-tabs>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { contractStatusFullList } from '../../constant'
import Loading from '@/components/Loading/index'
import { onLoad, onReachBottom, onShow } from '@dcloudio/uni-app'
import { getPartyAContractsRes } from '../../api'
import { copy, navTo } from '../../utils/uni'
import { ref } from 'vue'

const selectedContractStatus = ref(0),
  contracts = ref([]),
  loadingMap = ref(
    contractStatusFullList.reduce((memo, current) => {
      memo[current.value] = false
      return memo
    }, {})
  )

function onUpdateContractStatus(status) {
  selectedContractStatus.value = status
  getContracts(1)
}

let page = 1,
  isEnd = false
async function getContracts(currentPage) {
  try {
    if (currentPage == 1) {
      page = currentPage
      isEnd = false
    }
    if (page == 1) {
      loadingMap.value[selectedContractStatus.value] = true
    }
    const { data, total } = await getPartyAContractsRes({
      page,
      limit: 10,
      status: selectedContractStatus.value
    })
    contracts.value = page == 1 ? data : contracts.value.concat(data)
    if (total === contracts.value.length) {
      isEnd = true
    }
  } finally {
    loadingMap.value[selectedContractStatus.value] = false
  }
}

onReachBottom(() => {
  if (!isEnd) {
    page++
    getContracts()
  }
})

onLoad(({ status }) => {
  selectedContractStatus.value = status
})

onShow(() => {
  getContracts(1)
})
</script>

<style lang="scss" scoped>
::v-deep() {
  .nut-tabs {
    .nut-tabs__titles-item {
      width: auto !important;
    }

    .nut-tab-pane {
      background: #f7f9fc !important;
      padding: 30rpx !important;
      min-height: calc(100vh - 100rpx);
    }
  }
}
</style>
