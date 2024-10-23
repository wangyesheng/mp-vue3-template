<style lang="scss" scoped>
.__order {
  ::v-deep() {
    .nut-tab-pane {
      padding: 0 !important;
      background: #f7f9fc !important;
    }

    .nut-cell {
      box-shadow: none !important;
      padding: 20rpx 10rpx !important;
      background: transparent !important;
    }

    .payPopupWrap {
      button {
        margin-top: 30rpx;
      }
    }

    .couponPopupWrap {
      .coupon-layer {
        border: 2rpx solid #fff;
        width: 100%;
        height: 200rpx;
        box-sizing: border-box;
        padding: 0 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 20rpx;
        background: #fff;
        margin-bottom: 20rpx;
        position: relative;
        &.selected {
          border-color: #f24544;
          &::after {
            display: block;
            content: '';
            width: 64rpx;
            height: 64rpx;
            border-bottom-right-radius: 20rpx;
            background-image: url(../../static/images/bottom-selected.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            right: -2rpx;
            bottom: -2rpx;
          }
        }
      }
    }

    .payMethodPopupWrap {
      .pay-inner {
        display: flex;
        flex-direction: column;

        .pay-inner-layer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 30rpx 20rpx;

          &.wechat {
            border-bottom: 2rpx solid #eee;
            image {
              width: 67.5rpx;
              height: 64rpx;
              margin-right: 20rpx;
            }
          }

          &.wallet {
            image {
              width: 67.5rpx;
              height: 67.5rpx;
              margin-right: 20rpx;
            }
          }

          .left {
            display: flex;
            align-items: center;

            label {
              font-size: 28rpx;
              font-weight: 550;
            }
          }
        }
      }
    }
  }

  .__subTabs {
    ::v-deep() {
      .nut-tab-pane {
        box-sizing: border-box;
        padding: 30rpx !important;
        min-height: calc(100vh - 380rpx);
      }

      .nut-tabs__list {
        border-bottom: 2rpx solid #f5f5f5;
      }

      .nut-tabs__titles-item__line {
        bottom: 0 !important;
      }

      .nut-empty__box {
        width: 195rpx;
        height: 128rpx;
      }

      .nut-empty__description {
        margin-top: 30rpx;
      }
    }
  }
}
</style>

