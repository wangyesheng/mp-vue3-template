<style lang="scss" scoped>
.__placeOrder {
  .__form-item {
    background: #ebebeb;
    height: 90rpx;
    line-height: 90rpx;
    padding-left: 40rpx;
    padding-right: 30rpx;
    color: #7a7a7a;
    font-size: 28rpx;
    border-radius: 10rpx;

    label {
      display: block;
      width: 500rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .__form-item-hover {
    background: #f1f1f1 !important;

    image {
      transform: rotate(180deg) !important;
    }
  }

  ::v-deep() {
    .nut-divider {
      margin-top: 0 !important;
      margin-bottom: 56rpx !important;
      color: #212121 !important;
      font-size: 32rpx !important;

      &::before,
      &::after {
        border: 2rpx solid #e8e8e8 !important;
      }
    }
    .nut-input {
      padding: 0 !important;
      margin-bottom: 28rpx;
    }
    .nut-input__input {
      @extend .__form-item;
    }

    .nut-animate {
      margin-top: 20rpx;
      width: 100%;
    }
  }
}
</style>

<template>
  <AppContainer>
    <div class="relative min-h-screen bg-[#2759FC] overflow-auto __placeOrder">
      <div
        class="text-[#fff] absolute left-[32rpx] font-bold"
        :style="{
          top: `${headerTop}rpx`
        }">
        在线下单
      </div>
      <div
        class="absolute w-full box-border px-[30rpx]"
        :style="{
          top: `${contentTop}rpx`
        }">
        <div class="flex justify-between">
          <div class="self-center text-[#fff]">
            <p class="text-[36rpx] font-[400] text-center">快速获取报价</p>
            <p class="text-[68rpx]">专业运车</p>
          </div>
          <img
            class="w-[376rpx] h-[326rpx]"
            src="../../static/images/order/sign-order.png"
            alt="" />
        </div>

        <div
          class="bg-[#fff] rounded-[12rpx] box-border px-[36rpx] py-[46rpx] relative top-[-50rpx]">
          <nut-divider>在线下单</nut-divider>
          <SelectPicker
            title="请选择订单类型"
            :customStyle="{ marginBottom: '28rpx' }"
            :options="[
              { text: '代驾', value: '1' },
              { text: '物流', value: '2' }
            ]"
            v-model:value="orderInfo.order_type" />
          <div
            class="__form-item flex justify-between items-center mb-[28rpx]"
            hover-class="__form-item-hover"
            hover-stay-time="150"
            @click="() => chooseLocation('origin')">
            <span>
              {{ originLocationDesc }}
            </span>
            <img
              class="w-[19rpx] h-[11rpx]"
              src="../../static/images/order/arrow.png"
              alt="" />
          </div>
          <div
            class="__form-item flex justify-between items-center mb-[28rpx]"
            hover-class="__form-item-hover"
            hover-stay-time="150"
            @click="() => chooseLocation('arrived')">
            <span>
              {{ arrivedLocationDesc }}
            </span>
            <img
              class="w-[19rpx] h-[11rpx]"
              src="../../static/images/order/arrow.png"
              alt="" />
          </div>

          <SelectPicker
            title="请选择车型"
            :customStyle="{ marginBottom: '28rpx' }"
            :options="carTypes"
            v-model:value="orderInfo.vehicle_type" />
          <nut-input
            :border="false"
            v-model="orderInfo.user_name"
            placeholder="您的姓名" />
          <nut-input
            :border="false"
            v-model="orderInfo.user_phone"
            placeholder="您的手机号码" />

          <!-- <nut-animate loop type="ripple" duration="1000"> -->
          <nut-button
            block
            type="primary"
            size="large"
            @click="debounce(onSubmit)">
            立即下单
          </nut-button>
          <!-- </nut-animate> -->

          <div class="text-[24rpx] text-center mt-[34rpx]">
            联系电话：{{ merchantTel }}
          </div>
        </div>

        <div class="mb-[40rpx] flex justify-between">
          <div
            class="w-[312rpx] h-[80rpx] rounded-[8rpx] bg-[#fff] flex justify-center items-center text-[22rpx]"
            hover-class="bg-[#f2f2f2]"
            hover-stay-time="150"
            @click="copy(merchantTel, '微信号复制成功')">
            <img
              class="w-[32rpx] h-[32rpx] mr-[28rpx]"
              src="../../static/images/order/wechat.png"
              alt="" />
            <span>联系微信</span>
          </div>
          <div
            class="w-[312rpx] h-[80rpx] rounded-[8rpx] bg-[#fff] flex justify-center items-center text-[22rpx]"
            hover-class="bg-[#f2f2f2]"
            hover-stay-time="150"
            @click="callPhone(merchantTel)">
            <img
              class="w-[24rpx] h-[32rpx] mr-[28rpx]"
              src="../../static/images/order/phone.png"
              alt="" />
            <span>联系电话</span>
          </div>
        </div>
      </div>
    </div>
  </AppContainer>
