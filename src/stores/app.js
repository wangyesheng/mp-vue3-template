import { getAppNameRes, getUserInfoRes } from '../api'

export const useAppStore = defineStore('app', () => {
  const appToken = ref(uni.getStorageSync('APP_TOKEN'))
  function setAppToken(value) {
    appToken.value = value
    uni.setStorageSync('APP_TOKEN', value)
  }

  const appUser = ref(uni.getStorageSync('APP_USER') || {})
  function setAppUser(value) {
    appUser.value = value
    uni.setStorageSync('APP_USER', value)
  }
  async function refreshAppUser() {
    const user = await getUserInfoRes()
    setAppUser(user)
  }

  function logout() {
    setAppToken(null)
    setAppUser({})
    uni.navigateTo({
      url: '/pages/login/index'
    })
  }

  const appName = ref(uni.getStorageSync('APP_NAME'))
  async function getAppName() {
    const data = await getAppNameRes()
    setAppName(data)
  }

  function setAppName(value) {
    appName.value = value
    uni.setStorageSync('APP_NAME', value)
  }

  const homeOrderListNeedRefresh = ref(false)

  function markHomeOrderListNeedRefresh() {
    homeOrderListNeedRefresh.value = true
  }
  /** 首页 onShow 调用：若为 true 则清空并返回 true，只消费一次 */
  function checkHomeOrderListNeedRefresh() {
    if (!homeOrderListNeedRefresh.value) return false
    homeOrderListNeedRefresh.value = false
    return true
  }

  return {
    appToken,
    setAppToken,
    appUser,
    setAppUser,
    refreshAppUser,
    logout,
    appName,
    getAppName,
    homeOrderListNeedRefresh,
    markHomeOrderListNeedRefresh,
    checkHomeOrderListNeedRefresh
  }
})
