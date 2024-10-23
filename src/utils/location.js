import { getQQMapKeyRes } from '../api'
import QQMapWX from './qqmap-wx-jssdk.min'

export let QQMAXWX_KEY
export let qqMapWXInstance
export async function getQQMapWXInstance() {
  const qqMapKey = await getQQMapKeyRes()
  QQMAXWX_KEY = qqMapKey
  if (!qqMapWXInstance) {
    qqMapWXInstance = new QQMapWX({
      key: qqMapKey
    })
  }
  return qqMapWXInstance
}
getQQMapWXInstance()

export function getLocation(callback) {
  uni.authorize({
    scope: 'scope.userLocation',
    success: (_) => {
      uni.getLocation({
        success: async (res) => {
          callback({
            latitude: res.latitude,
            longitude: res.longitude
          })
        },
        fail(...args) {
          console.error(args)
          uni.showToast({
            icon: 'none',
            title: '获取失败，请重试'
          })
        }
      })
    },
    fail: (...args) => {
      console.error(args)
      uni.showModal({
        title: '温馨提示',
        content: '将获取您的具体位置信息，便于您更准确的选择代驾地点',
        success(res) {
          if (res.confirm) {
            uni.openSetting({
              success(res) {
                if (res.authSetting['scope.userLocation']) {
                  uni.getLocation({
                    success: async (res) => {
                      callback({
                        latitude: res.latitude,
                        longitude: res.longitude
                      })
                    }
                  })
                }
              }
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: '未授权位置信息'
            })
          }
        }
      })
    }
  })
}

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    getLocation(({ latitude, longitude }) => {
      qqMapWXInstance?.reverseGeocoder({
        location: `${latitude},${longitude}`,
        coord_type: 1,
        get_poi: 1,
        poi_options: 'policy=2;radius=600',
        success: (result) => {
          const {
            result: {
              ad_info: { nation, province, city, district },
              location,
              pois
            }
          } = result
          const [onePois] = pois
          resolve({
            nation,
            province,
            city,
            district: district || city,
            address: onePois && onePois.address,
            name: onePois && onePois.title,
            pois,
            longitude: location.lng,
            latitude: location.lat
          })
        },
        fail: (error) => {
          console.error(error)
          uni.showToast({
            icon: 'none',
            title: '获取位置信息失败，请重试'
          })
          reject(error)
        }
      })
    })
  })
}
