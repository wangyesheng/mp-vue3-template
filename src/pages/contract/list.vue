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
        <div class="relative h-[60vh]" v-if="item.loading">
          <Loading position="absolute" showText />
        </div>
        <div v-else>
          <div v-if="partyAContracts.length > 0">
            <div
              v-for="item in partyAContracts"
              :key="item.id"
              class="mb-[20rpx] bg-[#fff] px-[20rpx] py-[30rpx] text-[26rpx] text-[#666] rounded-[10rpx]"
              @click="navTo(`/pages/contract/index?id=${item.id}`)">
              <div class="mb-[10rpx] flex justify-between items-center">
                <span>合同编号</span>
                <span class="text-right text-[#333]">
                  {{ item.sign_code }}
                </span>
              </div>
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
import { onLoad } from '@dcloudio/uni-app'
import { getPartyAContractsRes } from '../../api'
import { navTo } from '../../utils/uni'
import { ref } from 'vue'

const partyAContracts = ref([]),
  selectedContractStatus = ref(0)

function onUpdateContractStatus(status) {
  selectedContractStatus.value = status
  getContracts()
}

async function getContracts() {
  const { data: contracts } = await getPartyAContractsRes({
    page: 1,
    limit: 10,
    status: selectedContractStatus.value
  })
  partyAContracts.value = contracts
}
onLoad(({ status }) => {
  onUpdateContractStatus(status)
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
    }
  }
}
</style>
