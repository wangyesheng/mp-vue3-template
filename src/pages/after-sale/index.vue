<template>
  <AppContainer custom-class="after-sale-page">
    <div class="hero">
      <div class="hero__title">申请售后</div>
      <div class="hero__sub">填写信息后提交，我们将尽快与您联系</div>
    </div>

    <div class="sheet">
      <div class="field">
        <div class="field__head">
          <span class="field__label">问题描述</span>
          <span class="field__hint">请尽量详细说明情况</span>
        </div>
        <div class="field__body field__body--textarea">
          <nut-textarea
            v-model="afterSaleInfo.problem_desc"
            limit-show
            autosize
            placeholder="例如：施工后出现气泡、边角起翘等"
            :rows="5"
            :max-length="500" />
        </div>
      </div>

      <div class="field">
        <div class="field__head">
          <span class="field__label">问题图片</span>
          <span class="field__hint">最多 3 张</span>
        </div>
        <div class="field__body">
          <div class="uploader-row">
            <div
              v-for="(url, index) in afterSaleInfo.images"
              :key="`${url}-${index}`"
              class="uploader-slot uploader-slot--image"
              @click="onClickImage(index)">
              <image mode="aspectFill" :src="url" />
            </div>
            <div
              v-if="afterSaleInfo.images.length < 3"
              class="uploader-slot uploader-slot--add"
              @click="onChooseImage(null)">
              <span class="i-mdi-camera uploader-slot__icon" />
              <span class="uploader-slot__hint">拍摄/选取</span>
            </div>
          </div>
        </div>
      </div>

      <div class="field field--row">
        <span class="field__label field__label--fixed">联系人</span>
        <nut-input
          v-model="afterSaleInfo.contact_name"
          placeholder="请输入姓名"
          input-align="right"
          :border="false" />
      </div>

      <div class="divider" />

      <div class="field field--row">
        <span class="field__label field__label--fixed">联系电话</span>
        <nut-input
          v-model="afterSaleInfo.contact_phone"
          placeholder="请输入手机号"
          type="tel"
          input-align="right"
          :border="false" />
      </div>
    </div>

    <div class="footer">
      <nut-button
        block
        size="large"
        type="primary"
        custom-color="linear-gradient(135deg, #1890ff 0%, #096dd9 100%)"
        :loading="loading"
        @click="onSubmit">
        提交申请
      </nut-button>
    </div>
  </AppContainer>
</template>

<script setup>
import { toast } from '@/utils/uni'
import { useAppStore } from '@/stores/app'
import { useUploader } from '@/hooks/useUploader'
import { afterSaleSubmitRes } from '@/api'
import test from '@/utils/test'

const appStore = useAppStore()
const { appUser } = storeToRefs(appStore)
const { upload } = useUploader()

const afterSaleInfo = ref({
    order_id: '',
    problem_desc: '',
    images: [],
    contact_name: '',
    contact_phone: ''
  }),
  loading = ref(false)

function onChooseImage(index) {
  uni.chooseImage({
    count: index !== null ? 1 : 3 - afterSaleInfo.value.images.length, // 最多拍摄数量
    sourceType: ['camera', 'album'], // 只使用相机+相册选取
    sizeType: ['compressed'], // 压缩图片
    async success(res) {
      const data = await Promise.all(
        res.tempFilePaths.map((path) => upload(path))
      )

      if (index !== null) {
        afterSaleInfo.value.images[index] = data[0].fullUrl
        console.log(afterSaleInfo.value.images)
      } else {
        data.forEach(({ fullUrl }) => {
          afterSaleInfo.value.images.push(fullUrl)
        })
      }
    },
    fail(err) {
      console.log('拍照失败:', err)
    }
  })
}

function onClickImage(index) {
  uni.showActionSheet({
    itemList: ['预览照片', '重新拍照'],
    success(res) {
      if (res.tapIndex === 0) {
        uni.previewImage({
          index,
          urls: afterSaleInfo.value.images
        })
      } else {
        onChooseImage(index)
      }
    }
  })
}

