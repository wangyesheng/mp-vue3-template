<template>
  <AppContainer>
    <div class="ticket-detail">
      <image :src="ticketInfo.image" class="banner" mode="aspectFill" />
      <div class="content">
        {{ ordersn }}
        <div class="price">¥ {{ ticketInfo.price }}</div>
        <div class="title">
          {{ ticketInfo.title }}
        </div>

        <div class="p-[30rpx] rounded-[20rpx] bg-[#fff]">
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
        </div>
      </div>
      <div class="footer">
        <div class="inner">
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
          <div class="mt-[20rpx]">
            <nut-button
              v-if="Boolean(appToken)"
              block
              size="large"
              type="primary"
              @click="debounce(showUserNotesPopup)">
              立即领取
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
      </div>

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
  getOrderDetailsRes,
  getUserNotesRes,
  receiveTicketRes
} from '../../api'
import { addHtmlClassName, navTo, toast } from '../../utils/uni'
import debounce from '../../utils/debounce'
import { useAppStore } from '@/stores/app'
import { useLogin } from '@/hooks/useLogin'

const { appToken } = storeToRefs(useAppStore())
const { bindMobileVisible, login, getPhoneNumber } = useLogin(async () => {
  payPopupVisible.value = true
})

const ticketInfo = ref({}),
  payPopupVisible = ref(false),
  ordersn = ref('')

onLoad(async ({ order_sn = '20260128233215574012' }) => {
  ordersn.value = order_sn
  try {
    uni.showLoading({
      title: '数据加载中'
    })
    const ticket = await getOrderDetailsRes(order_sn)
    ticketInfo.value = ticket
  } finally {
    uni.hideLoading()
  }
})

const checkedUserNotes = ref(false),
  userNotes = ref(),
  userNotesPopupVisible = ref(false)

async function showUserNotesPopup() {
  if (checkedUserNotes.value) {
    await receiveTicketRes(ordersn.value)
    toast('领取成功！')
    navTo('/pages/me/wallet')
  } else {
    if (!userNotes.value) {
      userNotes.value = await getUserNotesRes()
    }
    userNotesPopupVisible.value = true
  }
}

function onUserKnown() {
  checkedUserNotes.value = true
  userNotesPopupVisible.value = false
}
</script>

<style lang="scss" scoped>
.ticket-detail {
  position: relative;

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
    padding: 30rpx 30rpx calc(15vh + env(safe-area-inset-bottom));
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
      margin-bottom: 30rpx;
    }

    .note {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      row-gap: 10rpx;
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
    padding-top: 20rpx;

    .inner {
      width: 100%;
      height: 100%;
      padding: 0 50rpx;
      box-sizing: border-box;

      ::v-deep() {
        .nut-checkbox {
          margin-right: 0;
        }
        .nut-checkbox__label {
          margin-left: 10rpx;
        }
      }
    }
  }
}
</style>
