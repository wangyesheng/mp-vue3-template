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
                <span>{{ ticketInfo.use_time_text?.join('') }}可用</span>
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
          <div class="popup-inner pay">
            <nut-cell title="门票总额：">
              <template #desc>
                <span class="text-[32rpx] font-blod text-[#CC3535] mr-[40rpx]">
                  ￥{{ ticketInfo.price }}
                </span>
              </template>
            </nut-cell>
            <nut-cell
              v-if="ticketInfo.bind_number > 0"
              title="选择宝贝："
              is-link
              @click="() => (babyPopupVisible = true)">
              <template #desc>
                <div v-if="selectedBabyList.length" class="baby-wrap">
                  <image
                    v-for="(baby, index) in selectedBabyList"
                    :key="baby.id"
                    :src="baby.avatar"
                    mode="aspectFill"
                    :style="{
                      marginLeft: index > 0 ? '-5%' : '0',
                      zIndex: selectedBabyList.length - index
                    }" />
                </div>
                <div v-else class="text-[32rpx] font-blod text-[#CC3535]">
                  最多可选{{ ticketInfo.bind_number }}个
                </div>
              </template>
            </nut-cell>
            <nut-cell
              title="选择优惠券："
              is-link
              @click="() => (couponPopupVisible = true)">
              <template #desc>
                <span
                  v-if="finalPriceDetails.id"
                  class="text-[32rpx] font-blod text-[#CC3535]">
                  - ￥{{ finalPriceDetails.discount }}
                </span>
                <span v-else class="text-[32rpx] font-blod text-[#CC3535]">
                  共{{ availableCoupons.length }}张
                </span>
              </template>
            </nut-cell>
            <nut-cell title="实付金额：">
              <template #desc>
                <span class="text-[32rpx] font-blod text-[#CC3535] mr-[40rpx]">
                  ￥{{ finalPriceDetails.real_price || ticketInfo.price }}
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
            <div class="pay-action">
              <nut-checkbox v-model="checkedUserNotes" icon-size="14">
                <div class="text-[24rpx]">
                  <span>我已阅读并同意</span>
                  <span
                    class="text-[var(--hw-primary-color)]"
                    @click.stop="showUserNotesPopup">
                    《用户须知》
                  </span>
                </div>
              </nut-checkbox>

              <nut-button
                block
                size="large"
                type="primary"
                :loading="payLoading"
                @click="debounce(onPaySubmit)">
                {{ payLoading ? '支付中...' : '确认支付' }}
              </nut-button>
            </div>
          </div>
        </div>
      </nut-popup>

      <nut-popup
        v-model:visible="babyPopupVisible"
        round
        position="bottom"
        safe-area-inset-bottom>
        <div class="popupWrap">
          <div class="__title flex justify-between items-center px-[40rpx]">
            <span>选择宝贝</span>
            <span
              v-if="babyList.length < 2"
              class="text-[28rpx] font-[550] text-[var(--hw-primary-color)]"
              @click="navTo('/pages/baby/form')">
              添加宝贝
            </span>
          </div>
          <div v-if="babyList.length" class="popup-inner baby">
            <div class="baby-content">
              <div
                v-for="item in babyList"
                :key="item.id"
                :style="{ width: '49%' }"
                @click="onSelectBaby(item)">
                <BabyInfo :data="item" :selected="checkBabySelected(item)" />
              </div>
            </div>
            <div class="action">
              <nut-button
                plain
                size="large"
                type="primary"
                @click="onSelectBabyConfirm(false)">
                取消选择
              </nut-button>
              <nut-button
                size="large"
                type="primary"
                @click="onSelectBabyConfirm(true)">
                确认选择
              </nut-button>
            </div>
          </div>
          <div
            v-else
            class="flex flex-col justify-center items-center gap-y-[30rpx] py-[60rpx]">
            <image
              class="w-[120rpx] h-[170rpx]"
              src="https://hwly.tuomuit.com/wechat/img/empty.png"
              mode="aspectFill" />
            <span class="text-[#666] text-[28rpx] font-[500]">
              暂未添加宝贝信息
            </span>
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

      <nut-popup
        v-model:visible="userNotesPopupVisible"
        round
        closeable
        close-icon="circle-close"
        position="bottom"
        safe-area-inset-bottom
        :close-on-click-overlay="false">
        <div class="popupWrap userNotes">
          <div class="popup-inner">
            <div class="richtext" v-html="addHtmlClassName(userNotes)"></div>
            <div class="footer-action">
              <nut-button
                block
                size="large"
                type="primary"
                @click="onUserKnown">
                我已知晓
              </nut-button>
            </div>
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
  getBabyListRes,
  getTicketDetailsRes,
  getTicketPriceRes,
  getUserNotesRes
} from '../../api'
import { addHtmlClassName, navTo, toast } from '../../utils/uni'
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

const babyList = ref([]),
  babyPopupVisible = ref(false),
  selectedBabyList = ref([])

let ticketId
onLoad(({ id }) => {
  ticketId = id
})
onShow(initData)

async function initData() {
  try {
    uni.showLoading({
      title: '数据加载中'
    })
    if (!ticketInfo.value.id) {
      // 初始化请求一次，后续如果从领券中心返回就不再请求了
      const ticket = await getTicketDetailsRes(ticketId)
      ticketInfo.value = ticket
    }
    if (appToken.value) {
      const result = await getAvailableCouponsRes({
        page: 1,
        limit: 100,
        ticket_id: ticketId
      })
      availableCoupons.value = result?.data ?? []

      if (ticketInfo.value.bind_number > 0) {
        // 如果门票需要绑定宝贝信息需获取宝贝列表
        const data = await getBabyListRes()
        babyList.value = data ?? []
      }
    }
  } finally {
    uni.hideLoading()
  }
}

