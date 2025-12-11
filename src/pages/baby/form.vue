<template>
  <AppContainer>
    <div class="form-wrap">
      <nut-form label-position="top">
        <nut-form-item>
          <button
            class="avatar"
            open-type="chooseAvatar"
            @chooseavatar="onChooseAvatar">
            <image :src="babyFormData.avatar" mode="aspectFill" />
          </button>
        </nut-form-item>

        <nut-form-item label="宝贝昵称">
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
              :disabled="!canSave"
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
import { useAppStore } from '@/stores/app'
import debounce from '@/utils/debounce'
import { toast } from '@/utils/uni'

const baseUrl = import.meta.env.VITE_BASE_API
const uploadUrl = `${baseUrl}/api/common/upload`

const appStore = useAppStore()
const { appToken } = storeToRefs(appStore)

const genders = [
  { key: 1, label: '男' },
  { key: 0, label: '女' }
]

const babyFormData = ref({
    avatar: null,
    name: null,
    gender: 1,
    birthday: null
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
  canSave = computed(() => {
    const { avatar, name, birthday } = babyFormData.value
    return avatar && name && birthday
  }),
  loading = ref(false)

async function onChooseAvatar(e) {
  const {
    detail: { avatarUrl }
  } = e

  uni.uploadFile({
    url: uploadUrl,
    filePath: avatarUrl,
    name: 'file',
    header: {
      token: appToken.value,
      'content-type': 'multipart/form-data'
    },
    success: async (result) => {
      const {
        code,
        data: { fullurl },
        msg
      } = JSON.parse(result.data)
      if (code !== 1) {
        toast(msg)
      } else {
        babyFormData.value.avatar = fullurl
      }
    },
    fail: (uploadFileErr) => {
      console.log('upload::error', uploadFileErr)
      toast('上传失败！')
    }
  })
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
    loading.value = true
    await saveBabyInfoRes(babyFormData.value)
    uni.navigateBack()
  } finally {
    loading.value = false
  }
}

onLoad(async ({ id }) => {
  if (id) {
    babyFormData.value = await getBabyInfoRes(id)
  }
})
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
    background: url(https://hwly.tuomuit.com/wechat/img/baby-photo-bg.png?ts=2);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 220rpx;
    height: 220rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      border: none;
    }

    image {
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
    }
  }
}
</style>
