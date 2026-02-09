<template>
  <AppContainer>
    <div class="__order">
      <nut-tabs
        v-model="selectedOrderType"
        title-scroll
        auto-height
        background="#fff">
        <nut-tab-pane
          v-for="item in orderTabPanes"
          :key="item.key"
          :title="item.title"
          :pane-key="item.key">
          <PageList
            :ref="(ref) => (item.instance = ref)"
            :active="item.key == selectedOrderType"
            :api="getOrdersRes"
            :params="{ status: item.key }">
            <template #item="{ data }">
              <OrderInfo
                :data="data"
                @refresh="onRefresh"
                @call-pay-popup="onCallPayPopup"
                @show-baby-popup-visible="showBabyPopupVisible(data)" />
            </template>
          </PageList>
        </nut-tab-pane>
      </nut-tabs>
    </div>
    <nut-popup
      v-model:visible="payPopupVisible"
      round
      position="bottom"
      safe-area-inset-bottom>
      <div class="popupWrap">
        <div class="__title px-[40rpx]">价格明细</div>
        <div class="popup-inner pay">
          <nut-cell title="门票总额：">
            <template #desc>
              <span class="text-[32rpx] font-blod text-[#CC3535] mr-[40rpx]">
                ￥{{ currentOrder.price }}元
              </span>
            </template>
          </nut-cell>
          <nut-cell v-if="currentOrder.baby_info?.length" title="宝贝信息：">
            <template #desc>
              <div class="mr-[40rpx]">
                <BabyStackingInfo
                  :baby-list="currentOrder.baby_info"
                  :custom-class="['w-[80rpx]', 'h-[80rpx]']" />
              </div>
            </template>
          </nut-cell>
          <nut-cell
            title="选择优惠券："
            is-link
            @click="showCouponPopupVisible(true)">
            <template #desc>
              <span
                v-if="finalPriceDetails.id"
                class="text-[32rpx] font-blod text-[#CC3535]">
                - ￥{{ finalPriceDetails.discount }}
              </span>
              <span v-else class="text-[32rpx] font-blod text-[#CC3535]">
                {{ availableCoupons.length }}张
              </span>
            </template>
          </nut-cell>
          <nut-cell title="实付金额：">
            <template #desc>
              <span class="text-[32rpx] font-blod text-[#CC3535] mr-[40rpx]">
                ￥
                {{ finalPriceDetails.real_price || currentOrder.price }}
              </span>
            </template>
          </nut-cell>
          <nut-cell title="支付方式：">
            <template #desc>
              <div class="flex justify-end items-center mr-[40rpx]">
                <img
                  class="w-[33.75rpx] mr-[10rpx]"
                  :style="{
                    height: '32rpx'
                  }"
                  :src="wechatIcon"
                  alt="" />
                <span class="text-[#666]">微信支付</span>
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
      </div>
    </nut-popup>

    <nut-popup
      v-model:visible="couponPopupVisible"
      round
      position="bottom"
      safe-area-inset-bottom>
      <div class="popupWrap">
        <div class="__title flex justify-between items-center px-[40rpx]">
          <span>选择优惠券</span>
        </div>
        <div v-if="availableCoupons.length > 0" class="popup-inner coupon">
          <CouponInfo
            v-for="coupon in availableCoupons"
            :key="coupon.coupon_id"
            :data="coupon"
            :selected="currentSelectedCoupon.coupon_id == coupon.coupon_id"
            @click="onSelectCoupon(coupon)" />
        </div>
        <div v-else class="flex justify-center items-center h-[50vh]">
          <nut-empty
            image="empty"
            image-size="128rpx"
            description="暂无可用优惠券">
            <template #image>
              <img src="../../static/images/coupon/no-coupon.png" alt="" />
            </template>
          </nut-empty>
        </div>
      </div>
    </nut-popup>

    <BabyPopupInfo ref="babyPopupRef" />
  </AppContainer>
</template>

<script setup>
import debounce from '@/utils/debounce'
import {
  callPayInOrderRes,
  getAvailableCouponsRes,
  getOrdersRes,
  getTicketPriceRes
} from '../../api'
import { ORDER_STATUS } from '../../constant'
import wechatIcon from '../../static/images/wechat.png'

