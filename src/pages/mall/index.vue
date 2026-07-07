<template>
  <AppContainer>
    <div class="mall">
      <div
        class="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1890ff] to-blue-600 py-4 px-6 text-white mb-4">
        <div class="relative flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 p-1 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <image
                class="w-full h-full rounded-md"
                mode="aspectFill"
                :src="appUser.avatar" />
            </div>
            <div>
              <h2 class="text-base font-bold">{{ appUser.nickname }}</h2>
              <div class="flex items-center gap-1 text-blue-100 text-sm">
                {{ appUser.mobile }}
              </div>
            </div>
          </div>
        </div>

        <div class="relative flex items-end justify-between">
          <div>
            <p class="text-blue-100 text-sm mb-1">当前可用积分</p>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-black tracking-tighter">
                {{ appUser.score }}
              </span>
              <span class="text-lg font-medium text-blue-100">积分</span>
            </div>
          </div>
          <button
            class="!mx-0 bg-white text-blue-600 px-4 py-2 rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/20 flex items-center gap-2"
            @click="navTo('/pages/mall/record')">
            兑换记录
            <span class="i-mdi-arrow-right"></span>
          </button>
        </div>
      </div>
      <!-- 兑换须知 -->
      <div class="notice-section">
        <div class="notice-title">
          <text class="i-mdi-information-circle-outline mr-1"></text>
          兑换须知：
        </div>
        <div class="notice-list">
          <div class="notice-item">
            兑换成功后，积分将自动扣除；商品将在3-5个工作日内发货；请确保收货信息准确无误
          </div>
        </div>
      </div>

      <PageList :api="getGoodsRes" :limit="20" :cols="2">
        <template #item="{ data }">
          <div class="item">
            <image mode="aspectFill" :src="data.image" />
            <div class="inner">
              <span class="title">{{ data.name }}</span>
              <div class="action">
                <div class="price">
                  <span>{{ data.points }}</span>
                  <span>积分</span>
                </div>
                <nut-button
                  type="primary"
                  size="small"
                  @click="onShowExchangePopup(data)">
                  兑换
                </nut-button>
              </div>
            </div>
          </div>
        </template>
      </PageList>
    </div>

    <nut-popup
      round
      safe-area-inset-bottom
      position="bottom"
      :visible="exchangePopupVisible"
      @update:visible="exchangePopupVisible = $event">
      <div class="popupWrap">
        <div class="__title flex justify-between items-center px-[20rpx]">
          <span>选择收货信息</span>
          <span
            v-if="exchangePopup.receiptList.length"
            class="text-xs text-[#1890ff]"
            @click="navTo('/pages/mall/user-address')">
            去新增
          </span>
        </div>
        <div class="popup-inner exchange">
          <div v-if="exchangePopup.receiptList.length" class="receipt-list">
            <div
              v-for="item in exchangePopup.receiptList"
              :key="item.id"
              class="receipt-card"
              :class="{
                'is-active': item.id === exchangePopup.selectedReceiptId
              }"
              @click="onSelectReceipt(item)">
              <div class="receipt-card__left">
                <div class="receipt-card__head">
                  <div class="receipt-card__meta">
                    <div class="receipt-card__name">{{ item.name }}</div>
                    <div class="receipt-card__mobile">{{ item.mobile }}</div>
                  </div>

                  <div class="flex items-center gap-x-1">
                    <span
                      class="i-mdi-square-edit-outline text-[#333] text-base"
                      @click.stop="onAction(1, item)" />
                    <span
                      class="i-mdi-trash-can-outline text-[#333] text-base"
                      @click.stop="onAction(2, item)" />
                  </div>
                </div>
                <div class="receipt-card__addr">
                  {{ item.address }}
                </div>
              </div>

              <div class="receipt-card__right">
                <div
                  class="receipt-card__right__check i-mdi-check-circle"
                  :class="{
                    'is-active': item.id === exchangePopup.selectedReceiptId
                  }" />
              </div>
            </div>
          </div>
          <div v-else>
            <Empty description="暂无收货信息"></Empty>
            <div class="flex justify-center">
              <nut-button
                plain
                type="primary"
                size="mini"
                @click="navTo('/pages/mall/user-address')">
                去新增
              </nut-button>
            </div>
          </div>

          <nut-button
            v-if="exchangePopup.receiptList.length"
            block
            size="large"
            type="primary"
            :disabled="!exchangePopup.selectedReceiptId || !currentGoods?.id"
            @click="onExchangeSubmit(currentGoods)">
            确认兑换
          </nut-button>
        </div>
      </div>
    </nut-popup>
  </AppContainer>
</template>

