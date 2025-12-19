<template>
  <AppContainer>
    <nut-cell-group>
      <nut-cell title="头像">
        <template #desc>
          <button
            class="avatar"
            open-type="chooseAvatar"
            @chooseavatar="onChooseAvatar">
            <image :src="tempAvatar" mode="aspectFill" />
          </button>
        </template>
      </nut-cell>
      <nut-cell title="用户名">
        <template #desc>
          <nut-input
            v-model="appUser.nickname"
            placeholder="输入用户名"
            type="nickname"
            :border="false"
            input-align="right" />
        </template>
      </nut-cell>
      <nut-cell title="手机号">
        <template #desc>
          <nut-input
            v-model="appUser.mobile"
            placeholder="输入手机号"
            type="tel"
            :border="false"
            input-align="right" />
        </template>
      </nut-cell>
    </nut-cell-group>
    <div class="btn-wrap">
      <nut-button
        block
        plain
        type="primary"
        size="large"
        :disabled="!canSave"
        :loading="loading"
        @click="onSave">
        {{ loading ? '保存中...' : '确认保存' }}
      </nut-button>
    </div>
  </AppContainer>
</template>

<script setup>
import { toast } from '@/utils/uni'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { updateUserRes } from '@/api'

const baseUrl = import.meta.env.VITE_BASE_API
const uploadUrl = `${baseUrl}/api/common/upload`

const appStore = useAppStore()
const { appUser, appToken } = storeToRefs(appStore)
const canSave = computed(() => {
    const { nickname, mobile, avatar } = appUser.value
    return nickname && mobile && avatar
  }),
  tempAvatar = ref(appUser.value.avatar),
  loading = ref(false)

async function onChooseAvatar(e) {
  const {
    detail: { avatarUrl }
  } = e

  tempAvatar.value = avatarUrl

  uni.uploadFile({
    url: uploadUrl,
    filePath: avatarUrl,
    name: 'file',
    header: {
      token: appToken.value,
      'content-type': 'multipart/form-data'
    },
    success: async (result) => {
      const { code, data, msg } = JSON.parse(result.data)
      if (code !== 1) {
        toast(msg)
      } else {
        appUser.value.avatar = data.url
      }
    },
    fail: (uploadFileErr) => {
      console.log('upload::error', uploadFileErr)
      toast('上传失败！')
    }
  })
}

async function onSave() {
  try {
    loading.value = true
    const { nickname, mobile, avatar, id } = appUser.value
    await updateUserRes({ nickname, mobile, avatar, id })
    toast('更新成功！')
    appStore.refreshAppUser()
    uni.navigateBack()
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  width: 90%;
  margin: 40rpx auto 0;
}

::v-deep() {
  .nut-cell {
    align-items: center;

    &:first-child {
      .nut-cell__title {
        justify-content: center;
      }
    }
  }

  .nut-cell-group__wrap {
    margin: 0 !important;

    .nut-input {
      padding: 0 !important;

      .nut-input__input {
        font-size: 28rpx;
        color: #000 !important;
        font-weight: 550;
      }
    }

    .avatar {
      margin: 0;
      padding: 0;
      background: transparent !important;
      border: none !important;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      &::after {
        border: none;
      }

      image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
      }
    }
  }
}
</style>
