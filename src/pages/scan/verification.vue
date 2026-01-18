<template>
  <AppContainer>
    <div class="__wallet">
      <nut-tabs v-model="selectedWalletType" type="smile" auto-height>
        <nut-tab-pane title="单次卡" pane-key="1">
          <PageList
            ref="pageListRef1"
            :api="getUserWalletsByScanRes"
            :params="{
              type: 1,
              code: userCode
            }"
            :active="selectedWalletType == 1 && Boolean(userCode)">
            <template #item="{ data }">
              <WalletVerification :data="data" @refresh="onRefresh" />
            </template>
          </PageList>
        </nut-tab-pane>
        <nut-tab-pane title="多次卡" pane-key="2">
          <PageList
            ref="pageListRef2"
            :api="getUserWalletsByScanRes"
            :params="{
              type: 2,
              code: userCode
            }"
            :active="selectedWalletType == 2 && Boolean(userCode)">
            <template #item="{ data }">
              <WalletVerification
                :data="data"
                @refresh="onRefresh"
                @show-baby-popup-visible="showBabyPopupVisible(data)" />
            </template>
          </PageList>
        </nut-tab-pane>
        <nut-tab-pane title="年卡" pane-key="3">
          <PageList
            ref="pageListRef3"
            :api="getUserWalletsByScanRes"
            :params="{
              type: 3,
              code: userCode
            }"
            :active="selectedWalletType == 3 && Boolean(userCode)">
            <template #item="{ data }">
              <WalletVerification
                :data="data"
                @refresh="onRefresh"
                @show-baby-popup-visible="showBabyPopupVisible(data)" />
            </template>
          </PageList>
        </nut-tab-pane>
        <nut-tab-pane title="实物礼品" pane-key="4">
          <PageList
            ref="pageListRef4"
            :api="getUserWalletsByScanRes"
            :active="selectedWalletType == 4 && Boolean(userCode)"
            :params="{
              type: 4,
              code: userCode
            }">
            <template #item="{ data }">
              <WalletVerification :data="data" @refresh="onRefresh" />
            </template>
          </PageList>
        </nut-tab-pane>
      </nut-tabs>
      <BabyPopupInfo ref="babyPopupRef" />
      <div class="footer">
        <div class="inner">
          <nut-button
            block
            size="large"
            type="primary"
            @click="navTo(`/pages/baby/form?code=${userCode}`)">
            为该客户添加宝贝
          </nut-button>
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import { navTo } from '@/utils/uni'
import { getUserWalletsByScanRes } from '../../api'

const selectedWalletType = ref('1'),
  userCode = ref(''),
  pageListRef1 = ref(),
  pageListRef2 = ref(),
  pageListRef3 = ref(),
  pageListRef4 = ref(),
  babyPopupRef = ref()

function showBabyPopupVisible(data) {
  babyPopupRef.value.show(data)
}

onLoad((options) => {
  userCode.value = options.code
})

function onRefresh() {
  const instance =
    selectedWalletType.value == 1
      ? pageListRef1
      : selectedWalletType.value == 2
        ? pageListRef2
        : selectedWalletType.value == 3
          ? pageListRef3
          : pageListRef4

  instance.value.refresh()
}
</script>

<style lang="scss" scoped>
.__wallet {
  padding-bottom: 10vh;

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

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    box-shadow: 0rpx -2rpx 2rpx #f5f5f5;
    padding-bottom: calc(env(safe-area-inset-bottom) + 10rpx);
    padding-top: 30rpx;

    .inner {
      width: 100%;
      height: 100%;
      padding: 0 50rpx;
      box-sizing: border-box;
    }
  }
}
</style>
