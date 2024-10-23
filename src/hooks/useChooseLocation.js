import { useAppStore } from '../stores/app'
import { qqMapWXInstance } from '../utils/location'

export function useChooseLocation() {
  const appStore = useAppStore()

  const originLocation = ref({}),
    arrivedLocation = ref({})
  function chooseLocation(type) {
    uni.chooseLocation({
      success: ({ latitude, longitude, address, name }) => {
        qqMapWXInstance.reverseGeocoder({
          location: `${latitude},${longitude}`,
          success: (response) => {
            const {
              result: {
                ad_info: { nation, province, city, district }
              }
            } = response
            if (type === 'origin') {
              originLocation.value = {
                nation,
                province,
                city,
                district: district || city,
                address,
                name,
                longitude,
                latitude
              }
              appStore.setOriginLocation(originLocation.value)
            } else if (type === 'arrived') {
              arrivedLocation.value = {
                nation,
                province,
                city,
                district: district || city,
                address,
                name,
                longitude,
                latitude
              }
              appStore.setArrivedLocation(arrivedLocation.value)
            }
          }
        })
      }
    })
  }

  return {
    originLocation,
    arrivedLocation,
    chooseLocation
  }
}
