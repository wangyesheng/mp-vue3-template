<template>
  <AppContainer>
    <div class="__wallet">
      <div class="info">
        <div class="user">
          <div class="header">
            <image class="avatar" :src="appUser.avatar" mode="aspectFill" />
            <div>
              <div class="name">
                <span>{{ appUser.nickname }}</span>
                <image
                  src="../../static/images/me/edit.png"
                  mode="aspectFill"
                  @click="navTo('/pages/me/personal')" />
              </div>
              <div class="vip">儿童会员</div>
            </div>
          </div>
          <div class="address">
            <img src="../../static/images/home/map.png" alt="" />
            <span>{{ appName }}</span>
          </div>
        </div>
      </div>

      <nut-tabs v-model="selectedWalletType" type="smile" auto-height>
        <nut-tab-pane title="单次卡" pane-key="1">
          <PageList
            :api="getWalletInfoRes"
            :active="selectedWalletType == 1"
            :params="{ type: 1 }">
            <template #item="{ data }">
              <WalletItem :data="data" />
            </template>
          </PageList>
        </nut-tab-pane>
        <nut-tab-pane title="多次卡" pane-key="2">
          <PageList
            :api="getWalletInfoRes"
            :active="selectedWalletType == 2"
            :params="{ type: 2 }">
            <template #item="{ data }">
              <WalletItem
                :data="data"
                @show-baby-popup-visible="showBabyPopupVisible(data)" />
            </template>
          </PageList>
        </nut-tab-pane>
        <nut-tab-pane title="年卡" pane-key="3">
          <PageList
            :api="getWalletInfoRes"
            :active="selectedWalletType == 3"
            :params="{ type: 3 }">
            <template #item="{ data }">
              <WalletItem
                :data="data"
                @show-baby-popup-visible="showBabyPopupVisible(data)" />
            </template>
          </PageList>
        </nut-tab-pane>
        <nut-tab-pane title="实物礼品" pane-key="4">
          <PageList :api="getMyGiftsRes" :active="selectedWalletType == 4">
            <template #item="{ data }">
              <WalletItem :data="data" />
            </template>
          </PageList>
        </nut-tab-pane>
      </nut-tabs>
      <BabyPopupInfo ref="babyPopupRef" />
    </div>
  </AppContainer>
</template>

<script setup>
import { getMyGiftsRes, getWalletInfoRes } from '../../api'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'
import { navTo } from '@/utils/uni'

const { appUser, appName } = storeToRefs(useAppStore())
const selectedWalletType = ref('1'),
  babyPopupRef = ref()

function showBabyPopupVisible(data) {
  babyPopupRef.value.show(data)
}
</script>

<style lang="scss" scoped>
.__wallet {
  ::v-deep() {
    .nut-tabs {
      .nut-tabs__titles {
        background: transparent !important;
      }

      .nut-tab-pane {
        padding: 10rpx 34rpx 50rpx !important;
        background: transparent !important;
      }
    }
  }

  & > .info {
    width: 100%;
    height: 500rpx;
    background: #8153fe;
    position: relative;

    .user {
      width: 100%;
      height: 426rpx;
      background-image: url(https://hwly.tuomuit.com/wechat/img/wallet-bg.png?ts=2);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding: 50rpx 60rpx 60rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      left: 0;
      bottom: -10rpx;

      .header {
        display: flex;
        align-items: center;
        column-gap: 20rpx;

        .avatar {
          width: 150rpx;
          height: 150rpx;
          border-radius: 50%;
        }

        .name {
          display: flex;
          align-items: center;

          label {
            font-weight: 550;
            font-size: 40rpx;
            color: #000;
            margin-right: 48rpx;
          }
          image {
            width: 44rpx;
            height: 44rpx;
          }
        }

        .vip {
          margin-top: 22rpx;
          width: 152rpx;
          height: 44rpx;
          line-height: 44rpx;
          background: var(--hw-primary-color);
          border-radius: 8rpx;
          color: #fff;
          font-size: 28rpx;
          text-align: center;
        }
      }

      .address {
        align-self: flex-end;
        font-weight: 400;
        font-size: 28rpx;
        color: #000000;
        display: flex;
        align-items: center;

        image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 16rpx;
        }
      }
    }
  }
}
</style>