<script setup>
import { useAppStore } from '../../stores/app'
import { navTo, toast } from '../../utils/uni'
import {
  deleteReceiptInfoRes,
  exchangeGoodRes,
  getGoodsRes,
  getReceiptListRes
} from '@/api'

const appStore = useAppStore()
const { appUser } = storeToRefs(appStore)
const currentGoods = ref({})
const exchangePopupVisible = ref(false)
const exchangePopup = ref({
  receiptList: [],
  selectedReceiptId: null
})

function onShowExchangePopup(value) {
  currentGoods.value = value
  exchangePopupVisible.value = true
}

function onSelectReceipt(item) {
  exchangePopup.value.selectedReceiptId = item.id
}

function onAction(type, data) {
  if (type == 2) {
    uni.showModal({
      title: '提示',
      content: '确认要删除该收货地址吗？',
      async complete({ confirm }) {
        if (confirm) {
          await deleteReceiptInfoRes(data.id)
          getReceiptList()
        }
      }
    })
  } else {
    navTo(`/pages/mall/user-address?id=${data.id}`)
  }
}

function onExchangeSubmit(good) {
  if (!exchangePopup.value.selectedReceiptId) {
    toast('请选择收货地址')
    return
  }
  uni.showModal({
    title: '提示',
    content: '确定要兑换该商品吗？',
    async success({ confirm }) {
      if (confirm) {
        await exchangeGoodRes({
          goods_id: good.id,
          address_id: exchangePopup.value.selectedReceiptId
        })
        appStore.refreshAppUser()
        toast('兑换成功！')
        exchangePopupVisible.value = false
      }
    }
  })
}

async function getReceiptList() {
  const data = await getReceiptListRes()
  exchangePopup.value.receiptList = data
}

onLoad(getReceiptList)

onShow(() => {
  if (appStore.checkNeedRefresh()) {
    getReceiptList()
  }
})
</script>

<style lang="scss" scoped>
.exchange {
  padding: 20rpx;

  .receipt-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    margin-bottom: 30rpx;
  }

  .receipt-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx 20rpx;
    border: 2rpx solid #eef2f7;
    box-shadow: 0 8rpx 26rpx rgba(15, 23, 42, 0.05);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;

    &.is-active {
      border-color: #1890ff;
      transform: translateY(-2rpx);
    }

    &__left {
      width: 90%;
    }

    &__right {
      &__check {
        flex-shrink: 0;
        font-size: 36rpx;
        color: rgba(148, 163, 184, 0.9);
        margin-top: 2rpx;

        &.is-active {
          color: #1890ff;
        }
      }
    }

    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16rpx;
      margin-bottom: 10rpx;
    }

    &__meta {
      min-width: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 12rpx;
    }

    &__name {
      font-size: 28rpx;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: 0.5rpx;
    }

    &__mobile {
      font-size: 26rpx;
      color: #475569;
    }

    &__addr {
      font-size: 24rpx;
      color: #64748b;
      line-height: 1.55;
      word-break: break-all;
    }
  }
}

.mall {
  padding: 30rpx;

  .score {
    background: rgba(174, 215, 253, 0.1);
    border: 2rpx solid #1890ff;
    border-radius: 15rpx;
    padding: 20rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        border: 2rpx solid #fff;
        margin-bottom: 5rpx;
      }

      label {
        font-weight: 550;
        color: #333;
        font-size: 28rpx;
      }
    }

    .right {
      align-self: flex-end;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      font-weight: 550;
      color: #333;

      label:first-child {
        font-size: 60rpx;
      }

      label:last-child {
        font-size: 28rpx;
      }
    }
  }

  .item {
    width: 100%;
    min-height: 400rpx;
    background: #fff;
    display: flex;
    flex-direction: column;
    row-gap: 10rpx;
    border-radius: 20rpx;
    overflow: hidden;
    padding: 15rpx;
    box-sizing: border-box;

    image {
      width: 100%;
      height: 200rpx;
    }

    .inner {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: 28rpx;
        color: #333;
      }

      .action {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          display: flex;
          column-gap: 5rpx;
          color: var(--uvt-primary-color);

          label:first-child {
            font-weight: 550;
            font-size: 36rpx;
          }

          label:last-child {
            font-size: 24rpx;
            align-self: flex-start;
          }
        }
      }
    }
  }
  // 兑换须知
  .notice-section {
    border-radius: 24rpx;
    margin-bottom: 30rpx;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 15rpx 20rpx;

    .notice-title {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 10rpx;
      color: var(--uvt-primary-color);
    }

    .notice-list {
      .notice-item {
        font-size: 24rpx;
        color: #6b7280;
      }
    }
  }
}
</style>