const orderTabPanes = ref(
    Object.keys(ORDER_STATUS).map((key) => ({
      key,
      title: ORDER_STATUS[key].label,
      instance: null
    }))
  ),
  selectedOrderType = ref('0'),
  babyPopupRef = ref()

function showBabyPopupVisible(data) {
  babyPopupRef.value.show(data)
}

function onRefresh() {
  const current = orderTabPanes.value.find(
    (x) => x.key == selectedOrderType.value
  )
  current.instance.refresh()
}

const currentOrder = ref({})
const availableCoupons = ref([])
const payPopupVisible = ref(false)
const couponPopupVisible = ref(false)
const currentSelectedCoupon = ref({})
const finalPriceDetails = ref({})
const payLoading = ref(false)

async function onCallPayPopup(order) {
  try {
    payPopupVisible.value = true
    currentOrder.value = order
    uni.showLoading({
      title: '价格明细计算中...',
      mask: true
    })
    const result = await getAvailableCouponsRes({
      page: 1,
      limit: 100,
      ticket_id: currentOrder.value.ticket_id
    })

    availableCoupons.value = result?.data ?? []

    if (order.coupon_id) {
      currentSelectedCoupon.value =
        availableCoupons.value.find((c) => c.coupon_id == order.coupon_id) ?? {}
      finalPriceDetails.value =
        (await getTicketPriceRes({
          order_id: currentOrder.value.id,
          coupon_id: order.coupon_id
        })) ?? {}
    } else {
      currentSelectedCoupon.value = {}
      finalPriceDetails.value = {}
    }
  } finally {
    uni.hideLoading()
  }
}

function showCouponPopupVisible(value) {
  couponPopupVisible.value = value
}

async function onSelectCoupon(scope) {
  if (scope.coupon_id === currentSelectedCoupon.value.coupon_id) {
    // 取消选中
    currentSelectedCoupon.value = {}
    finalPriceDetails.value = {}
  } else {
    try {
      uni.showLoading({
        title: '优惠金额计算中...',
        mask: true
      })
      finalPriceDetails.value = await getTicketPriceRes({
        ticket_id: currentOrder.value.ticket_id,
        coupon_id: scope.coupon_id
      })
      currentSelectedCoupon.value = scope
    } finally {
      uni.hideLoading()
    }
  }
  showCouponPopupVisible(false)
}

async function onPaySubmit() {
  try {
    payLoading.value = true
    const reqData = {
      order_id: currentOrder.value.id
    }
    if (currentSelectedCoupon.value.coupon_id) {
      reqData.coupon_id = currentSelectedCoupon.value.coupon_id
    }
    const data = await callPayInOrderRes(reqData)
    if (data) {
      // 原生微信支付
      uni.requestPayment({
        ...data,
        async success(result) {
          console.log('用户支付扣款成功', result)
          payLoading.value = false
          payPopupVisible.value = false
          onRefresh()
        },
        fail(error) {
          console.log('用户支付扣款失败', error)
          payLoading.value = false
        }
      })
    }
  } catch {
    payLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
::v-deep() {
  .nut-cell {
    box-shadow: none !important;
    padding: 20rpx 10rpx !important;
    background: transparent !important;
    align-items: center;
    height: 100rpx;
    margin: 0 !important;
  }

  .nut-popup {
    background: #f7f9fc !important;
  }

  .popupWrap {
    padding-top: 40rpx;

    .popup-inner {
      padding: 20rpx 40rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid #f5f5f5;

      &.coupon {
        margin-top: 20rpx;
        display: flex;
        flex-direction: column;
        row-gap: 20rpx;
        height: 50vh;
        overflow-y: scroll;
      }
    }
  }
}

.__order {
  background: var(--hw-primary-bg-color);
  min-height: 100vh;

  ::v-deep() {
    .nut-tabs__titles {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
    }

    .nut-tabs__content {
      margin-top: 100rpx;
    }

    .nut-tab-pane {
      box-sizing: border-box;
      padding: 30rpx !important;
      background: var(--hw-primary-bg-color);
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
</style>
