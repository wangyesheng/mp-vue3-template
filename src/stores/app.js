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
  }
  async function refreshAppUser() {
    const user = await getUserInfoRes()
    const newUserInfo = {
      ...user,
      token: appUser.value.token
    }
    setAppUser(newUserInfo)
    uni.setStorageSync('APP_USER', newUserInfo)
  }

  function logout() {
    setAppToken('')
    setAppUser({})
    uni.setStorageSync('APP_NAME', '')
    uni.setStorageSync('APP_TOKEN', '')
    uni.setStorageSync('APP_USER', {})
    uni.switchTab({
      url: '/pages/home/index'
    })
  }

  const appName = ref(uni.getStorageSync('APP_NAME') ?? 'HAOWEN LAND北京密云店')
  async function getAppName() {
    appName.value = await getAppNameRes()
    uni.setStorageSync('APP_NAME', appName.value)
  }

  return {
    appToken,
    setAppToken,
    appUser,
    setAppUser,
    refreshAppUser,
    logout,
    appName,
    getAppName
  }
})
