import { toast } from './uni'
import http from './http'

http.setConfig({
  baseUrl: import.meta.env.VITE_BASE_API,
  showLoading: false
})

http.interceptor.request = (config) => {
  const appUser = uni.getStorageSync('APP_USER') || {}
  appUser.token && (config.header.token = appUser.token)
  return config // 如果 return 一个 false 值，则会取消本次请求
}

http.interceptor.response = (result) => {
  const { code, data } = result
  if (code == 1) {
    return data
  } else {
    return false
  }
}

const request = ({ url, method, data = {} }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await http[method.toLowerCase()](url, data)
      resolve(result)
    } catch (error) {
      console.log('request::error', error)
      let errerData = error
      if (error.statusCode) {
        // http 网络请求报错
        console.log(error.data)

        errerData = error.data
      } else {
        // 后台接口请求报错
      }
      // 如果 errMsg 有值代表是 uni.request 原生方法报错了
      // request:fail abort => 取消请求
      // request:fail timeout => 请求超时
      if (errerData.code === 401) {
        toast('请授权登录')
        uni.setStorageSync('APP_USER', {})
      } else {
        uni.showModal({
          title: '提示',
          content: errerData.msg,
          confirmText: '确定',
          showCancel: false,
          success: (res) => {}
        })
      }
      reject(errerData)
    }
  })
}

export default request