<template>
  <AppContainer>
    <div class="relative min-h-screen overflow-auto bg-[#fff] __order">
      <div
        class="ml-[32rpx] mb-[40rpx] font-bold"
        :style="{
          marginTop: `${headerTop}rpx`
        }">
        订单
      </div>

      <nut-tabs background="#fff" :modelValue="activeOrderType">
        <template #titles>
          <div
            class="flex justify-between w-full box-border px-[30rpx] py-[20rpx]"
            @click="onClickOrderType">
            <div
              id="1"
              class="w-[300rpx] h-[64rpx] leading-[64rpx] text-center bg-[#D6D6D6] text-[#363636] text-[24rpx] rounded-[20rpx]"
              :style="getActiveStyle('1')">
              代驾
            </div>
            <div
              id="2"
              class="w-[300rpx] h-[64rpx] leading-[64rpx] text-center bg-[#D6D6D6] text-[#363636] text-[24rpx] rounded-[20rpx]"
              :style="getActiveStyle('2')">
              物流
            </div>
          </div>
        </template>
        <nut-tab-pane pane-key="1">
          <div class="__subTabs">
            <nut-tabs
              title-scroll
              background="#fff"
              :modelValue="subOrderActiveKey"
              @update:modelValue="
                (value) => appStore.setSubOrderActiveKey(value)
              ">
              <nut-tab-pane
                v-for="item in subTabPannels"
                :key="item.key"
                :title="item.title"
                :pane-key="item.key">
                <div class="relative h-[60vh]" v-if="item.loading">
                  <Loading position="absolute" showText />
                </div>
                <div v-else>
                  <div v-if="orders.length > 0">
                    <OrderInfo
                      v-for="order in orders"
                      :key="order.id"
                      :data="order"
                      @refresh="getOrders(1)"
                      @callPayPopup="onCallPayPopup" />
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
          </div>
        </nut-tab-pane>
        <nut-tab-pane pane-key="2">
          <div class="__subTabs">
            <nut-tabs
              title-scroll
              background="#fff"
              :modelValue="subOrderActiveKey"
              @update:modelValue="
                (value) => appStore.setSubOrderActiveKey(value)
              ">
              <nut-tab-pane
                v-for="item in subTabPannels"
                :key="item.key"
                :title="item.title"
                :pane-key="item.key">
                <div class="relative h-[60vh]" v-if="item.loading">
                  <Loading position="absolute" showText />
                </div>
                <div v-else>
                  <div v-if="orders.length > 0">
                    <OrderInfo
                      v-for="order in orders"
                      :key="order.id"
                      :data="order"
                      @refresh="getOrders(1)"
                      @callPayPopup="onCallPayPopup" />
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
          </div>
        </nut-tab-pane>
      </nut-tabs>

      <nut-popup
        round
        position="bottom"
        safe-area-inset-bottom
        :custom-style="{
          boxSizing: 'border-box',
          padding: '40rpx 40rpx 60rpx',
          background: '#F7F9FC'
        }"
        v-model:visible="payPopupVisible">
        <div class="payPopupWrap">
          <div class="__title">订单明细</div>

          <nut-cell title="订单总额：">
            <template #desc>
              <span class="text-[32rpx] font-blod text-[#CC3535] mr-[40rpx]">
                ￥{{ currentOrderInfo.order_amount }}元
              </span>
            </template>
          </nut-cell>
          <nut-cell
            title="可用优惠券："
            is-link
            @click="showCouponPopupVisible(true)">
            <template #desc>
              <span
                v-if="finalPriceDetails.coupon_amount"
                class="text-[32rpx] font-blod text-[#CC3535]">
                - ￥{{ finalPriceDetails.coupon_amount }}元
              </span>
              <span v-else class="text-[34rpx] font-blod text-[#CC3535]">
                {{ availableCoupons.length }}张
              </span>
            </template>
          </nut-cell>
          <nut-cell title="实付金额：">
            <template #desc>
              <span class="text-[32rpx] font-blod text-[#CC3535] mr-[40rpx]">
                ￥{{
                  finalPriceDetails.real_amount ||
                  currentOrderInfo.order_amount
                }}元
              </span>
            </template>
          </nut-cell>
          <nut-cell
            title="选择支付方式："
            is-link
            @click="showPayMethodPopupVisible(true)">
            <template #desc>
              <div class="flex justify-end items-center">
                <img
                  class="w-[33.75rpx] mr-[10rpx]"
                  :style="{
                    height:
                      selectedPayMethod === 'wechat' ? '32rpx' : '33.75rpx'
                  }"
                  :src="
                    selectedPayMethod === 'wechat' ? wechatIcon : walletIcon
                  "
                  alt="" />
                <span class="text-[#666]">
                  {{ selectedPayMethod === 'wechat' ? '微信支付' : '余额支付' }}
                </span>
              </div>
            </template>
          </nut-cell>
          <nut-button
            block
            type="primary"
            size="large"
            :loading="payLoading"
            @click="debounce(onPaySubmit)">
            {{ payLoading ? '支付中...' : '确认支付' }}
          </nut-button>
        </div>
      </nut-popup>

      <nut-popup
        round
        position="bottom"
        safe-area-inset-bottom
        :custom-style="{
          boxSizing: 'border-box',
          padding: '40rpx',
          background: '#F7F9FC',
          height: '50vh',
          'overflow-y': 'scroll'
        }"
        v-model:visible="couponPopupVisible">
        <div class="__title">选择优惠券</div>
        <div class="couponPopupWrap" v-if="availableCoupons.length > 0">
          <div
            v-for="item in availableCoupons"
            :key="item.id"
            :class="[
              'coupon-layer',
              currentSelectedCoupon.id == item.id ? 'selected' : ''
            ]"
            @click="onCouponClick(item)">
            <div class="flex flex-col">
              <span class="text-[36rpx] mb-[10rpx]">{{ item.name }}</span>
              <span class="text-[26rpx] text-[#999999]">
                {{ item.result_name }}
              </span>
            </div>
            <div class="min-w-[220rpx]">
              <div class="flex flex-col text-center" v-if="item.result == 1">
                <span class="text-[36rpx] text-[#F24544] mb-[10rpx]">
                  ￥{{ item.moneyOrDiscount }}元
                </span>
                <span class="text-[26rpx] text-[#999999]">优惠券</span>
              </div>
              <div class="flex flex-col text-center" v-if="item.result == 0">
                <span class="text-[36rpx] text-[#F24544] mb-[10rpx]">
                  {{ item.moneyOrDiscount }}折
                </span>
                <span class="text-[26rpx] text-[#999999]">折扣券</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center h-[80%]" v-else>
          <nut-empty
            image="empty"
            image-size="128rpx"
            description="暂无可用优惠券">
            <template #image>
              <img src="../../static/images/coupon/no-coupon.png" alt="" />
            </template>
          </nut-empty>
        </div>
      </nut-popup>

      <nut-popup
        round
        position="bottom"
        safe-area-inset-bottom
        :custom-style="{
          boxSizing: 'border-box',
          padding: '40rpx',
          background: '#F7F9FC'
        }"
        v-model:visible="payMethodPopupVisible">
        <div class="payMethodPopupWrap">
          <div :class="['pay-inner']">
            <div class="__title">选择支付方式</div>
            <div
              v-for="method in payMethods"
              :key="method.key"
              :class="['pay-inner-layer', method.key]"
              @click="onSelectPayMethod(method)">
              <div class="left">
                <img :src="method.icon" alt="" />
                <span>{{ method.label }}</span>
              </div>
              <nut-icon
                :name="
                  selectedPayMethod === method.key ? 'checked' : 'check-normal'
                "
                :custom-color="
                  selectedPayMethod === method.key ? '#1CBF1E' : '#eee'
                "
                size="24" />
            </div>
          </div>
        </div>
      </nut-popup>
    </div>
  </AppContainer>