</template>
<script setup>
import AppContainer from '@/components/AppContainer/index'
import { computed, ref, watch } from 'vue'
import { calcMenuButton } from '../../utils/calcMenuButton'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { useChooseLocation } from '../../hooks/useChooseLocation'
import SelectPicker from '@/components/SelectPicker/index'
import { createOrderRes, getCarTypesRes, getTemplateIdsRes } from '../../api'
import { onLoad } from '@dcloudio/uni-app'
import { isEmpty, isNullOrWhitespace } from '../../utils/is'
import { callPhone, copy, toast } from '../../utils/uni'
import testUtil from '../../utils/test'
import { useToast } from 'nutui-uniapp/composables'
import debounce from '../../utils/debounce'

const [headerTop, contentTop] = calcMenuButton()

const appStore = useAppStore()
const { arrivedLocation, originLocation, orderType, merchantTel, appUser } =
  storeToRefs(appStore)
const { chooseLocation } = useChooseLocation()

const originLocationDesc = computed(() =>
  originLocation.value.city
    ? `${originLocation.value.city}-${originLocation.value.name}`
    : '起始地'
)

const arrivedLocationDesc = computed(() =>
  arrivedLocation.value.city
    ? `${arrivedLocation.value.city}-${arrivedLocation.value.name}`
    : '目的地'
)

const { success } = useToast()

const orderInfo = ref({
  order_type: null,
  vehicle_type: null,
  user_name: null,
  user_phone: appStore.appUser.mobile
})

const carTypes = ref([])
async function getCarTypes() {
  const data = await getCarTypesRes()
  carTypes.value = data?.map((text) => ({
    text,
    value: text
  }))
}

watch(
  () => orderType.value,
  (newType) => {
    orderInfo.value.order_type = newType
  },
  {
    immediate: true
  }
)

function onSubmit() {
  if (!appUser.value.id) {
    return toast('请授权登录')
  }
  placeOrder()
}

async function placeOrder() {
  if (isEmpty(originLocation.value)) {
    return toast('请选择起始地')
  }
  if (isEmpty(arrivedLocation.value)) {
    return toast('请选择目的地')
  }
  if (isNullOrWhitespace(orderInfo.value.vehicle_type)) {
    return toast('请选择车型')
  }
  if (isNullOrWhitespace(orderInfo.value.user_name)) {
    return toast('请输入您的姓名')
  }
  if (isNullOrWhitespace(orderInfo.value.user_phone)) {
    return toast('请输入您的手机号')
  }

  if (!testUtil.mobile(orderInfo.value.user_phone)) {
    return toast('请输入正确的手机号')
  }

  const {
    province: sendProvince,
    city: sendCity,
    district: sendDistrict,
    address: sendAddress,
    name: send_address_name,
    longitude: sendLng,
    latitude: sendLat
  } = originLocation.value
  const {
    province: receiveProvince,
    city: receiveCity,
    district: receiveDistrict,
    address: receiveAddress,
    name: receive_address_name,
    longitude: receiveLng,
    latitude: receiveLat
  } = arrivedLocation.value

  const reqData = {
    send_city: `${sendProvince}/${sendCity}/${sendDistrict}`,
    send_address: sendAddress,
    send_address_name,
    send_lng: sendLng,
    send_lat: sendLat,

    receive_city: `${receiveProvince}/${receiveCity}/${receiveDistrict}`,
    receive_address: receiveAddress,
    receive_address_name,
    receive_lng: receiveLng,
    receive_lat: receiveLat,

    ...orderInfo.value
  }

  await createOrderRes(reqData)
  success('下单成功')
  appStore.setArrivedLocation()
  appStore.setOriginLocation()
  appStore.setOrderPageWantedRefreshData(true)
  appStore.setActiveOrderType(orderInfo.value.order_type)
  appStore.setSubOrderActiveKey('0')
  appStore.setOrderType(null)
  orderInfo.value = {
    order_type: null,
    vehicle_type: null,
    user_name: null,
    user_phone: appStore.appUser.mobile
  }
  uni.switchTab({ url: '/pages/order/index' })
}

onLoad(() => {
  getCarTypes()
})
</script>