onLoad((options) => {
  afterSaleInfo.value.order_id = options.id
  afterSaleInfo.value.contact_name = appUser.value.nickname
  afterSaleInfo.value.contact_phone = appUser.value.mobile
})

async function onSubmit() {
  if (!afterSaleInfo.value.problem_desc.trim()) {
    toast('请填写问题描述')
    return
  }
  if (afterSaleInfo.value.images.length == 0) {
    toast('请填写上传问题图片')
    return
  }
  if (!afterSaleInfo.value.contact_name.trim()) {
    toast('请填写联系人')
    return
  }
  if (!test.mobile(afterSaleInfo.value.contact_phone.replace(/\s/g, ''))) {
    toast('请输入正确的手机号')
    return
  }

  try {
    loading.value = true
    await afterSaleSubmitRes({
      ...afterSaleInfo.value,
      images: afterSaleInfo.value.images.join(',')
    })
    appStore.markHomeOrderListNeedRefresh()
    uni.navigateBack()
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.after-sale-page {
  background: linear-gradient(180deg, #e8f4ff 0%, #f5f6fa 28%, #f5f6fa 100%);
  min-height: 100vh;
}

.hero {
  padding: 48rpx 40rpx 32rpx;

  &__title {
    font-size: 44rpx;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: 1rpx;
  }

  &__sub {
    margin-top: 12rpx;
    font-size: 26rpx;
    color: #64748b;
    line-height: 1.5;
    max-width: 92%;
  }
}

.sheet {
  margin: 0 32rpx;
  padding: 8rpx 0 32rpx;
  background: #fff;
  border-radius: 28rpx;
  box-shadow: 0 12rpx 48rpx rgba(24, 144, 255, 0.08);
  overflow: hidden;
}

.field {
  padding: 28rpx 32rpx 20rpx;

  &--row {
    display: flex;
    align-items: center;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
  }

  &__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 16rpx;
  }

  &__label {
    font-size: 30rpx;
    font-weight: 600;
    color: #1e293b;

    &--fixed {
      flex-shrink: 0;
      width: 160rpx;
      margin-bottom: 0;
    }
  }

  &__hint {
    font-size: 22rpx;
    color: #94a3b8;
  }

  &__body {
    &--textarea {
      background: #f8fafc;
      border-radius: 16rpx;
      padding: 8rpx 0;
      overflow: hidden;
    }

    .uploader-row {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 20rpx;
    }

    .uploader-slot {
      flex: 1;
      min-width: 0;
      height: 200rpx;
      border-radius: 20rpx;
      box-sizing: border-box;
      padding: 20rpx;
    }

    .uploader-slot--image {
      overflow: hidden;
      border: 2rpx solid #e5e7eb;
      background: #f8fafc;

      image {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .uploader-slot--add {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      border: 2rpx dashed #cbd5e1;
    }

    .uploader-slot__icon {
      margin-bottom: 15rpx;
      font-size: 44rpx;
      color: #64748b;
    }

    .uploader-slot__hint {
      font-size: 26rpx;
      color: #94a3b8;
    }
  }
}

.divider {
  height: 1rpx;
  background: #f1f5f9;
  margin: 0 32rpx;
}

.footer {
  padding: 48rpx 48rpx 32rpx;
}

:deep(.nut-textarea) {
  background: transparent;
  padding: 16rpx 20rpx;
}

:deep(.nut-textarea__textarea) {
  font-size: 28rpx;
  color: #334155;
  min-height: 200rpx;
}

:deep(.field--row .nut-input) {
  flex: 1;
  padding: 0 !important;
}

:deep(.field--row .nut-input__input) {
  font-size: 28rpx;
  color: #334155;
  font-weight: 500;
}
</style>
