<template>
  <AppContainer>
    <view class="login-page">
      <!-- 顶部装饰 -->

      <!-- 主体内容 -->
      <view class="content">
        <!-- Logo 区域 -->
        <view class="logo-wrap">
          <view class="logo">
            <image class="w-16 h-16" src="@/static/images/logo.png"></image>
          </view>
          <text class="app-name">苏膜质保服务</text>
          <text class="app-desc">您的爱车美容质保管家</text>
        </view>

        <!-- 特性说明 -->
        <view class="features">
          <view class="feature-item">
            <text class="feature-icon i-mdi-invoice-text-multiple"></text>
            <text class="feature-text">服务记录随时查看</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon i-mdi-shield-car"></text>
            <text class="feature-text">质保期限清晰明了</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon i-mdi-image-filter-vintage"></text>
            <text class="feature-text">售后服务贴心保障</text>
          </view>
        </view>
      </view>

      <!-- 底部登录区 -->
      <view class="login-footer">
        <button class="login-btn" open-type="getUserInfo" @click="login">
          <text class="btn-text">立即登录</text>
        </button>

        <nut-animate type="shake" :show="showAnimate">
          <nut-checkbox v-model="isAgree" icon-size="14">
            <text class="privacy-text">
              登录即代表同意
              <text
                class="privacy-link"
                @click.stop="navTo(`/pages/login/richtext?type=1`, false)">
                《用户协议》
              </text>
              和
              <text
                class="privacy-link"
                @click.stop="navTo(`/pages/login/richtext?type=2`, false)">
                《隐私政策》
              </text>
            </text>
          </nut-checkbox>
        </nut-animate>
      </view>

      <BindMobile
        v-model:visible="bindMobileVisible"
        :get-phone-number="getPhoneNumber" />
    </view>
  </AppContainer>
</template>

<script setup>
import { useLogin } from '@/hooks/useLogin'
import { navTo } from '@/utils/uni'

const isAgree = ref(false),
  showAnimate = ref(false)

const { login, getPhoneNumber, bindMobileVisible } = useLogin({
  validate() {
    return new Promise((resolve, reject) => {
      if (isAgree.value) {
        resolve()
      } else {
        showAnimate.value = true
        uni.vibrateShort({ type: 'middle' })
        setTimeout(() => {
          showAnimate.value = false
        })
        reject(new Error('请先阅读并同意用户协议与隐私政策！'))
      }
    })
  },
  callback() {
    uni.reLaunch({ url: '/pages/home/index' })
  }
})
</script>

<style lang="scss" scoped>
.login-page {
  flex: 1;
  display: flex;
  flex-direction: column;

  .content {
    padding: 0 80rpx;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 96rpx;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 160rpx;
        height: 160rpx;
        margin-bottom: 40rpx;
        border-radius: 40rpx;
        box-shadow: 0 20rpx 60rpx rgb(24, 144, 255, 0.2);
      }

      .app-name {
        margin-bottom: 16rpx;
        font-size: 52rpx;
        font-weight: 700;
        color: #1a1a2e;
        letter-spacing: 4rpx;
      }

      .app-desc {
        font-size: 28rpx;
        color: #9ca3af;
      }
    }

    .features {
      display: flex;
      flex-direction: column;
      gap: 28rpx;
      width: 100%;

      .feature-item {
        display: flex;
        gap: 24rpx;
        align-items: center;
        padding: 28rpx 36rpx;
        background: #fff;
        border-radius: 20rpx;
        box-shadow: 0 4rpx 24rpx rgb(0 0 0 / 5%);

        .feature-icon {
          font-size: 50rpx;
          color: var(--uvt-primary-color);
        }

        .feature-text {
          font-size: 30rpx;
          font-weight: 500;
          color: #374151;
        }
      }
    }
  }

  .login-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 40rpx;

    .login-btn {
      display: flex;
      gap: 16rpx;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 104rpx;
      margin-bottom: 32rpx;
      font-size: 34rpx;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #1890ff, #0d8aff);
      border: none;
      border-radius: 52rpx;
      box-shadow: 0 20rpx 60rpx rgb(24, 144, 255, 0.2);
      transition: opacity 0.2s;

      &::after {
        border: none;
      }

      &.loading {
        opacity: 0.7;
      }

      .btn-icon {
        font-size: 36rpx;
      }

      .btn-text {
        font-size: 34rpx;
        font-weight: 600;
        color: #fff;
      }
    }

    :deep() {
      .nut-checkbox {
        margin-right: 0 !important;
        align-items: center !important;

        .nut-checkbox__label {
          margin-left: 20rpx !important;
        }
      }
    }

    .privacy-text {
      font-size: 24rpx;
      color: #9ca3af;

      .privacy-link {
        color: #1890ff;
      }
    }
  }
}
</style>
