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
    uni.switchTab({
      url: '/pages/home/index'
    })
  }

  const appName = ref(
    uni.getStorageSync('APP_NAME') ?? 'HAOWEN LAND 北京密云店'
  )
  async function getAppName() {
    const data = await getAppNameRes()
    setAppName(data)
  }

  function setAppName(value) {
    appName.value = value
    uni.setStorageSync('APP_NAME', value)
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
