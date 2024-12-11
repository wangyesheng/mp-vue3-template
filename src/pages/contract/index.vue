<template>
  <AppContainer>
    <div class="p-[30rpx] box-border preview-wrap">
      <image
        class="w-full mb-[20rpx] block"
        mode="widthFix"
        v-for="(src, index) in currentContract.template_sign_images"
        :key="index"
        :src="src"
        @click="previewImage(currentContract.template_sign_images)" />
    </div>

    <div class="footer">
      <div
        class="flex justify-center items-center h-full"
        v-if="currentContract.status == 0">
        <nut-button
          block
          size="large"
          type="primary"
          @click="debounce(onShowSignPopup)">
          签署
        </nut-button>
      </div>

      <div
        class="flex justify-center items-center h-full"
        v-if="currentContract.status == 1">
        <nut-button
          block
          size="large"
          type="success"
          open-type="share"
          @click="debounce(onShare)">
          <div class="flex items-center">
            <nut-icon name="share"></nut-icon>
            <span class="ml-[10rpx]">分享</span>
          </div>
        </nut-button>
      </div>

      <div
        class="flex justify-around items-center w-full h-full text-[#666] font-[550] text-[28rpx]"
        v-if="currentContract.status == 2">
        待乙方操作
      </div>

      <div class="h-full" v-if="currentContract.status == 3">
        <!-- 待乙方签署 -->
        <!-- 合同绑定的乙方信息等于当前登录用户 -->
        <div
          v-if="currentContract.second_party_id == appUser.id"
          class="flex justify-around items-center h-full btn2">
          <nut-button
            plain
            size="large"
            type="danger"
            @click="debounce(onRefuseContractSign)">
            拒签
          </nut-button>
          <nut-button
            size="large"
            type="primary"
            @click="debounce(onPartyBSign)">
            签署
          </nut-button>
        </div>
        <div
          v-else
          class="text-[#666] font-[550] text-[28rpx] text-center leading-[10vh]">
          待乙方签署
        </div>
      </div>

      <!-- <div
        class="flex justify-around items-center w-full h-full text-[#6bba5b] font-[550] text-[28rpx]"
        v-if="currentContract.status == 4"
        @click="onPreviewPDF">
        已签署
      </div> -->

      <div
        class="flex justify-center items-center h-full"
        v-if="currentContract.status == 4">
        <nut-button
          block
          size="large"
          type="primary"
          @click="debounce(onPreviewPDF)">
          预览 PDF
        </nut-button>
      </div>

      <div
        class="flex justify-around items-center w-full h-full text-[#ff0000] font-[550] text-[28rpx]"
        v-if="currentContract.status == 5">
        已拒签
      </div>
    </div>

    <nut-popup
      round
      position="bottom"
      :custom-style="{
        padding: '60rpx 20rpx',
        height: '60vh'
      }"
      v-model:visible="signVisible">
      <div class="signature">
        <div class="inner">
          <div class="text">请在此处签名</div>
          <Signature
            v-if="signVisible"
            ref="signatureRef"
            disableScroll
            openSmooth
            :penSize="15" />
        </div>
        <div class="btn">
          <nut-button plain type="primary" @click="signatureHandler('clear')">
            清空
          </nut-button>
          <nut-button
            type="primary"
            :disabled="synthesizing"
            @click="debounce(signatureHandler('save'))">
            {{ synthesizing ? '签名生成中...' : '确认' }}
          </nut-button>
        </div>
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
          <div class="my-[30rpx]">
            <nut-button
              block
              size="large"
              type="success"
              :disabled="!selectedPayMethod"
              :loading="payLoading"
              @click="debounce(onPaySubmit)">
              {{ payLoading ? '支付中...' : '确认支付' }}
            </nut-button>
          </div>
        </div>
      </div>
    </nut-popup>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import {
  changeContractStatusRes,
  getContractDetailsRes,
  partyASignRes,
  refuseContractSignRes,
  getSignPriceRes,
  partyBCallPayRes,
  getFreeTimesRes,
  partyBSignRes
} from '../../api'
import { previewImage, toast } from '../../utils/uni'
import { ref } from 'vue'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import wechatIcon from '../../static/images/wechat.png'
import walletIcon from '../../static/images/wallet.png'
import { isNullOrWhitespace } from '../../utils/is'
import debounce from '../../utils/debounce'
import Signature from '../../components/Signature/index.vue'

const baseUrl = import.meta.env.VITE_BASE_API
const uploadUrl = `${baseUrl}/api/common/upload`

const appStore = useAppStore()
const { appToken, appUser } = storeToRefs(appStore)

const currentContract = ref({})
async function getCurrentContract(id) {
  const data = await getContractDetailsRes(id)
  currentContract.value = {
    ...(data || {}),
    template_sign_images: data?.template_sign_images?.map(
      (url) => `${url}?ts=${new Date().getTime()}`
    )
  }
}
onLoad(({ id }) => {
  getCurrentContract(id)
})

function onPreviewPDF() {
  const { template_sign_pdf } = currentContract.value
  if (isNullOrWhitespace(template_sign_pdf)) return
  uni.downloadFile({
    url: template_sign_pdf,
    success({ tempFilePath }) {
      const filePath = tempFilePath
      uni.openDocument({
        filePath,
        showMenu: true,
        fail(error) {
          console.log('error:openDocument', error)
        }
      })
    },
    fail(error) {
      console.log('error:downloadFile', error)
    }
  })
}

function onRefuseContractSign() {
  uni.showModal({
    content: `确定要拒签该合同吗？`,
    async success({ confirm }) {
      if (confirm) {
        await refuseContractSignRes(currentContract.value.id)
        uni.navigateBack()
      }
    }
  })
}

