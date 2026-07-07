<template>
  <app-container>
    <view class="login-page">
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

        <!-- 登录表单 -->
        <view class="form">
          <view class="form-item">
            <view class="form-item__prefix">
              <text class="i-mdi-account text-[42rpx] text-[#333]"></text>
            </view>
            <nut-input
              v-model="loginParams.account"
              type="text"
              class="form-item__input"
              placeholder="请输入账号"
              placeholder-class="input-placeholder"
              :cursor-spacing="20"
              :maxlength="20" />
          </view>

          <view class="form-item">
            <view class="form-item__prefix">
              <text class="i-mdi-lock-outline text-[42rpx] text-[#333]"></text>
            </view>
            <nut-input
              v-model="loginParams.password"
              class="form-item__input"
              placeholder="请输入密码"
              placeholder-class="input-placeholder"
              :cursor-spacing="20"
              :password="showPassword"
              :maxlength="20" />

            <view
              class="form-item__suffix"
              @click="showPassword = !showPassword">
              <nut-icon
                custom-color="#333"
                :name="showPassword ? 'marshalling' : 'eye'" />
            </view>
          </view>

          <button
            class="login-btn"
            type="primary"
            :loading="loading"
            :disabled="loading"
            @click="debounce(login)">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </view>
      </view>

      <!-- 底部版权 -->
      <view class="footer">
        <text class="privacy-text">
          登录即代表同意
          <text
            class="privacy-link"
            @click="navTo(`/pages/login/richtext?type=1`, false)">
            《用户协议》
          </text>
          和
          <text
            class="privacy-link"
            @click="navTo(`/pages/login/richtext?type=2`, false)">
            《隐私政策》
          </text>
        </text>
      </view>
    </view>
  </app-container>
</template>

<script setup lang="ts">
import { h5LoginRes } from '@/api'
import { useAppStore } from '@/stores/app'
import debounce from '@/utils/debounce'
import { navTo } from '@/utils/uni'

const appStore = useAppStore()

const loginParams = ref({
  account: '15895347201',
  password: '347201'
})
const showPassword = ref(false)
const loading = ref(false)

const login = async () => {
  try {
    loading.value = true
    const data = await h5LoginRes(loginParams.value)
    appStore.setAppToken(data.token)
    await appStore.refreshAppUser()
    uni.reLaunch({ url: '/pages/home/index' })
    // #ifdef H5
    setTimeout(() => {
      window.location.reload()
    })
    // #endif
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  // 依赖父元素（AppContainer）的确定高度，确保布局能正确感知父元素 padding-bottom
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

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

    .form {
      width: 100%;

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

      .form-item {
        display: flex;
        align-items: center;
        height: 104rpx;
        padding: 0 32rpx;
        margin-bottom: 42rpx;
        background: #fff;
        border-radius: 20rpx;
        box-shadow: 0 4rpx 24rpx rgb(0 0 0 / 5%);

        :deep() {
          .nut-input {
            height: 100% !important;
            padding: 0 !important;
          }
          .nut-input--border {
            border: none !important;
          }

          .nut-input__value {
            font-size: 30rpx;
            color: #1a1a2e;
          }

          .input-placeholder {
            color: #c8cacc;
            font-size: 30rpx;
          }
        }

        &__prefix {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56rpx;
          margin-right: 20rpx;
          flex-shrink: 0;
        }

        &__input {
          flex: 1;
          height: 100%;
        }

        &__suffix {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56rpx;
          margin-left: 20rpx;
          flex-shrink: 0;
        }

        &__eye {
          font-size: 36rpx;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    padding: 40rpx 80rpx;

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
