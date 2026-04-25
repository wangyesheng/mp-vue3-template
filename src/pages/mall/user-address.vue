<template>
  <AppContainer custom-class="user-address-page">
    <div class="user-address">
      <!-- 表单 -->
      <div class="form-card">
        <div class="form-card__head">
          <span class="form-card__dot" />
          <span class="form-card__title">联系人信息</span>
        </div>

        <div class="form-item">
          <div class="form-item__label">
            <text class="i-mdi-account-outline form-item__icon" />
            <span>收件人姓名</span>
            <text class="form-item__required">*</text>
          </div>
          <input
            v-model="formData.name"
            class="form-input"
            type="text"
            maxlength="32"
            placeholder="请输入收件人真实姓名"
            placeholder-class="input-placeholder" />
        </div>

        <div class="form-item">
          <div class="form-item__label">
            <text class="i-mdi-cellphone form-item__icon" />
            <span>手机号码</span>
            <text class="form-item__required">*</text>
          </div>
          <input
            v-model="formData.mobile"
            class="form-input"
            type="number"
            maxlength="11"
            placeholder="请输入11位手机号码"
            placeholder-class="input-placeholder" />
        </div>

        <div class="form-item form-item--textarea">
          <div class="form-item__label">
            <text class="i-mdi-home-map-marker form-item__icon" />
            <span>收货地址</span>
            <text class="form-item__required">*</text>
          </div>
          <textarea
            v-model="formData.address"
            class="form-textarea"
            placeholder="省市区、街道、楼牌号、楼层、门牌等"
            placeholder-class="input-placeholder"
            maxlength="120" />
          <div class="form-counter">{{ formData.address.length }}/120</div>
        </div>
      </div>

      <div class="tips-card">
        <div class="tips-card__title">
          <text class="i-mdi-shield-check-outline tips-card__icon" />
          温馨提示
        </div>
        <ul class="tips-list">
          <li>请确保手机号畅通，以便快递与您联系</li>
          <li>请详细填写收货地址，避免派送异常</li>
        </ul>
      </div>
    </div>

    <div class="bottom-bar">
      <nut-button
        block
        size="large"
        type="primary"
        custom-color="linear-gradient(135deg, #1890ff 0%, #0e4fc4 100%)"
        @click="debounce(onSave)">
        保存地址
      </nut-button>
    </div>
  </AppContainer>
</template>

<script setup>
import { getReceiptInfoRes, saveReceiptInfoRes } from '@/api'
import { useAppStore } from '@/stores/app'
import debounce from '@/utils/debounce'
import test from '@/utils/test'
import { toast } from '@/utils/uni'

const appStore = useAppStore(),
  { appUser } = storeToRefs(appStore)

const formData = ref({
  name: appUser.value.nickname,
  mobile: appUser.value.mobile,
  address: ''
})

async function onSave() {
  const { name, mobile, address } = formData.value
  if (!name.trim()) {
    toast('请填写收件人姓名')
    return
  }
  if (!test.mobile(mobile.trim())) {
    toast('请输入正确的手机号格式')
    return
  }
  if (!address.trim()) {
    toast('请填写详细地址')
    return
  }
  await saveReceiptInfoRes(formData.value)
  appStore.markNeedRefresh()
  uni.navigateBack()
}

onLoad(async ({ id }) => {
  if (id) {
    const data = await getReceiptInfoRes(id)
    formData.value = data
  }
})
</script>

<style lang="scss" scoped>
.user-address-page {
  :deep(.app-contanier) {
    background: var(--hw-primary-bg-color);
  }
}

.user-address {
  padding: 24rpx 24rpx 200rpx;
  box-sizing: border-box;
}

