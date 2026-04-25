import { navTo } from '@/utils/uni'
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
    navTo('/pages/login/index', false)
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

  const needRefresh = ref(false)
  function markNeedRefresh() {
    needRefresh.value = true
  }
  /** 页面 onShow 调用：若为 true 则清空并返回 true，只消费一次，一般是副作用接口保存成功返回上一个页面时触发 */
  function checkNeedRefresh() {
    if (!needRefresh.value) return false
    needRefresh.value = false
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
    needRefresh,
    markNeedRefresh,
    checkNeedRefresh
  }
})
