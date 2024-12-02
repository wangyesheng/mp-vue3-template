import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoRes } from '../api'

export const useAppStore = defineStore('app', () => {
  const appToken = ref(uni.getStorageSync('APP_TOKEN'))
  function setAppToken(value) {
    appToken.value = value
  }

  const appUser = ref(uni.getStorageSync('APP_USER') || {})
  function setAppUser(value) {
    appUser.value = value
  }
  async function refreshAppUser() {
    const user = await getUserInfoRes()
    setAppUser(user)
    uni.setStorageSync('APP_USER', user)
  }

  const currentTemplate = ref({})
  function setCurrentTemplate(value) {
    currentTemplate.value = value
  }

  return {
    appToken,
    setAppToken,
    appUser,
    setAppUser,
    refreshAppUser,
    currentTemplate,
    setCurrentTemplate
  }
})