.hero {
  position: relative;
  border-radius: 28rpx;
  overflow: hidden;
  margin-bottom: 28rpx;
  background: linear-gradient(135deg, #1890ff 0%, #0e4fc4 55%, #1565c0 100%);
  box-shadow: 0 16rpx 48rpx rgba(24, 144, 255, 0.28);

  .hero-bg {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    background-image:
      radial-gradient(
        circle at 20% 30%,
        rgba(255, 255, 255, 0.35) 0%,
        transparent 45%
      ),
      radial-gradient(
        circle at 85% 70%,
        rgba(255, 255, 255, 0.2) 0%,
        transparent 40%
      );
  }

  .hero-inner {
    position: relative;
    display: flex;
    align-items: center;
    gap: 28rpx;
    padding: 40rpx 36rpx 44rpx;
  }

  .hero-icon {
    width: 100rpx;
    height: 100rpx;
    border-radius: 28rpx;
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(12rpx);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 52rpx;
    color: #fff;
    border: 2rpx solid rgba(255, 255, 255, 0.35);
    flex-shrink: 0;
  }

  .hero-text {
    flex: 1;
    min-width: 0;
  }

  .hero-title {
    font-size: 40rpx;
    font-weight: 700;
    color: #fff;
    letter-spacing: 2rpx;
    margin-bottom: 12rpx;
  }

  .hero-desc {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.88);
    line-height: 1.45;
  }
}

.form-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx 28rpx 8rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(15, 23, 42, 0.06);

  &__head {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 28rpx;
    padding-bottom: 20rpx;
    border-bottom: 2rpx solid #f1f5f9;
  }

  &__dot {
    width: 8rpx;
    height: 32rpx;
    border-radius: 4rpx;
    background: linear-gradient(180deg, #1890ff, #0e4fc4);
  }

  &__title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1a1a2e;
  }
}

.form-item {
  margin-bottom: 28rpx;

  &__label {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: #374151;
    font-weight: 500;
    margin-bottom: 14rpx;
  }

  &__icon {
    font-size: 34rpx;
    color: #1890ff;
    margin-right: 10rpx;
  }

  &__required {
    color: #ef4444;
    margin-left: 6rpx;
    font-size: 28rpx;
  }

  &--textarea {
    margin-bottom: 12rpx;

    .form-item__label {
      margin-bottom: 14rpx;
    }
  }
}

.form-input {
  width: 100%;
  height: 88rpx;
  padding: 0 24rpx;
  background: #f8fafc;
  border: 2rpx solid #e2e8f0;
  border-radius: 16rpx;
  font-size: 28rpx;
  color: #1a1a2e;
  box-sizing: border-box;

  &:focus {
    border-color: #1890ff;
    background: #fff;
  }
}

.form-region {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 88rpx;
  padding: 0 24rpx;
  background: #f8fafc;
  border: 2rpx solid #e2e8f0;
  border-radius: 16rpx;
  box-sizing: border-box;

  &--empty .form-region__text {
    color: #94a3b8;
  }

  &__text {
    flex: 1;
    font-size: 28rpx;
    color: #1a1a2e;
    line-height: 1.4;
  }

  &__arrow {
    font-size: 36rpx;
    color: #cbd5e1;
    flex-shrink: 0;
    margin-left: 16rpx;
  }
}

.form-textarea {
  width: 100%;
  min-height: 200rpx;
  padding: 20rpx 24rpx;
  background: #f8fafc;
  border: 2rpx solid #e2e8f0;
  border-radius: 16rpx;
  font-size: 28rpx;
  color: #1a1a2e;
  box-sizing: border-box;
  line-height: 1.55;

  &:focus {
    border-color: #1890ff;
    background: #fff;
  }
}

.form-hint {
  margin-top: 12rpx;
  font-size: 22rpx;
  color: #94a3b8;
  line-height: 1.4;
}

.form-counter {
  text-align: right;
  font-size: 22rpx;
  color: #94a3b8;
  margin-top: 10rpx;
}

.tips-card {
  background: linear-gradient(
    145deg,
    rgba(24, 144, 255, 0.06) 0%,
    rgba(14, 79, 196, 0.04) 100%
  );
  border: 2rpx solid rgba(24, 144, 255, 0.12);
  border-radius: 20rpx;
  padding: 28rpx 28rpx 24rpx;

  &__title {
    display: flex;
    align-items: center;
    gap: 10rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: #1e3a5f;
    margin-bottom: 16rpx;
  }

  &__icon {
    font-size: 32rpx;
    color: #1890ff;
  }
}

.tips-list {
  margin: 0;
  padding-left: 28rpx;
  font-size: 24rpx;
  color: #64748b;
  line-height: 1.65;

  li + li {
    margin-top: 8rpx;
  }
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  padding: 20rpx 32rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20rpx);
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 -8rpx 32rpx rgba(15, 23, 42, 0.04);
}

.input-placeholder {
  color: #94a3b8;
}
</style>
