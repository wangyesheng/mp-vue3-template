import { ref } from 'vue'
import { decryUserPhoneRes, checkLoginRes } from '@/api'
import { useAppStore } from '@/stores/app'

export function useLogin() {
  const appStore = useAppStore()
  const bindMobileVisible = ref(false)
  let bindMobileUserProfile = {}

  async function login() {
    uni.showLoading({
      title: '授权登录中...',
      mask: true
    })
    try {
      const [{ userInfo }, code] = await Promise.all([
        new Promise((resolve, reject) => {
          uni.getUserProfile({
            provider: 'weixin',
            desc: '用于完善用户资料',
            success: (response) => {
              resolve(response)
            },
            fail: (err) => {
              reject(err)
            }
          })
        }),
        new Promise((resolve, reject) => {
          uni.login({
            provider: 'weixin',
            success: ({ code }) => {
              resolve(code)
            },
            fail: (err) => {
              reject(err)
            }
          })
        })
      ])

      if (userInfo && code) {
        bindMobileUserProfile = {
          current: userInfo,
          code
        }
        bindMobileVisible.value = true
      }
    } catch (error) {
      console.log('debugger::error_login', error)
      uni.hideLoading()
      uni.showToast({
        title: '微信登录授权失败',
        icon: 'none'
      })
    } finally {
      uni.hideLoading()
    }
  }

  async function getPhoneNumber(result) {
    const {
      detail: { encryptedData: encrypted_data, iv }
    } = result
    const { data, openid } = await decryUserPhoneRes({
      encrypted_data,
      iv,
      code: bindMobileUserProfile.code
    })
    await checkLogin(JSON.parse(data), openid)
  }

  async function checkLogin(phoneInfo, openid) {
    const reqData = {
      openid,
      nickname: bindMobileUserProfile.current.nickName,
      avatar: bindMobileUserProfile.current.avatarUrl,
      mobile: phoneInfo.phoneNumber
    }
    const { userinfo } = await checkLoginRes(reqData)
    const newUserInfo = {
      ...userinfo,
      totalMoney: (
        parseFloat(userinfo.money) + parseFloat(userinfo.gift_money)
      ).toFixed(2)
    }
    appStore.setAppUser(newUserInfo)
    uni.setStorageSync('APP_USER', newUserInfo)
    bindMobileVisible.value = false
  }

  return {
    bindMobileVisible,
    login,
    getPhoneNumber
  }
}
