<template>
  <div class="relative">
    <div
      class="box-border p-[30rpx] overflow-y-scroll"
      :style="{ height: type == 2 ? '90vh' : '95vh' }">
      <div v-if="result.length > 0">
        <div
          class="box-border p-[30rpx] bg-[#fff] rounded-[10rpx] mb-[20rpx]"
          v-for="item in result"
          :key="item.id"
          @click="
            navTo(`/pages/me/complaint-details?type=${type}&key=${item.id}`)
          ">
          <div class="box-border px-[10rpx]">
            <div
              class="flex items-center justify-between text-[26rpx] mb-[20rpx]">
              <div class="text-[#A3A3A3] w-[140rpx]">处理状态：</div>
              <div
                class="text-right font-blod text-[#333]"
                :style="{
                  color: item.status == 0 ? '#ff0000' : '#6BBA5B'
                }">
                {{ item.status == 0 ? '处理中' : '已处理' }}
              </div>
            </div>

            <div
              v-if="item.order_number"
              class="flex items-center justify-between text-[26rpx] mb-[20rpx]"
              @click="copy(item.order_number)">
              <div class="text-[#A3A3A3] w-[140rpx]">订单编号：</div>
              <div class="text-right text-[#333]">
                {{ item.order_number }}
              </div>
            </div>
            <div
              class="flex items-center justify-between text-[26rpx] mb-[20rpx]">
              <div class="text-[#A3A3A3] w-[140rpx]">类型：</div>
              <div class="text-right text-[#333]">
                {{ item.type }}
              </div>
            </div>

            <div class="flex items-center justify-between text-[26rpx]">
              <div class="text-[#A3A3A3] min-w-[140rpx]">内容：</div>
              <div class="text-right text-[#333] break-all">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <nut-empty v-else image="empty" description="暂无数据">
        <template #image>
          <img src="../../static/images/no-data.png" />
        </template>
      </nut-empty>
    </div>

    <div
      v-if="type == 2"
      class="footer"
      @click="navTo('/pages/complaint/index')">
      提交意见反馈
    </div>
  </div>
</template>

<script setup>
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getComplaintsRes, getMyFeedbacksRes } from '../../api'
import { ref } from 'vue'
import { copy, navTo, previewImage } from '../../utils/uni'

const type = ref(1)
const result = ref([])
async function getResult() {
  const data =
    type.value == 1 ? await getComplaintsRes() : await getMyFeedbacksRes()
  result.value = data
}
onShow(() => {
  getResult()
})

onLoad((options) => {
  type.value = options.type
  uni.setNavigationBarTitle({
    title: options.type == 1 ? '我的订单投诉' : '我的意见反馈'
  })
})
</script>

<style lang="scss" scoped>
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
</style>
