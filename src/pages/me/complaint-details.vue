<template>
  <div class="relative">
    <div class="box-border p-[30rpx] bg-[#fff] rounded-[10rpx]">
      <div class="box-border px-[10rpx]">
        <div class="flex items-center justify-between text-[26rpx] mb-[20rpx]">
          <div class="text-[#A3A3A3] w-[140rpx]">处理状态：</div>
          <div
            class="text-right font-blod text-[#333]"
            :style="{
              color: complaintDetails.status == 0 ? '#ff0000' : '#6BBA5B'
            }">
            {{ complaintDetails.status == 0 ? '处理中' : '已处理' }}
          </div>
        </div>
        <div
          v-if="complaintDetails.order_number"
          class="flex items-center justify-between text-[26rpx] mb-[20rpx]"
          @click="copy(complaintDetails.order_number)">
          <div class="text-[#A3A3A3] w-[140rpx]">订单编号：</div>
          <div class="text-right text-[#333]">
            {{ complaintDetails.order_number }}
          </div>
        </div>
        <div class="flex items-center justify-between text-[26rpx] mb-[20rpx]">
          <div class="text-[#A3A3A3] w-[140rpx]">类型：</div>
          <div class="text-right text-[#333]">
            {{ complaintDetails.type }}
          </div>
        </div>

        <div class="flex items-center justify-between text-[26rpx] mb-[20rpx]">
          <div class="text-[#A3A3A3] min-w-[140rpx]">内容：</div>
          <div class="text-right text-[#333] break-all">
            {{ complaintDetails.content }}
          </div>
        </div>
        <div class="flex items-center justify-between text-[26rpx] mb-[20rpx]">
          <div class="text-[#A3A3A3] w-[140rpx]">手机号：</div>
          <div class="text-right text-[#333]">
            {{ complaintDetails.mobile }}
          </div>
        </div>
        <div class="flex items-center justify-between text-[26rpx] mb-[20rpx]">
          <div class="text-[#A3A3A3] w-[140rpx]">提交时间：</div>
          <div class="text-right text-[#333]">
            {{ complaintDetails.createtime }}
          </div>
        </div>
        <div>
          <div class="text-[#A3A3A3] text-[26rpx] mb-[10rpx]">反馈图片：</div>
          <div class="flex flex-wrap" v-if="complaintDetails.images">
            <div
              class="w-[100rpx] h-[100rpx] mr-[20rpx]"
              v-for="(url, index) in complaintDetails.images_arr"
              :key="index"
              @click="previewImage(complaintDetails.images_arr)">
              <image
                class="max-w-full max-h-full object-contain rounded-[10rpx]"
                mode="aspectFit"
                :src="url"
                :alt="url" />
            </div>
          </div>
        </div>
        <div
          class="flex flex-col text-[26rpx] mt-[20rpx]"
          v-if="type == 1 && complaintDetails.status == 1">
          <div class="text-[#A3A3A3] w-[140rpx]">处理意见：</div>
          <div class="text-[#333] mt-[10rpx]">
            {{ complaintDetails.note }}
          </div>
        </div>
        <div
          class="flex flex-col text-[26rpx] mt-[20rpx]"
          v-if="type == 2 && complaintDetails.status == 1">
          <div class="text-[#A3A3A3] w-[140rpx]">回复：</div>
          <div class="box-border p-[10rpx] pt-0">
            <div
              class="mt-[10rpx]"
              v-for="item in complaintDetails.reply_list"
              :key="item.id">
              <div
                class="flex justify-between mb-[10rpx] text-[#333] text-[26rpx]">
                <span>{{ item.contact }}</span>
                <span>{{ item.createtime }}</span>
              </div>
              <div
                class="text-[#A3A3A3]"
                v-html="processRichtext(item.content)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { getComplaintDetailsRes, getFeedbackDetailsRes } from '../../api'
import { ref } from 'vue'
import { copy, previewImage } from '../../utils/uni'

const type = ref(1)
const complaintDetails = ref({})
async function getResult(key) {
  const data =
    type.value == 1
      ? await getComplaintDetailsRes(key)
      : await getFeedbackDetailsRes(key)
  complaintDetails.value = data
}

function processRichtext(content) {
  return content?.replace(/\<img/g, `<img style="width: 100%;"`)
}

onLoad((options) => {
  type.value = options.type
  uni.setNavigationBarTitle({
    title: options.type == 1 ? '订单投诉详情' : '意见反馈详情'
  })
  getResult(options.key)
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
