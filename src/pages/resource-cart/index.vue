<template>
  <AppContainer>
    <div class="relative min-h-screen h-screen bg-[#F7F9FC] __resourceCart">
      <div
        class="bg-[#fff] flex items-center justify-between box-border px-[30rpx]">
        <div
          class="flex items-center text-[24rpx]"
          @click="onNavToCitySelector">
          <image
            class="w-[32rpx] h-[32rpx] mr-[10rpx]"
            src="../../static/images/resource-cart/position.png"
            alt="" />
          <span>{{ currentCityName }}</span>
        </div>
        <nut-searchbar
          v-model="keyword"
          @search="onKeywordSearch"
          @clear="onKeywordSearch">
          <template #leftin>
            <nut-icon name="search2" size="24rpx" />
          </template>
        </nut-searchbar>
        <div
          class="flex items-center text-[24rpx] justify-end"
          @click="navTo(`/pages/resource-cart/form`)">
          <img
            class="w-[32rpx] h-[32rpx] mr-[10rpx]"
            src="../../static/images/resource-cart/plus.png"
            alt="" />
          <span>我要卖车</span>
        </div>
      </div>
      <div
        class="box-border px-[20rpx] mt-[20rpx] pb-[10vh]"
        v-if="cars.length > 0">
        <div
          v-for="car in cars"
          :key="car.id"
          @click="navTo(`/pages/resource-cart/details?id=${car.id}`)">
          <ResourceCar :data="car" />
        </div>
      </div>
      <div v-else class="h-[80vh]">
        <nut-empty image="empty" description="暂无资源车">
          <template #image>
            <img src="../../static/images/no-data.png" />
          </template>
        </nut-empty>
      </div>

      <div class="footer" @click="navTo('/pages/resource-cart/my')">
        我的资源车
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index.vue'
import ResourceCar from '@/components/ResourceCar/index'
import { onLoad, onReachBottom, onShow, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getCurrentLocation, QQMAXWX_KEY } from '../../utils/location'
import { getResourceCarsRes } from '../../api'
import { navTo } from '../../utils/uni'
import { isNullOrWhitespace } from '../../utils/is'
const citySelector = requirePlugin('citySelector')

let page = 1,
  isEnd = false
const keyword = ref(null),
  currentCityName = ref(null),
  cars = ref([])
async function getResourceCars() {
  const reqData = {
    page,
    limit: 5,
    cityname: currentCityName.value
  }
  if (!isNullOrWhitespace(keyword.value)) {
    reqData.keyword = keyword.value
  }
  const { data, total } = await getResourceCarsRes(reqData)
  cars.value = page === 1 ? data : cars.value.concat(data)
  if (total === cars.value.length) {
    isEnd = true
  }
}

function onKeywordSearch() {
  page = 1
  isEnd = false
  getResourceCars()
}

onReachBottom(() => {
  if (!isEnd) {
    page++
    getResourceCars()
  }
})

onLoad(async () => {
  const location = await getCurrentLocation()
  currentCityName.value = location?.city?.slice(0, -1)
  getResourceCars()
})

onShow(() => {
  const city = citySelector.getCity()
  if (city && city.name !== currentCityName.value) {
    page = 1
    isEnd = false
    currentCityName.value = city.name
    keyword.value = null
    getResourceCars()
  }
})

function onNavToCitySelector() {
  const referer = '车捷速' // 调用插件的app的名称
  uni.navigateTo({
    url: `plugin://citySelector/index?key=${QQMAXWX_KEY}&referer=${referer}`
  })
}

onUnload(() => {
  citySelector.clearCity()
})
</script>

<style lang="scss" scoped>
.__resourceCart {
  ::v-deep() {
    .nut-searchbar {
      width: 420rpx !important;
      padding-left: 10rpx !important;
      padding-right: 10rpx !important;
    }

    .nut-empty__box {
      width: 195rpx;
      height: 128rpx;
    }

    .nut-empty__description {
      margin-top: 30rpx;
    }
  }

  .footer {
    width: 100%;
    height: 10vh;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    font-size: 28rpx;
    color: #666;
    box-shadow: 0rpx -10rpx 20rpx #eeeeee;
  }
}
</style>
