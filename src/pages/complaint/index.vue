<style lang="scss" scoped>
.complainWrap {
  ::v-deep {
    .nut-cell-group__wrap {
      margin: 0 !important;
    }
    .nut-cell {
      &:nth-child(2),
      &:nth-child(3) {
        .nut-cell__value {
          margin-right: 40rpx;
        }
      }

      .nut-input {
        padding: 0 !important;
        input {
          text-align: right !important;
          color: #333 !important;
        }
      }

      .nut-textarea {
        padding: 0 !important;
        textarea {
          text-align: right !important;
          color: #333 !important;
        }
      }

      .nut-uploader {
        .nut-uploader__preview-img,
        .nut-uploader__upload {
          width: 180rpx !important;
          height: 180rpx !important;
        }
      }
    }
  }
}
</style>

<template>
  <AppContainer>
    <div class="complainWrap">
      <nut-cell-group>
        <nut-cell title-width="80" is-link title="类型" @click="showTypePopup">
          <template #desc>
            <span :style="{ color: formState.type ? '#333' : '#808080' }">
              {{ formState.type ? formState.type : '请选择类型' }}
            </span>
          </template>
        </nut-cell>
        <nut-cell title-width="80" title="内容">
          <template #desc>
            <nut-textarea
              :border="false"
              placeholder="请输入内容"
              v-model="formState.content" />
          </template>
        </nut-cell>
        <nut-cell title-width="80" title="手机号码">
          <template #desc>
            <nut-input
              :border="false"
              type="tel"
              placeholder="请输入手机号码"
              v-model="formState.mobile" />
          </template>
        </nut-cell>
        <nut-cell>
          <template #default>
            <div class="mb-[20rpx]">反馈图片</div>
            <nut-uploader
              ref="uploaderRef"
              :url="uploadUrl"
              :headers="{
                token: appUser.token,
                'content-type': 'multipart/form-data'
              }"
              @success="onUploadSuccess"
              @delete="onDeleteFile" />
          </template>
        </nut-cell>
      </nut-cell-group>

      <div class="py-[40rpx] px-[20rpx]">
        <nut-button block type="primary" @click="onSubmit">提交</nut-button>
      </div>

      <nut-popup
        v-model:visible="typePopupVisible"
        position="bottom"
        safe-area-inset-bottom
        :close-on-click-overlay="false">
        <nut-picker
          v-model="selectedPickerValue"
          :columns="types"
          @confirm="onSelectComplainType"
          @cancel="typePopupVisible = false"></nut-picker>
      </nut-popup>
    </div>
  </AppContainer>
</template>

<script setup>
import { onLoad, onUnload } from '@dcloudio/uni-app'
import {
  addComplaintRes,
  addFeedbackRes,
  getComplaintTypesRes,
  getFeedbackTypesRes
} from '../../api'
import { reactive, ref } from 'vue'
import AppContainer from '@/components/AppContainer/index'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { toast } from '../../utils/uni'

const baseUrl = import.meta.env.VITE_BASE_API
const uploadUrl = `${baseUrl}/api/common/upload`

const appStore = useAppStore()
const { appUser } = storeToRefs(appStore)

const types = ref([]),
  typePopupVisible = ref(false)
const formState = reactive({
  type: null,
  content: null,
  mobile: appUser.value.mobile,
  images: []
})
const uploaderRef = ref(null)

function showTypePopup() {
  typePopupVisible.value = !typePopupVisible.value
}

function onSelectComplainType({ selectedValue }) {
  formState.type = selectedValue[0]
  showTypePopup()
}

function onUploadSuccess({ data, option, fileItem }) {
  const {
    code,
    data: { fullurl },
    msg
  } = JSON.parse(data.data)
  if (code !== 1) {
    toast(msg)
  } else {
    formState.images.push({
      id: fileItem.uid,
      url: fullurl
    })
  }
}

function onDeleteFile({ files, fileList, index }) {
  const fileIds = fileList.map((x) => x.uid)
  formState.images = formState.images.filter((file) =>
    fileIds.includes(file.id)
  )
}

async function onSubmit() {
  if (!formState.type) {
    return toast('请选择类型')
  }
  if (!formState.content) {
    return toast('请输入内容')
  }
  if (!formState.mobile) {
    return toast('请输入手机号码')
  }
  const reqData = {
    ...formState,
    images: formState.images.map((x) => x.url).join()
  }
  formState.order_number
    ? await addComplaintRes(reqData)
    : await addFeedbackRes(reqData)
  toast('提交成功！')
  if (formState.order_number) {
    appStore.setOrderPageWantedRefreshData(true)
    appStore.setSubOrderActiveKey('4')
  }
  uni.navigateBack()
}

onLoad(async ({ order_number }) => {
  uni.setNavigationBarTitle({
    title: order_number ? '订单投诉' : '意见反馈'
  })
  order_number && (formState.order_number = order_number)
  const data = order_number
    ? await getComplaintTypesRes()
    : await getFeedbackTypesRes()
  types.value = data.map((x) => ({ text: x, value: x }))
})

onUnload(() => {
  uploaderRef.value?.clearUploadQueue()
})
</script>
