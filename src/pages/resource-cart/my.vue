<template>
  <AppContainer>
    <div class="relative min-h-screen bg-[#F7F9FC] box-border p-[20rpx]">
      <div v-if="cars.length > 0">
        <ResourceCar v-for="car in cars" :key="car.id" :data="car" type="2" />
      </div>

      <div v-else class="h-[80vh]">
        <nut-empty image="empty" description="暂无资源车">
          <template #image>
            <img src="../../static/images/no-data.png" />
          </template>
        </nut-empty>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index.vue'
import ResourceCar from '@/components/ResourceCar/index'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getMyResourceCarsRes } from '../../api'

const cars = ref([])
async function getResourceCars() {
  const data = await getMyResourceCarsRes()
  cars.value = data
}

onShow(() => {
  getResourceCars()
})
</script>

<style lang="scss" scoped></style>
