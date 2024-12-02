<style lang="scss" scoped>
.complete-userinfo-wrap {
  ::v-deep {
    .nut-cell-group__wrap {
      margin: 0 !important;

      .nut-form-item__top {
        .nut-form-item__label {
          padding-bottom: 20rpx;
        }
      }
    }
    .nut-cell {
      .__uploaderWrap {
        display: flex;
        flex-wrap: wrap;

        .imagePreview {
          width: 377rpx;
          height: 256rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20rpx;
          margin-bottom: 20rpx;
          box-shadow: 0 4rpx 20rpx 0 rgba(0, 0, 0, 0.1);
          position: relative;

          image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 10rpx;
          }

          .nut-icon {
            position: absolute;
            top: -20rpx;
            right: -20rpx;
            color: rgba(0, 0, 0, 0.6) !important;
          }
        }

        .control {
          width: 377rpx;
          height: 256rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7f8fa;

          .nut-icon {
            color: rgba(0, 0, 0, 0.6) !important;
          }
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
        textarea {
          text-align: right !important;
          color: #333 !important;
        }
      }
    }
  }
}
</style>

<template>
  <AppContainer>
    <div class="complete-userinfo-wrap">
      <nut-form>
        <nut-form-item label="真实姓名">
          <nut-input
            v-model="userFormState.real_name"
            placeholder="请输入真实姓名"
            type="text" />
        </nut-form-item>
        <nut-form-item label="身份证号">
          <nut-input
            v-model="userFormState.id_card"
            placeholder="请输入身份证号"
            type="text" />
        </nut-form-item>
        <nut-form-item label-position="top" label="身份证正面图">
          <div class="__uploaderWrap">
            <div
              class="imagePreview"
              v-for="item in userFormState.id_card_front"
              :key="item.id">
              <image mode="aspectFit" :src="item.url" :alt="item.url" />
              <nut-icon
                name="circle-close"
                @click="onRemoveImage(item, 'id_card_front')" />
            </div>
            <div
              v-if="userFormState.id_card_front.length == 0"
              class="control"
              @click="onCustomUpload({ count: 1, type: 'id_card_front' })">
              <image
                mode="aspectFit"
                src="../../static/images/idCardFront.png" />
            </div>
          </div>
        </nut-form-item>
        <nut-form-item label-position="top" label="身份证反面图">
          <div class="__uploaderWrap">
            <div
              class="imagePreview"
              v-for="item in userFormState.id_card_back"
              :key="item.id">
              <image mode="aspectFit" :src="item.url" :alt="item.url" />
              <nut-icon
                name="circle-close"
                @click="onRemoveImage(item, 'id_card_back')" />
            </div>
            <div
              v-if="userFormState.id_card_back.length == 0"
              class="control"
              @click="onCustomUpload({ count: 1, type: 'id_card_back' })">
              <image
                mode="aspectFit"
                src="../../static/images/idCardBack.png" />
            </div>
          </div>
        </nut-form-item>
        <nut-form-item label="手机号">
          <nut-input
            v-model="userFormState.mobile"
            placeholder="请输入手机号"
            type="text"
            disabled />
        </nut-form-item>
      </nut-form>

      <div class="py-[40rpx] px-[20rpx]">
        <nut-button block size="large" type="primary" @click="onSubmit">
          提交
        </nut-button>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import { updateUserRes } from '../../api'
import { ref } from 'vue'
import AppContainer from '@/components/AppContainer/index'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { isNullOrWhitespace } from '../../utils/is'
import { toast } from '../../utils/uni'

const baseUrl = import.meta.env.VITE_BASE_API
const uploadUrl = `${baseUrl}/api/common/upload`

const appStore = useAppStore()
const { appUser, appToken } = storeToRefs(appStore)

const userFormState = ref({
  real_name: appUser.value.real_name,
  id_card: appUser.value.idcard,
  id_card_front: appUser.value.idcard_front
    ? [{ id: new Date().getTime(), url: appUser.value.idcard_front }]
    : [],
  id_card_back: appUser.value.idcard_back
    ? [{ id: new Date().getTime(), url: appUser.value.idcard_back }]
    : [],
  mobile: appUser.value.mobile
})

function onCustomUpload({ count, type }) {
  uni.chooseImage({
    count,
    success: function (chooseImageRes) {
      const tempFilePaths = chooseImageRes.tempFilePaths
      for (let i = 0; i < tempFilePaths.length; i++) {
        const path = tempFilePaths[i]
        uni.uploadFile({
          url: uploadUrl,
          filePath: path,
          name: 'file',
          header: {
            token: appToken.value,
            'content-type': 'multipart/form-data'
          },
          success: (result) => {
            if (count == 1) {
              userFormState.value[type] = []
            }
            const {
              code,
              data: { fullurl },
              msg
            } = JSON.parse(result.data)
            if (code !== 1) {
              toast(msg)
            } else {
              userFormState.value[type].push({
                id: new Date().getTime(),
                url: fullurl
              })
            }
          },
          fail: (uploadFileErr) => {
            console.log('upload::error', uploadFileErr)
            toast('上传失败！')
          }
        })
      }
    }
  })
}

function onRemoveImage(item, type) {
  userFormState.value[type] = userFormState.value[type].filter(
    (x) => x.id !== item.id
  )
}

async function onSubmit() {
  const reqData = {
    ...userFormState.value,
    id_card_front: userFormState.value.id_card_front.map((x) => x.url).join(),
    id_card_back: userFormState.value.id_card_back.map((x) => x.url).join()
  }

  if (Object.keys(reqData).some((key) => isNullOrWhitespace(reqData[key]))) {
    return toast('请填写完整信息再提交！')
  }
  await updateUserRes(reqData)
  toast('操作成功')
  appStore.refreshAppUser()
  uni.navigateBack()
}
</script>
