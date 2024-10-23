<style lang="scss" scoped>
.complainWrap {
  ::v-deep {
    .nut-cell-group__wrap {
      margin: 0 !important;
    }
    .nut-cell {
      .__uploaderWrap {
        display: flex;
        flex-wrap: wrap;

        .imagePreview {
          width: 180rpx;
          height: 180rpx;
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
          width: 180rpx;
          height: 180rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7f8fa;

          .nut-icon {
            color: rgba(0, 0, 0, 0.6) !important;
          }
        }
      }
      // &:nth-child(2),
      // &:nth-child(3) {
      //   .nut-cell__value {
      //     margin-right: 40rpx;
      //   }
      // }

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
      <nut-form>
        <nut-form-item label="标题">
          <nut-input
            v-model="carFormState.title"
            placeholder="请输入标题"
            type="text" />
        </nut-form-item>
        <nut-form-item label="上牌时间">
          <nut-input
            disabled
            v-model="carFormState.card_time"
            placeholder="请选择上牌时间"
            type="text"
            @click="onShowDatePicker" />
        </nut-form-item>
        <nut-form-item label="表显里程">
          <nut-input
            v-model="carFormState.mileage"
            placeholder="请输入表显里程"
            type="number" />
        </nut-form-item>
        <nut-form-item label="归属地">
          <nut-input
            disabled
            v-model="carFormState.on_city"
            placeholder="请选择归属地"
            type="text"
            @click="onShowChinaCascader" />
        </nut-form-item>
        <nut-form-item label="过户次数">
          <nut-input
            v-model="carFormState.pass_times"
            placeholder="请输入过户次数"
            type="number" />
        </nut-form-item>
        <nut-form-item label="总价格">
          <nut-input
            v-model="carFormState.price"
            placeholder="请输入总价格"
            type="digit" />
        </nut-form-item>
        <nut-form-item label="首付价格">
          <nut-input
            v-model="carFormState.first_price"
            placeholder="请输入首付价格"
            type="digit" />
        </nut-form-item>
        <nut-form-item label="车况描述">
          <nut-textarea
            v-model="carFormState.description"
            placeholder="请输入车况描述"
            type="text" />
        </nut-form-item>
        <nut-form-item label="联系电话">
          <nut-input
            v-model="carFormState.phone"
            placeholder="请输入联系电话"
            type="tel" />
        </nut-form-item>
        <nut-form-item label-position="top" label="车辆正面图">
          <div class="__uploaderWrap">
            <div
              class="imagePreview"
              v-for="item in carFormState.image"
              :key="item.id">
              <image mode="aspectFit" :src="item.url" :alt="item.url" />
              <nut-icon
                name="circle-close"
                @click="onRemoveImage(item, 'image')" />
            </div>
            <div
              v-if="carFormState.image.length == 0"
              class="control"
              @click="onCustomUpload({ count: 1, type: 'image' })">
              <nut-icon name="photograph" />
            </div>
          </div>
        </nut-form-item>
        <nut-form-item label-position="top" label="车辆其他图片">
          <div class="__uploaderWrap">
            <div
              class="imagePreview"
              v-for="item in carFormState.images"
              :key="item.id">
              <image mode="aspectFit" :src="item.url" :alt="item.url" />
              <nut-icon
                name="circle-close"
                @click="onRemoveImage(item, 'images')" />
            </div>
            <div
              class="control"
              @click="onCustomUpload({ count: 9, type: 'images' })">
              <nut-icon name="photograph" />
            </div>
          </div>
        </nut-form-item>
      </nut-form>

      <div class="py-[40rpx] px-[20rpx]">
        <nut-button block type="primary" @click="onSubmit">提交</nut-button>
      </div>

      <nut-popup
        v-model:visible="datePickerVisible"
        position="bottom"
        safe-area-inset-bottom>
        <nut-date-picker
          v-model="selectedDate"
          :max-date="maxDate"
          @confirm="onDatePickerConfirm"
          @cancel="datePickerVisible = false" />
      </nut-popup>

      <nut-cascader
        title="选择归属地"
        v-model:visible="chinaCascaderVisible"
        v-model="selectedCityValue"
        value-key="name"
        text-key="name"
        :title-ellipsis="false"
        :options="chinaGeoJson"
        @change="onSelectedCityChange" />
    </div>
  </AppContainer>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import {
  addOrUpdateResourceCarRes,
  getChinaGeoJsonRes,
  getSingleResourceCarRes
} from '../../api'
import { ref } from 'vue'
import AppContainer from '@/components/AppContainer/index'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { setNavigationBarTitle, toast } from '../../utils/uni'
import { isNullOrWhitespace } from '../../utils/is'

const baseUrl = import.meta.env.VITE_BASE_API
const uploadUrl = `${baseUrl}/api/common/upload`

const { appUser } = storeToRefs(useAppStore())

const carFormState = ref({
    title: null,
    card_time: null,
    mileage: null,
    on_city: null,
    pass_times: null,
    price: null,
    first_price: null,
    description: null,
    phone: appUser.value.mobile,
    image: [],
    images: []
  }),
  datePickerVisible = ref(false),
  selectedDate = ref(new Date()),
  maxDate = new Date(),
  chinaCascaderVisible = ref(false),
  chinaGeoJson = ref([]),
  selectedCityValue = ref([])

function onShowDatePicker(value) {
  if (!isNullOrWhitespace(carFormState.value.card_time)) {
    selectedDate.value = new Date(carFormState.value.card_time)
  }
  datePickerVisible.value = value
}
function onDatePickerConfirm({ date, selectedValue, selectedOptions }) {
  const [year, month, day] = selectedValue
  carFormState.value.card_time = `${year}-${month}-${day}`
  onShowDatePicker(false)
}

async function onShowChinaCascader() {
  if (chinaGeoJson.value.length === 0) {
    chinaGeoJson.value = await getChinaGeoJsonRes()
  }
  if (!isNullOrWhitespace(carFormState.value.on_city)) {
    selectedCityValue.value = carFormState.value.on_city.split('/')
  }
  chinaCascaderVisible.value = true
}
function onSelectedCityChange(value) {
  carFormState.value.on_city = value.join('/')
}

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
            token: appUser.value.token,
            'content-type': 'multipart/form-data'
          },
          success: (result) => {
            if (count == 1) {
              carFormState.value[type] = []
            }
            const {
              code,
              data: { fullurl },
              msg
            } = JSON.parse(result.data)
            if (code !== 1) {
              toast(msg)
            } else {
              carFormState.value[type].push({
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
  carFormState.value[type] = carFormState.value[type].filter(
    (x) => x.id !== item.id
  )
}

async function onSubmit() {
  const reqData = {
    ...carFormState.value,
    image: carFormState.value.image.map((x) => x.url).join(),
    images: carFormState.value.images.map((x) => x.url).join()
  }
  delete reqData.images_arr
  if (Object.keys(reqData).some((key) => isNullOrWhitespace(reqData[key]))) {
    return toast('请填写完整信息再提交！')
  }
  await addOrUpdateResourceCarRes(reqData)
  toast(reqData.id ? '编辑成功' : '新增成功')
  uni.navigateBack()
}

onLoad(async ({ id }) => {
  setNavigationBarTitle(id ? '编辑车辆' : '新增车辆')
  if (id) {
    const data = await getSingleResourceCarRes(id)
    carFormState.value = {
      ...data,
      image: data.image.split(',').map((url, index) => ({ id: index, url })),
      images: data.images.split(',').map((url, index) => ({ id: index, url }))
    }
  }
})
</script>