</template>
<script setup>
import AppContainer from '@/components/AppContainer/index'
import OrderInfo from '@/components/OrderInfo/index'
import Loading from '@/components/Loading/index'
import { calcMenuButton } from '../../utils/calcMenuButton'
import { computed, ref, watch } from 'vue'
import { onReachBottom, onShow } from '@dcloudio/uni-app'
import {
  callPayRes,
  getAvailableCouponsRes,
  getOrdersRes,
  getPriceDetailsRes
} from '../../api'
import { ORDER_STATUS } from '../../constant'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import debounce from '../../utils/debounce'
import wechatIcon from '../../static/images/wechat.png'
import walletIcon from '../../static/images/wallet.png'
import { toast } from '../../utils/uni'

const [headerTop] = calcMenuButton()

const appStore = useAppStore()
const {
  activeOrderType,
  subOrderActiveKey,
  orderPageWantedRefreshData,
  orderPageAlreadyInitData
} = storeToRefs(appStore)

function onClickOrderType(e) {
  const id = e.target.id
  id && appStore.setActiveOrderType(id)
  getOrders(1)
}
function getActiveStyle(id) {
  if (id === activeOrderType.value) {
    return {
      background: '#344AD9',
      color: '#fff'
    }
  } else {
    return null
  }
}

const subTabPannels = ref(
  Object.keys(ORDER_STATUS).map((key) => ({
    key,
    title: ORDER_STATUS[key].label,
    loading: false
  }))
)
watch(
  () => subOrderActiveKey.value,
  (newKey, oldKey) => {
    if (newKey !== oldKey) {
      getOrders(1)
      appStore.setOrderPageWantedRefreshData(false)
    }
  }
)
let page = 1,
  isEnd = false
const orders = ref([])
async function getOrders(currentPage) {
  const current = subTabPannels.value.find(
    (x) => x.key == subOrderActiveKey.value
  )
  try {
    if (currentPage == 1) {
      page = currentPage
      isEnd = false
    }
    if (page == 1) {
      current.loading = true
    }
    const { data, total } = await getOrdersRes({
      page,
      limit: 10,
      order_type: activeOrderType.value,
      order_status: subOrderActiveKey.value
    })
    orders.value = page == 1 ? data : orders.value.concat(data)
    if (total === orders.value.length) {
      isEnd = true
    }
  } finally {
    current.loading = false
  }
}