const checkedUserNotes = ref(false),
  userNotes = ref(),
  userNotesPopupVisible = ref(false)

async function showUserNotesPopup() {
  if (!userNotes.value) {
    userNotes.value = await getUserNotesRes()
  }
  userNotesPopupVisible.value = true
}

function onUserKnown() {
  checkedUserNotes.value = true
  userNotesPopupVisible.value = false
}

function callPayPopup() {
  checkedUserNotes.value = false
  currentSelectedCoupon.value = {}
  selectedBabyList.value = []
  finalPriceDetails.value = {}
  payPopupVisible.value = true
}

function onSelectBaby(item) {
  if (selectedBabyList.value.find((x) => x.id == item.id)) {
    // 反选
    selectedBabyList.value = selectedBabyList.value.filter(
      (x) => x.id != item.id
    )
  } else {
    if (ticketInfo.value.bind_number == 1) {
      selectedBabyList.value = []
      selectedBabyList.value.push(item)
    } else {
      if (selectedBabyList.value.length < ticketInfo.value.bind_number) {
        selectedBabyList.value.push(item)
      } else {
        toast(`最多可选${ticketInfo.value.bind_number}个宝贝`)
      }
    }
  }
}

function checkBabySelected(item) {
  return selectedBabyList.value.findIndex((x) => x.id == item.id) != -1
}

function onSelectBabyConfirm(result) {
  if (!result) {
    selectedBabyList.value = []
  }
  babyPopupVisible.value = false
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
  couponPopupVisible.value = false
}

async function pay(reqData) {
  try {
    payLoading.value = true
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
  } catch (error) {
    console.log('callPayRes', error)
    payLoading.value = false
  }
}

async function onPaySubmit() {
  if (!checkedUserNotes.value) {
    showUserNotesPopup()
    return
  }
  if (ticketInfo.value.bind_number > 0 && selectedBabyList.value.length == 0) {
    toast('请先选择宝贝！')
    return
  }
  const reqData = {
    ticket_id: ticketInfo.value.id
  }

  if (currentSelectedCoupon.value.coupon_id) {
    reqData.coupon_id = currentSelectedCoupon.value.coupon_id
  }

  if (ticketInfo.value.bind_number > 0) {
    reqData.baby_ids = selectedBabyList.value.map((x) => x.id).join()
    uni.showModal({
      title: '提示',
      content: '确定为该门票绑定选中的宝贝信息吗？一旦支付不可更改！',
      async success({ confirm }) {
        if (confirm) {
          await pay(reqData)
        }
      }
    })
  } else {
    await pay(reqData)
  }
}

onShareAppMessage(() => {
  return {
    title: 'HAOWEN LAND',
    path: `/pages/ticket/details?id=${ticketInfo.value.id}`
  }
})

onShareTimeline(() => {
  return {
    title: 'HAOWEN LAND',
    path: `/pages/ticket/details?id=${ticketInfo.value.id}`
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
      align-items: center;
      height: 100rpx;
      margin: 0 !important;
    }

    .nut-popup {
      background: #f7f9fc !important;
    }

    .nut-popup__close-icon {
      top: 20rpx !important;
    }

    .popupWrap {
      padding-top: 40rpx;

      &.userNotes {
        padding-top: 80rpx;

        .popup-inner {
          padding: 0;
          border-bottom: none;

          .richtext {
            padding: 0 40rpx;
            box-sizing: border-box;
            height: 70vh;
            padding-bottom: 10vh;
            overflow-y: scroll;
          }

          & > .footer-action {
            width: 100%;
            height: 10vh;
            position: fixed;
            left: 0;
            bottom: calc(env(safe-area-inset-bottom) + 20rpx);
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: flex-end;

            button {
              width: 50%;
            }
          }
        }
      }

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

        &.baby {
          max-height: 50vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20rpx 0;

          .baby-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            row-gap: 15rpx;
            max-height: 40vh;
            overflow-y: scroll;
            padding: 50rpx 20rpx;

            .baby-item {
              .inner {
                background: #fff;
                height: 12vh;
                padding: 0 20rpx;
                border: 2rpx solid var(--hw-primary-color);
                box-sizing: border-box;
                border-radius: 10rpx;

                .top {
                  column-gap: 10rpx;

                  .name {
                    font-size: 30rpx;
                  }
                }
              }
            }
          }

          .action {
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 2rpx solid #f5f5f5;
            padding-top: 20rpx;

            button {
              width: 40% !important;
            }
          }
        }

        &.pay {
          .baby-wrap {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            image {
              width: 80rpx;
              height: 80rpx;
              border-radius: 50%;
              border: 4rpx solid #fff;
              box-sizing: border-box;
              position: relative;
            }
          }

          .pay-action {
            display: flex;
            flex-direction: column;
            row-gap: 20rpx;
            border-top: 2rpx solid #f5f5f5;
            padding-top: 20rpx;
            color: #666;

            .nut-checkbox__label {
              margin-left: 10rpx;
            }
          }
        }
      }
    }
  }

  .banner {
    width: 100%;
  }

  .content {
    position: absolute;
    top: 440rpx;
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
