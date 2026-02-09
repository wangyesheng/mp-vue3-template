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
            ref="pageListRef1"
            :api="getWalletInfoRes"
            :active="selectedWalletType == 1"
            :params="{ type: 1 }">
            <template #item="{ data }">
              <WalletItem
                :data="data"
                @show-baby-popup-visible="showBabyPopupVisible(data)"
                @show-select-baby-popup-visible="
                  showSelectBabyPopupVisible(data)
                " />
            </template>
          </PageList>
        </nut-tab-pane>
        <nut-tab-pane title="多次卡" pane-key="2">
          <PageList
            ref="pageListRef2"
            :api="getWalletInfoRes"
            :active="selectedWalletType == 2"
            :params="{ type: 2 }">
            <template #item="{ data }">
              <WalletItem
                :data="data"
                @show-baby-popup-visible="showBabyPopupVisible(data)"
                @show-select-baby-popup-visible="
                  showSelectBabyPopupVisible(data)
                " />
            </template>
          </PageList>
        </nut-tab-pane>
        <nut-tab-pane title="年卡" pane-key="3">
          <PageList
            ref="pageListRef3"
            :api="getWalletInfoRes"
            :active="selectedWalletType == 3"
            :params="{ type: 3 }">
            <template #item="{ data }">
              <WalletItem
                :data="data"
                @show-baby-popup-visible="showBabyPopupVisible(data)"
                @show-select-baby-popup-visible="
                  showSelectBabyPopupVisible(data)
                " />
            </template>
          </PageList>
        </nut-tab-pane>
        <nut-tab-pane title="实物礼品" pane-key="4">
          <PageList :api="getMyGiftsRes" :active="selectedWalletType == 4">
            <template #item="{ data }">
              <WalletItem :data="data" @share="onShareClick" />
            </template>
          </PageList>
        </nut-tab-pane>
      </nut-tabs>
      <BabyPopupInfo ref="babyPopupRef" />
      <SelectBabyPopup
        ref="selectBabyPopupRef"
        :baby-list="babyList"
        @refresh="refreshOrderInfo" />
    </div>
  </AppContainer>
</template>

<script setup>
import { getBabyListRes, getMyGiftsRes, getWalletInfoRes } from '../../api'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'
import { navTo } from '@/utils/uni'

const env = import.meta.env

const { appUser, appName } = storeToRefs(useAppStore())
const selectedWalletType = ref('1'),
  babyPopupRef = ref(),
  selectBabyPopupRef = ref(),
  babyList = ref([]),
  pageListRef3 = ref(),
  pageListRef2 = ref(),
  pageListRef1 = ref()

const sharedOrderInfo = ref(null)

function showBabyPopupVisible(data) {
  babyPopupRef.value.show(data)
}

function showSelectBabyPopupVisible(data) {
  selectBabyPopupRef.value.show(data)
}

function getSharePayload(data) {
  const orderSn = data?.order_sn
  return {
    title: `我在好稳乐园给你买了一张票，快来领取吧！`,
    path: orderSn
      ? `/pages/home/index?order_sn=${orderSn}`
      : '/pages/home/index',
    imageUrl: `${env.VITE_BASE_API}/wechat/img/share.jpg`
  }
}

async function beforeShareCheck(data) {
  // 这里放“分享前拦截”的规则；后续如需接后端校验，可在此处加接口请求
  if (!data?.order_sn) return { ok: false, message: '缺少订单号，无法赠予' }

  // status: 1 可用；2 核销中/已核销；4 已过期（UI 上也有对应状态）
  if (data?.status === 2) return { ok: false, message: '该卡已核销，不能赠予' }
  if (data?.status === 4) return { ok: false, message: '该卡已过期，不能赠予' }
  if (typeof data?.status === 'number' && data.status > 1)
    return { ok: false, message: '该卡当前状态不可赠予' }

  return { ok: true }
}

async function onShareClick(data) {
  const { ok, message } = await beforeShareCheck(data)
  if (!ok) {
    uni.showToast({ title: message || '暂不可赠予', icon: 'none' })
    return
  }

  sharedOrderInfo.value = data
  const payload = getSharePayload(data)

  // 拦截成功后，再主动拉起分享面板
  // #ifdef MP-WEIXIN
  wx.shareAppMessage(payload)
  // #endif
  // #ifndef MP-WEIXIN
  uni.showToast({ title: '仅支持小程序内分享', icon: 'none' })
  // #endif
}

function refreshOrderInfo() {
  if (selectedWalletType.value == 1) {
    pageListRef1.value.refresh()
  } else if (selectedWalletType.value == 2) {
    pageListRef2.value.refresh()
  } else if (selectedWalletType.value == 3) {
    pageListRef3.value.refresh()
  }
}

onShareAppMessage(() => {
  // 右上角菜单分享（非按钮触发）仍走这里
  return getSharePayload(sharedOrderInfo.value)
})

onShow(async () => {
  babyList.value = await getBabyListRes()
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
