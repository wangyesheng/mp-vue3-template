<template>
  <div class="baby-item">
    <div :class="['inner', selected ? 'selected' : '']">
      <div class="left">
        <image :src="data.avatar" mode="aspectFit" @click.stop="onPreview" />
        <div class="right">
          <div class="top">
            <span class="name">{{ data.name }}</span>
            <image
              :src="data.gender == 1 ? boyIcon : grilIcon"
              mode="aspectFill" />
          </div>
          <div class="tag">
            <nut-tag custom-color="#f5f5f5" text-color="#999">
              {{ getAge(data.birthday) }}
            </nut-tag>
          </div>
        </div>
      </div>
      <div v-if="action" class="right">
        <nut-icon
          name="edit"
          custom-color="#8153fe"
          @click="navTo(`/pages/baby/form?id=${data.id}`)" />
        <nut-icon
          name="del2"
          custom-color="#ff0000"
          @click="onDeleteBaby(data.id)" />
      </div>
      <div v-if="faceVerify" class="right">
        <nut-button plain type="primary" size="small" @click="handleVerifyFace">
          人脸比对
        </nut-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deleteBabyRes, verifyFaceRes } from '@/api'
import boyIcon from '@/static/images/me/boy.png'
import grilIcon from '@/static/images/me/gril.png'
import { navTo, pathToBase64 } from '@/utils/uni'
import dayjs from 'dayjs'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  selected: {
    type: Boolean,
    default: false
  },
  action: {
    type: Boolean,
    default: false
  },
  faceVerify: {
    type: Boolean,
    default: false
  },
  raw: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['refresh'])

function onPreview() {
  uni.previewImage({
    current: props.data.avatar,
    urls: [props.data.avatar]
  })
}

function getAge(birthday) {
  return dayjs().diff(dayjs(birthday), 'year') + '岁'
}

function onDeleteBaby(id) {
  uni.showModal({
    title: '提示',
    content: '确认要删除该宝贝吗？',
    async success({ confirm }) {
      if (confirm) {
        await deleteBabyRes(id)
        emit('refresh')
      }
    }
  })
}

function handleVerifyFace() {
  // 拉起相机进行人脸比对
  uni.chooseImage({
    count: 1,
    sourceType: ['camera'],
    sizeType: ['compressed'],
    async success(res) {
      const tempFilePath = res.tempFilePaths[0]
      const path = await pathToBase64(tempFilePath)
      const data = await verifyFaceRes({
        user_baby_id: props.data.id,
        image_base64: path
      })
      navTo(
        `/pages/scan/result?result=${data ? 'success' : 'fail'}&facePhoto=${path}&babies=${JSON.stringify(props.data)}&orderId=${props.raw.id}&max=${props.raw.residue_quantity}`
      )
    },
    fail(err) {
      console.log('拍照失败:', err)
    }
  })
}
</script>

<style lang="scss" scoped>
.baby-item {
  position: relative;

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.selected {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 48rpx;
        height: 48rpx;
        background-image: url(https://hwly.tuomuit.com/wechat/img/selected.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }

    .left {
      flex: 1;
      display: flex;
      align-items: center;
      column-gap: 20rpx;

      image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 10rpx;
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        row-gap: 10rpx;

        .top {
          display: flex;
          align-items: center;
          column-gap: 20rpx;

          .name {
            font-size: 34rpx;
            color: #333;
            font-weight: 550;
          }

          image {
            width: 24rpx;
            height: 24rpx;
          }
        }

        .tag {
          ::v-deep() {
            .nut-tag {
              width: fit-content !important;
            }
          }
        }
      }
    }

    & > .right {
      display: flex;
      align-items: center;
      column-gap: 20rpx;
    }
  }
}
</style>
