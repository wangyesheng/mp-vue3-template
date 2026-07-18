<template>
  <AppContainer>
    <div :class="['__result', resultState]">
      <!-- ====== 状态印章 ====== -->
      <div class="stamp-section">
        <div class="stamp-ring">
          <div class="stamp-face">
            <span class="stamp-word">{{ stampWord }}</span>
            <span class="stamp-sub">{{ stampSub }}</span>
          </div>
        </div>
        <div class="stamp-desc">{{ stampDesc }}</div>
      </div>

      <!-- ====== 对比照片 ====== -->
      <div class="divider"></div>

      <div class="photo-compare">
        <!-- 人脸识别抓拍 -->
        <div class="photo-card">
          <div class="photo-frame">
            <image
              v-if="facePhoto"
              class="photo-img"
              :src="facePhoto"
              mode="aspectFit"
              @click="previewImage([facePhoto])" />
            <div v-else class="photo-placeholder">
              <text>暂无</text>
              <text>抓拍照片</text>
            </div>
          </div>
          <span class="photo-label">人脸抓拍</span>
        </div>

        <!-- 匹配指示 -->
        <div class="match-indicator">
          <div :class="['match-line', resultState]"></div>
        </div>

        <!-- 宝贝档案照列表 -->
        <div class="baby-list">
          <!-- { matched: resultState == 'success' } -->
          <div
            v-for="baby in babyList"
            :key="baby.id"
            :class="['photo-card', 'baby-card']">
            <div class="photo-frame">
              <image
                v-if="baby.avatar"
                class="photo-img w-full h-full"
                :src="baby.avatar"
                mode="aspectFit"
                @click="previewImage([baby.avatar])" />
              <div v-else class="photo-placeholder">
                <text>暂无</text>
                <text>档案照片</text>
              </div>
            </div>
            <span class="photo-label">{{ baby.name || '宝贝' }}</span>
          </div>

          <!-- 无宝贝数据 -->
          <div v-if="babyList.length === 0" class="photo-card">
            <div class="photo-frame">
              <div class="photo-placeholder">
                <text>暂无</text>
                <text>宝贝信息</text>
              </div>
            </div>
            <span class="photo-label">宝贝档案</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- ====== 失败：手动纠偏 ====== -->
      <template v-if="resultState === 'fail' && !correctionConfirmed">
        <div class="correction-section">
          <div class="section-label">手动纠偏</div>
          <p class="correction-hint">
            人脸匹配度不足，请通过其他方式确认宝贝身份后，点击下方按钮继续核销。
          </p>

          <nut-button
            block
            size="large"
            type="primary"
            :loading="correctionLoading"
            @click="onConfirmCorrection">
            {{ correctionLoading ? '提交中...' : '确认身份，继续核销' }}
          </nut-button>
        </div>
      </template>

      <!-- ====== 核销次数录入 ====== -->
      <template v-if="showCountInput">
        <div class="count-section">
          <div class="section-label">核销次数</div>
          <div class="mb-3">
            <nut-input-number
              v-model="verifyCount"
              input-width="50"
              button-size="30" />
          </div>
          <div v-if="maxCount > 0" class="count-limit">
            该票剩余可核销{{ maxCount }} 次
          </div>
        </div>

        <div class="divider"></div>

        <div class="action-section">
          <nut-button
            block
            size="large"
            type="primary"
            :loading="submitting"
            :disabled="!canSubmit"
            @click="onSubmitVerification">
            {{ submitting ? '核销中...' : `确认核销` }}
          </nut-button>
        </div>
      </template>
    </div>
  </AppContainer>
</template>

<script setup>
import { verifyWithCountRes } from '@/api'
import { useAppStore } from '@/stores/app'
import { previewImage } from '@/utils/uni'

const appStore = useAppStore()

const resultState = ref('fail') // 'success' | 'fail'
const facePhoto = ref()
const babyList = ref([])
const orderId = ref('')
const maxCount = ref(1)

onLoad((options) => {
  resultState.value = options.result
  facePhoto.value = options.facePhoto
  orderId.value = options.orderId
  maxCount.value = parseInt(options.max) || 1
  const babies = JSON.parse(options.babies)
  babyList.value = Array.isArray(babies) ? babies : [babies]
})

// 印章文案
const stampWord = computed(() =>
  resultState.value === 'success' ? 'VERIFIED' : 'REVIEW'
)
const stampSub = computed(() =>
  resultState.value === 'success' ? '已核验' : '待纠偏'
)
const stampDesc = computed(() =>
  resultState.value === 'success' ? '人脸信息确认一致' : '人脸信息匹配度较低'
)

// 手动纠偏
const correctionConfirmed = ref(false)
const correctionLoading = ref(false)
async function onConfirmCorrection() {
  correctionLoading.value = true
  // 模拟纠偏提交
  setTimeout(() => {
    correctionConfirmed.value = true
    correctionLoading.value = false
  }, 500)
}

// 核销次数
const showCountInput = computed(
  () => resultState.value === 'success' || correctionConfirmed.value
)
const verifyCount = ref(1)
const submitting = ref(false)
const completed = ref(false)
const submittedCount = ref(0)

const canSubmit = computed(
  () =>
    verifyCount.value > 0 &&
    verifyCount.value <= maxCount.value &&
    !submitting.value
)