onShow(async () => {
  if (orderPageWantedRefreshData.value || !orderPageAlreadyInitData.value) {
    resetPayState()
    await getOrders(1)
    appStore.setOrderPageWantedRefreshData(false)
    appStore.setOrderPageAlreadyInitData(true)
  }
})

onReachBottom(() => {
  if (!isEnd) {
    page++
    getOrders()
  }
})

function resetPayState() {
  payPopupVisible.value = false
  currentOrderInfo.value = {}
  availableCoupons.value = []
  couponPopupVisible.value = false
  currentSelectedCoupon.value = {}
  finalPriceDetails.value = {}
  payMethodPopupVisible.value = false
  selectedPayMethod.value = 'wechat'
}

const payPopupVisible = ref(false),
  currentOrderInfo = ref({}),
  availableCoupons = ref([]),
  couponPopupVisible = ref(false),
  currentSelectedCoupon = ref({}),
  finalPriceDetails = ref({}),
  payMethodPopupVisible = ref(false),
  selectedPayMethod = ref('wechat'),
  payMethods = computed(() => {
    return [
      { key: 'wechat', label: '微信支付', icon: wechatIcon },
      {
        key: 'wallet',
        label: `余额支付（￥${appStore.appUser.totalMoney}）`,
        icon: walletIcon
      }
    ]
  }),
  payLoading = ref(false)
async function onCallPayPopup(data) {
  currentOrderInfo.value = data
  const result = await getAvailableCouponsRes(data.order_number)
  availableCoupons.value = result.map((x) => ({
    ...x,
    moneyOrDiscount: JSON.parse(x.result_data)?.number
  }))
  currentSelectedCoupon.value = {}
  finalPriceDetails.value = {}
  selectedPayMethod.value = 'wechat'
  payPopupVisible.value = true
}
function showCouponPopupVisible(value) {
  couponPopupVisible.value = value
}
async function onCouponClick(scope) {
  if (scope.id === currentSelectedCoupon.value.id) {
    // 取消选中
    currentSelectedCoupon.value = {}
    finalPriceDetails.value = {}
  } else {
    currentSelectedCoupon.value = scope
    try {
      uni.showLoading({
        title: '优惠金额计算中...',
        mask: true
      })
      finalPriceDetails.value = await getPriceDetailsRes({
        order_number: currentOrderInfo.value.order_number,
        user_coupon_id: scope.id
      })
    } finally {
      uni.hideLoading()
    }
  }
  showCouponPopupVisible(false)
}
function showPayMethodPopupVisible(value) {
  payMethodPopupVisible.value = value
}
function onSelectPayMethod(method) {
  if (method.key == 'wallet') {
    const userTotalMoney = parseFloat(appStore.appUser.totalMoney)
    let canPay = false
    if (finalPriceDetails.value.real_amount) {
      canPay = userTotalMoney >= parseFloat(finalPriceDetails.value.real_amount)
    } else {
      canPay = userTotalMoney >= parseFloat(currentOrderInfo.value.order_amount)
    }
    if (!canPay) {
      return toast('余额不足')
    }
  }
  selectedPayMethod.value = method.key
  showPayMethodPopupVisible(false)
}
async function onPaySubmit() {
  try {
    payLoading.value = true
    const reqData = {
      order_number: currentOrderInfo.value.order_number,
      pay_type: selectedPayMethod.value
    }
    if (currentSelectedCoupon.value.id) {
      reqData.user_coupon_id = currentSelectedCoupon.value.id
    }
    const data = await callPayRes(reqData)
    if (data) {
      // 原生微信支付
      uni.requestPayment({
        ...data,
        async success(result) {
          console.log('用户支付扣款成功', result)
          payLoading.value = false
          payPopupVisible.value = false
          getOrders(1)
        },
        fail(error) {
          console.log('用户支付扣款失败', error)
          payLoading.value = false
        }
      })
    } else {
      // 余额支付
      payLoading.value = false
      payPopupVisible.value = false
      getOrders(1)
      appStore.refreshAppUser()
    }
  } catch {
    payLoading.value = false
  }
}
</script>
