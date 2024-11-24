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

  return {
    appUser,
    setAppUser,
    refreshAppUser
  }
})
