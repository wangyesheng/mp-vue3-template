<template>
  <AppContainer>
    <div class="ticket-detail">
      <image :src="ticketInfo.image" class="banner" mode="aspectFill" />
      <div class="content">
        <div class="price">¥ {{ ticketInfo.price }}</div>
        <div class="title">
          {{ ticketInfo.title }}
        </div>

        <nut-tabs
          v-model="selectedPaneKey"
          type="smile"
          align="left"
          :ellipsis="false"
          title-gutter="50"
          auto-height>
          <nut-tab-pane title="门票详情" pane-key="1">
            <div class="note">
              <div class="note-item">
                <span>门票类型：</span>
                <span>{{ ticketInfo.type_text }}</span>
              </div>
              <div class="note-item">
                <span>适用人群：</span>
                <span>{{ ticketInfo.suited_crowd_text }}</span>
              </div>
              <div class="note-item">
                <span>适用日期：</span>
                <span>{{ ticketInfo.use_time_text?.join('') }}通用</span>
              </div>
              <div class="note-item">
                <span>适用场次/票种：</span>
                <span>{{ ticketInfo.ticket_type }}</span>
              </div>
            </div>
            <nut-divider>图文详情</nut-divider>
            <div
              class="richtext"
              v-html="addHtmlClassName(ticketInfo.specifics)" />
          </nut-tab-pane>
          <nut-tab-pane title="购买须知" pane-key="2">
            <div
              class="richtext"
              v-html="addHtmlClassName(ticketInfo.notices)" />
          </nut-tab-pane>
        </nut-tabs>
      </div>
      <div class="footer">
        <div class="inner">
          <nut-button
            v-if="Boolean(appToken)"
            block
            size="large"
            type="primary"
            @click="debounce(callPayPopup)">
            立即购买
          </nut-button>
          <nut-button
            v-else
            block
            size="large"
            type="primary"
            open-type="getUserInfo"
            @click="login">
            立即购买
          </nut-button>
        </div>
      </div>

      <nut-popup
        v-model:visible="payPopupVisible"
        round
        position="bottom"
        safe-area-inset-bottom>
        <div class="popupWrap">
          <div class="__title px-[40rpx]">价格明细</div>
          <div class="popup-inner">
            <nut-cell title="门票总额：">
              <template #desc>
                <span class="text-[32rpx] font-blod text-[#CC3535] mr-[40rpx]">
                  ￥{{ ticketInfo.price }}元
                </span>
              </template>
            </nut-cell>
            <nut-cell
              title="可用优惠券："
              is-link
              @click="showCouponPopupVisible(true)">
              <template #desc>
                <span
                  v-if="finalPriceDetails.id"
                  class="text-[32rpx] font-blod text-[#CC3535]">
                  - ￥{{ finalPriceDetails.coupon_money }}元
                </span>
                <span v-else class="text-[32rpx] font-blod text-[#CC3535]">
                  {{ availableCoupons.length }}张
                </span>
              </template>
            </nut-cell>
            <nut-cell title="实付金额：">
              <template #desc>
                <span class="text-[32rpx] font-blod text-[#CC3535] mr-[40rpx]">
                  ￥{{ finalPriceDetails.real_price || ticketInfo.price }}元
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
        safe-area-inset-bottom
        :custom-style="{}">
        <div class="popupWrap">
          <div class="__title flex justify-between items-center px-[40rpx]">
            <span>选择优惠券</span>
            <span
              class="text-[28rpx] font-[550] text-[var(--hw-primary-color)]"
              @click="navTo('/pages/coupon/index')">
              去领券
            </span>
          </div>
          <div v-if="availableCoupons.length > 0" class="popup-inner coupon">
            <CouponInfo
              v-for="item in availableCoupons"
              :key="item.coupon_id"
              :data="item"
              :selected="currentSelectedCoupon.coupon_id == item.coupon_id"
              @click="onSelectCoupon(item)" />
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

      <BindMobile
        v-model:visible="bindMobileVisible"
        :get-phone-number="getPhoneNumber" />
    </div>
  </AppContainer>
</template>

<script setup>
import {
  callPayRes,
  getAvailableCouponsRes,
  getTicketDetailsRes,
  getTicketPriceRes
} from '../../api'
import { addHtmlClassName, navTo } from '../../utils/uni'
import debounce from '../../utils/debounce'
import wechatIcon from '../../static/images/wechat.png'
import CouponInfo from '@/components/CouponInfo/index'
import { useAppStore } from '@/stores/app'
import { useLogin } from '@/hooks/useLogin'

const { appToken } = storeToRefs(useAppStore())
const { bindMobileVisible, login, getPhoneNumber } = useLogin(async () => {
  await initData()
  payPopupVisible.value = true
})

const ticketInfo = ref({})
const selectedPaneKey = ref('1')
const availableCoupons = ref([])
const payPopupVisible = ref(false)
const couponPopupVisible = ref(false)
const currentSelectedCoupon = ref({})
const finalPriceDetails = ref({})
const payLoading = ref(false)

let ticketId
onLoad(({ id = 3 }) => {
  ticketId = id
})
onShow(initData)

async function initData() {
  if (!ticketInfo.value.id) {
    // 初始化请求一次，后续如果从领券中心返回就不再请求了
    const ticket = await getTicketDetailsRes(ticketId)
    ticketInfo.value = ticket
  }
  if (appToken.value) {
    const { data } = await getAvailableCouponsRes({
      page: 1,
      limit: 100,
      ticket_id: ticketId
    })
    availableCoupons.value = data
  }
}

function callPayPopup() {
  currentSelectedCoupon.value = {}
  finalPriceDetails.value = {}
  payPopupVisible.value = true
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
        ticket_id: ticketInfo.value.id,
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
      ticket_id: ticketInfo.value.id
    }
    if (currentSelectedCoupon.value.coupon_id) {
      reqData.coupon_id = currentSelectedCoupon.value.coupon_id
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
          navTo('/pages/me/wallet')
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

onShareAppMessage(() => {
  return {
    title: 'HAOWEN LAND',
    path: '/pages/ticket/details'
  }
})

onShareTimeline(() => {
  return {
    title: 'HAOWEN LAND',
    path: '/pages/ticket/details'
  }
})
</script>

<style lang="scss" scoped>
.ticket-detail {
  position: relative;

  ::v-deep() {
    .nut-cell {
      box-shadow: none !important;
      padding: 20rpx 10rpx !important;
      background: transparent !important;
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

  .banner {
    width: 100%;
  }

  .content {
    position: absolute;
    top: 410rpx;
    left: 0;
    background: #f5f5f5;
    width: 100%;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    padding: 30rpx 30rpx calc(10vh + env(safe-area-inset-bottom));
    box-sizing: border-box;

    .price {
      font-weight: 550;
      font-size: 50rpx;
      color: var(--hw-primary-color);
      margin-bottom: 20rpx;
    }

    .title {
      font-size: 36rpx;
      font-weight: 550;
      color: #000;
    }

    .note {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      row-gap: 10rpx;
      border: 2rpx dashed #e8e8e8;
      padding: 20rpx;
      box-sizing: border-box;
      border-radius: 10rpx;

      &-item {
        font-size: 28rpx;

        label:first-child {
          color: #666;
          display: inline-block;
          width: 220rpx;
        }

        label:last-child {
          color: #333;
        }
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