async function onSubmitVerification() {
  try {
    submitting.value = true
    uni.showLoading({ title: '核销中...', mask: true })
    await verifyWithCountRes({
      order_id: orderId.value,
      number: verifyCount.value
    })
    submittedCount.value = verifyCount.value
    completed.value = true
    appStore.markNeedRefresh()
    uni.navigateBack()
  } finally {
    uni.hideLoading()
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.__result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 56rpx 60rpx;
  box-sizing: border-box;
}

// ====== 印章区 ======
.stamp-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30rpx;
  padding: 40rpx 0;
}

.stamp-ring {
  width: 220rpx;
  height: 220rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  // 虚线外圈 — 模拟印章齿孔
  border: 4rpx dashed;
  transform: rotate(-3deg);

  // 外圈虚线点阵装饰
  &::before {
    content: '';
    position: absolute;
    inset: -12rpx;
    border-radius: 50%;
    border: 2rpx dotted;
    opacity: 0.3;
  }
}

.success .stamp-ring {
  border-color: #52c41a;
  background: rgba(11, 138, 111, 0.04);

  &::before {
    border-color: #52c41a;
  }
}

.fail .stamp-ring {
  border-color: #f5222d;
  background: rgba(194, 120, 10, 0.04);

  &::before {
    border-color: #f5222d;
  }
}

.stamp-face {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
}

.stamp-word {
  font-size: 34rpx;
  font-weight: 800;
  letter-spacing: 4rpx;
}

.success .stamp-word {
  color: #52c41a;
}
.fail .stamp-word {
  color: #f5222d;
}

.stamp-sub {
  font-size: 26rpx;
  font-weight: 600;
}

.success .stamp-sub {
  color: #52c41a;
}
.fail .stamp-sub {
  color: #f5222d;
}

.stamp-desc {
  font-size: 28rpx;
  color: #666;
  font-weight: 500;
}

// ====== 分割线 ======
.divider {
  width: 80rpx;
  height: 2rpx;
  background: #e8e8e8;
  // 两端渐变淡出
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 20rpx;
    height: 100%;
  }
  &::before {
    left: -20rpx;
    background: linear-gradient(to right, #fafafa, #e8e8e8);
  }
  &::after {
    right: -20rpx;
    background: linear-gradient(to left, #fafafa, #e8e8e8);
  }
}

// ====== 对比照片区 ======
.photo-compare {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  padding: 40rpx 0;
  width: 100%;
}

.photo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;

  // 人脸抓拍 — 左侧大图
  &:not(.baby-card) .photo-frame {
    width: 200rpx;
    height: 200rpx;
  }

  // 宝贝卡片 — 右侧小图列表
  &.baby-card .photo-frame {
    width: 200rpx;
    height: 200rpx;
  }

  &.matched .photo-frame {
    border-color: #52c41a;
  }

  &.matched .photo-label {
    color: #52c41a;
    font-weight: 550;
  }

  .photo-frame {
    padding: 8rpx;
    border: 4rpx solid rgba(129, 83, 254, 0.1);
    border-radius: 10rpx;

    .photo-img {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }

    .photo-placeholder {
      width: 100%;
      height: 100%;
      background: #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6rpx;
      border-radius: 50%;

      text {
        font-size: 22rpx;
        color: #bbb;
        line-height: 1.2;
      }
    }
  }

  .photo-label {
    font-size: 24rpx;
    color: #888;
    font-weight: 500;
  }
}

.baby-list {
  width: 200rpx;
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
  flex-wrap: wrap;
  justify-content: center;
}

// ====== 匹配成功徽章 ======
.match-badge {
  position: absolute;
  right: -4rpx;
  bottom: 6rpx;
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: #52c41a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  text {
    color: #fff;
    font-size: 26rpx;
    font-weight: 700;
    line-height: 1;
  }
}

// ====== 匹配指示线 ======
.match-indicator {
  width: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.match-line {
  width: 48rpx;
  height: 4rpx;
  border-radius: 2rpx;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: -14rpx;
  }
  &::after {
    right: -14rpx;
  }
}

.match-line.success {
  background: #52c41a;

  &::before,
  &::after {
    background: #52c41a;
  }
}

.match-line.fail {
  background: linear-gradient(
    to right,
    #f5222d 35%,
    transparent 35%,
    transparent 65%,
    #f5222d 65%
  );

  &::before,
  &::after {
    background: #f5222d;
  }
}

// ====== 区块标签 ======
.section-label {
  font-size: 26rpx;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 2rpx;
  margin-bottom: 24rpx;
}

// ====== 纠偏区 ======
.correction-section {
  width: 100%;
  padding: 30rpx 0;
}

.correction-hint {
  font-size: 26rpx;
  color: #888;
  line-height: 1.6;
  margin-bottom: 30rpx;
}

// ====== 核销次数区 ======
.count-section {
  width: 100%;
  padding: 30rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::v-deep() {
    .nut-input-number__text--input {
      font-size: 32rpx;
      font-weight: 550;
      background: #fff;
    }
  }
}

.count-limit {
  font-size: 24rpx;
  color: #999;

  em {
    font-style: normal;
    font-weight: 600;
    color: var(--hw-primary-color);
  }
}

// ====== 操作按钮区 ======
.action-section {
  width: 100%;
  padding-top: 40rpx;
}

pleted-sub {
  font-size: 28rpx;
  color: #888;

  em {
    font-style: normal;
    font-weight: 700;
    color: #52c41a;
  }
}
</style>
