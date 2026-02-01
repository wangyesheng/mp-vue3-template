<template>
  <AppContainer>
    <div class="form-wrap">
      <nut-form label-position="top">
        <nut-form-item>
          <div class="flex flex-col items-center gap-y-[20rpx] relative">
            <button class="avatar" @click="onClickImage">
              <image
                v-if="babyFormData.avatar"
                :src="babyFormData.avatar"
                mode="aspectFill" />
            </button>
            <span
              v-if="!babyFormData.avatar"
              class="text-[#9675f3] text-[30rpx] font-[550] absolute top-[70%] right-0">
              未上传照片
            </span>
            <span class="text-[#999]">
              请上传宝贝真实照片，将用于核验入园！
            </span>
          </div>
        </nut-form-item>

        <nut-form-item label="宝贝真实姓名">
          <nut-input v-model="babyFormData.name" placeholder="请输入" />
        </nut-form-item>

        <nut-form-item label="宝贝性别">
          <div class="gender">
            <div
              v-for="item in genders"
              :key="item.key"
              :class="[
                `item${item.key}`,
                item.key == babyFormData.gender ? 'active' : ''
              ]"
              @click="onSelectGender(item)" />
          </div>
        </nut-form-item>

        <nut-form-item label="宝贝生日">
          <div class="birthday">
            <nut-input
              disabled
              placeholder="请选择"
              :model-value="birthdayText"
              @click="onShowDatePopup(true)" />
            <nut-icon name="rect-right" custom-color="#8153fe" />
          </div>
        </nut-form-item>

        <nut-form-item>
          <div class="w-full px-[2vw] mt-[5vh]">
            <nut-button
              block
              type="primary"
              size="large"
              :loading="loading"
              @click="debounce(onSave)">
              {{ loading ? '保存中...' : '确认保存' }}
            </nut-button>
          </div>
        </nut-form-item>
      </nut-form>
      <nut-popup
        v-model:visible="datePopupVisible"
        position="bottom"
        safe-area-inset-bottom>
        <nut-date-picker
          v-model="selectedDate"
          :min-date="minDate"
          :max-date="maxDate"
          is-show-chinese
          @cancel="onShowDatePopup(false)"
          @confirm="onDateConfirm" />
      </nut-popup>
    </div>
  </AppContainer>
</template>

<script setup>
import { saveBabyInfoRes, getBabyInfoRes } from '@/api'
import debounce from '@/utils/debounce'
import { pathToBase64, toast } from '@/utils/uni'

const genders = [
  { key: 1, label: '男' },
  { key: 0, label: '女' }
]

const babyFormData = ref({
    avatar: null,
    name: null,
    gender: 1,
    birthday: null,
    code: null
  }),
  datePopupVisible = ref(false),
  minDate = new Date(1990, 0, 1),
  maxDate = new Date(),
  selectedDate = ref(null),
  birthdayText = computed(() => {
    if (babyFormData.value.birthday) {
      const [y, m, d] = babyFormData.value.birthday.split('-')
      return `${y} 年 ${m} 月 ${d} 日`
    } else {
      return null
    }
  }),
  loading = ref(false)

async function onChooseImage() {
  uni.chooseImage({
    count: 1, // 最多拍摄数量
    sourceType: ['camera'], // 只使用相机
    sizeType: ['compressed'], // 压缩图片
    async success(res) {
      const tempFilePath = res.tempFilePaths[0]
      const path = await pathToBase64(tempFilePath)
      babyFormData.value.avatar = path
    },
    fail(err) {
      console.log('拍照失败:', err)
    }
  })
}

function onClickImage() {
  if (babyFormData.value.avatar) {
    uni.showActionSheet({
      itemList: ['预览照片', '重新拍照'],
      success(res) {
        if (res.tapIndex === 0) {
          uni.previewImage({
            current: babyFormData.value.avatar,
            urls: [babyFormData.value.avatar]
          })
        } else {
          onChooseImage()
        }
      }
    })
  } else {
    onChooseImage()
  }
}

function onSelectGender({ key }) {
  babyFormData.value.gender = key
}

function onShowDatePopup(value) {
  if (value && babyFormData.value.birthday) {
    const [y, m, d] = babyFormData.value.birthday.split('-')
    selectedDate.value = new Date(y, m - 1, d)
  }
  datePopupVisible.value = value
}

function onDateConfirm({ selectedValue }) {
  babyFormData.value.birthday = selectedValue.join('-')
  datePopupVisible.value = false
}

async function onSave() {
  try {
    const { avatar, name, birthday } = babyFormData.value
    if (!avatar) {
      return toast('请上传宝贝照片')
    }
    if (!name) {
      return toast('请填写宝贝姓名')
    }
    if (!birthday) {
      return toast('请选择宝贝生日')
    }
    loading.value = true
    await saveBabyInfoRes(babyFormData.value)
    uni.navigateBack()
  } finally {
    loading.value = false
  }
}

onLoad(
  async ({
    // 编辑回显查询信息用
    id,
    // 员工为客户添加宝贝用，code 可以是解析客户二维码得到的 code 信息，也可以是客户手机号
    code
  }) => {
    if (code) {
      babyFormData.value.code = code
    }
    if (id) {
      babyFormData.value = await getBabyInfoRes(id)
    }
  }
)
</script>

<style lang="scss" scoped>
.form-wrap {
  ::v-deep() {
    .nut-form {
      .nut-cell-group__wrap {
        background-color: transparent !important;
        box-shadow: none !important;

        .nut-cell {
          background: transparent !important;

          &::after {
            border-bottom: none !important;
          }

          .nut-cell__title {
            padding-bottom: 30rpx;
            font-size: 32rpx !important;
            color: #757575 !important;
          }

          .nut-form-item__body__slots {
            justify-content: center;
          }

          .nut-input {
            border: 2rpx solid var(--hw-primary-color) !important;
            height: 90rpx;
            border-radius: 90rpx;
            background: #fff !important;
            color: #000 !important;

            &:focus-within {
              border-width: 4rpx !important;
            }

            .nut-input__input {
              padding: 30rpx 50rpx;
              font-size: 32rpx;
              font-weight: bold;
            }

            .input-placeholder {
              font-size: 28rpx;
              font-weight: 500;
            }
          }

          .gender {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            view {
              background-size: 100% 100%;
              background-repeat: no-repeat;
              width: 317rpx;
              height: 168rpx;
            }

            .item1 {
              background-image: url(https://hwly.tuomuit.com/wechat/img/male.png);

              &.active {
                background-image: url(https://hwly.tuomuit.com/wechat/img/male-selected.png);
              }
            }

            .item0 {
              background-image: url(https://hwly.tuomuit.com/wechat/img/female.png);

              &.active {
                background-image: url(https://hwly.tuomuit.com/wechat/img/female-selected.png);
              }
            }
          }

          .birthday {
            width: 100%;
            position: relative;
            .nut-icon {
              position: absolute;
              top: 50%;
              right: 30rpx;
              transform: translateY(-50%);
            }
          }
        }
      }
    }
  }

  .avatar {
    margin: 0;
    padding: 0;
    background: url(https://hwly.tuomuit.com/wechat/img/baby-photo-bg.png?ts=123);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 300rpx;
    height: 300rpx;
    position: relative;

    &::after {
      border: none;
    }

    image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -45%);
    }
  }
}
</style>