const signVisible = ref(false),
  signatureRef = ref(null),
  synthesizing = ref(false) // 是否正在合成
function onShowSignPopup() {
  signVisible.value = true
}
function signatureHandler(type) {
  if (type == 'save') {
    signatureRef.value.canvasToTempFilePath({
      success({ isEmpty, tempFilePath }) {
        if (!isEmpty) {
          synthesizing.value = true
          uni.uploadFile({
            url: uploadUrl,
            filePath: tempFilePath,
            name: 'file',
            header: {
              token: appToken.value,
              'content-type': 'multipart/form-data'
            },
            async success(result) {
              try {
                const {
                  code,
                  data: { url },
                  msg
                } = JSON.parse(result.data)
                if (code !== 1) {
                  toast(msg)
                } else {
                  const data = await (currentContract.value.status == 3
                    ? partyBSignRes({
                        sign_name: url,
                        id: currentContract.value.id
                      })
                    : partyASignRes({
                        sign_name: url,
                        id: currentContract.value.id
                      }))
                  currentContract.value = {
                    ...data,
                    template_sign_images: data?.template_sign_images?.map(
                      (url) => `${url}?ts=${new Date().getTime()}`
                    )
                  }
                  signVisible.value = false
                }
              } finally {
                synthesizing.value = false
              }
            },
            fail(error) {
              console.log('upload::error', error)
              synthesizing.value = false
              toast('上传失败！')
            }
          })
        }
      }
    })
    return
  }
  if (signatureRef.value) signatureRef.value[type]()

  return
}
function onSignClear(...args) {
  console.log(args, signatureRef.value)
}

function onShare() {
  uni.showShareMenu({
    async success(res) {
      console.log('success:showShareMenu', res)
      if (currentContract.value.status == 1) {
        // 只有当状态为待分享的时候才需要设置状态
        await changeContractStatusRes(currentContract.value.id)
        currentContract.value.status = '2'
      }
    },
    fail(res) {
      console.log('fail:showShareMenu', res)
    }
  })
}

onShareAppMessage(() => {
  const { id: contractId, template_name } = currentContract.value
  return {
    title: `这份${template_name}需要您补充信息，前往查看`,
    path: `/pages/contract/sign-invitation?contractId=${contractId}`,
    imageUrl: 'https://jsxyq.tuomuit.com/wechat/image/share.png',
    success(res) {
      console.log('success:onShareAppMessage', res)
    },
    fail(res) {
      console.log('fail:onShareAppMessage', res)
    }
  }
})

const payMethodPopupVisible = ref(false),
  signPrice = ref(0),
  selectedPayMethod = ref('wechat'),
  payMethods = computed(() => {
    return [
      {
        key: 'wechat',
        label: `微信支付（￥ ${signPrice.value}）`,
        icon: wechatIcon
      },
      {
        key: 'wallet',
        label: `次数支付（剩余 ${appUser.value.score} 次）`,
        icon: walletIcon
      }
    ]
  }),
  payLoading = ref(false)
async function onPartyBSign() {
  if (currentContract.value.pay_status == 0) {
    const times = await getFreeTimesRes()
    if (times == 0) {
      // 无需支付
      signVisible.value = true
    } else {
      // 合同未支付
      const price = await getSignPriceRes()
      signPrice.value = price
      payMethodPopupVisible.value = true
    }
  } else {
    signVisible.value = true
  }
}
function onSelectPayMethod(method) {
  if (selectedPayMethod.value == method.key) {
    // 取消选中
    selectedPayMethod.value = null
    return
  }
  if (method.key == 'wallet') {
    if (parseFloat(appUser.value.score) <= 0) {
      return toast('次数不足')
    }
  }
  selectedPayMethod.value = method.key
}
async function onPaySubmit() {
  try {
    payLoading.value = true
    const reqData = {
      id: currentContract.value.id,
      // 1 = 次数抵销；2 = 微信支付
      pay_type: selectedPayMethod.value == 'wechat' ? 2 : 1
    }
    const data = await partyBCallPayRes(reqData)
    if (data) {
      // 原生微信支付
      uni.requestPayment({
        ...data,
        async success(result) {
          console.log('用户支付扣款成功', result)
          payLoading.value = false
          payMethodPopupVisible.value = false
          currentContract.value.pay_status = 1
          setTimeout(() => {
            signVisible.value = true
          }, 1000)
        },
        fail(error) {
          console.log('用户支付扣款失败', error)
          payLoading.value = false
        }
      })
    } else {
      // 余额支付
      payLoading.value = false
      payMethodPopupVisible.value = false
      appStore.refreshAppUser()
      currentContract.value.pay_status = 1
      toast('支付成功')
      setTimeout(() => {
        signVisible.value = true
      }, 1000)
    }
  } catch {
    payLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.preview-wrap {
  image:last-child {
    margin-bottom: 10vh;
  }
}

::v-deep() {
  .signature {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .inner {
      position: relative;

      .text {
        position: absolute;
        /* #ifndef APP-NVUE */
        left: 50%;
        top: 50%;
        /* #endif */
        /* #ifdef APP-NVUE */
        left: 375rpx;
        top: 375rpx;
        /* #endif */
        font-size: 50rpx;
        color: #ddd;
        transform: translate(-50%, -50%);
        z-index: -1;
        transition: transform 300ms;
      }

      .lime-signature {
        height: 40vh;
        border: 2rpx solid #ddd;
      }
    }

    .btn {
      display: flex;
      justify-content: space-around;
      button {
        width: 45% !important;
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
</style>
