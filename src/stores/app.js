import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoRes } from '../api'

export const useAppStore = defineStore('app', () => {
  const appUser = ref(uni.getStorageSync('APP_USER') || {})
  function setAppUser(value) {
    appUser.value = value
  }
  async function refreshAppUser() {
    const user = await getUserInfoRes()
    const newUserInfo = {
      ...user,
      totalMoney: (
        parseFloat(user.money) + parseFloat(user.gift_money)
      ).toFixed(2),
      token: appUser.value.token
    }
    setAppUser(newUserInfo)
    uni.setStorageSync('APP_USER', newUserInfo)
  }

  const merchantTel = ref(null)
  function setMerchantTel(value = {}) {
    merchantTel.value = value
  }

  const originLocation = ref({})
  function setOriginLocation(value = {}) {
    originLocation.value = value
  }

  const arrivedLocation = ref({})
  function setArrivedLocation(value = {}) {
    arrivedLocation.value = value
  }

  // 在线下单时选择的订单类型
  const orderType = ref(null)
  function setOrderType(value) {
    orderType.value = value
  }

  // 默认 `待报价` 枚举值，参考 ORDER_STATUS
  const subOrderActiveKey = ref('0')
  function setSubOrderActiveKey(value) {
    subOrderActiveKey.value = value
  }

  // 订单页是否已经初始化数据了
  // 场景：
  // 1、如果用户没有点过订单页的 Tab 标签,此时通过下单页面进行下单的话，默认会将 `orderPageWantedRefreshData` 设置为 true
  // 2、跳转到订单页的时候即会走 onShow 也会走 onLoad
  const orderPageAlreadyInitData = ref(false)
  function setOrderPageAlreadyInitData(value) {
    orderPageAlreadyInitData.value = value
  }

  // 订单页是否需要刷新数据
  const orderPageWantedRefreshData = ref(false)
  function setOrderPageWantedRefreshData(value) {
    orderPageWantedRefreshData.value = value
  }

  return {
    appUser,
    setAppUser,
    refreshAppUser,
    merchantTel,
    setMerchantTel,
    originLocation,
    setOriginLocation,
    arrivedLocation,
    setArrivedLocation,
    subOrderActiveKey,
    setSubOrderActiveKey,
    orderPageWantedRefreshData,
    setOrderPageWantedRefreshData,
    orderPageAlreadyInitData,
    setOrderPageAlreadyInitData,
    orderType,
    setOrderType
  }
})
