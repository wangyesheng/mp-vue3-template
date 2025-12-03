<template>
  <AppContainer>
    <div class="__wallet">
      <nut-tabs type="smile" v-model="selectedWalletType" auto-height>
        <nut-tab-pane title="单次卡" pane-key="1">
          <WalletList :data="wallets" type="2" @refresh="getWallets" />
        </nut-tab-pane>
        <nut-tab-pane title="多次卡" pane-key="2">
          <WalletList :data="wallets" type="2" @refresh="getWallets" />
        </nut-tab-pane>
        <nut-tab-pane title="年卡" pane-key="3">
          <WalletList :data="wallets" type="2" @refresh="getWallets" />
        </nut-tab-pane>
      </nut-tabs>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import WalletList from '@/components/WalletList/index'
import { onLoad } from '@dcloudio/uni-app'
import { getUserWalletsByScanRes } from '../../api'
import { ref, watch } from 'vue'

const wallets = ref([])
const selectedWalletType = ref('1')

let userCode

watch(() => selectedWalletType.value, getWallets)

async function getWallets() {
  wallets.value = []
  const { data } = await getUserWalletsByScanRes({
    page: 1,
    limit: 1000,
    type: selectedWalletType.value,
    code: userCode
  })
  wallets.value = data
}

onLoad((options) => {
  userCode = options.code ?? 'f43a8391e15d4e1b'
  getWallets()
})
</script>

<style lang="scss" scoped>
.__wallet {
  ::v-deep() {
    .nut-tabs {
      .nut-tabs__titles {
        background: transparent !important;
      }

      .nut-tab-pane {
        padding: 0 20rpx 50rpx !important;
        background: transparent !important;
      }
    }
  }
}
</style>
