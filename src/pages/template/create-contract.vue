<template>
  <AppContainer>
    <div class="p-[30rpx] box-border create-contract-wrap">
      <div class="userinfo">
        <div class="layer">
          <span>认证状态：</span>
          <span :class="appUser.real_status == 0 ? 'default' : 'success'">
            {{ appUser.real_status == 0 ? '未认证' : '已认证' }}
          </span>
          <div class="flex items-center" v-if="appUser.real_status == 0">
            <nut-divider direction="vertical" />
            <div
              class="auth"
              @click="navTo('/pages/template/complete-userinfo')">
              <img src="../../static/images/auth.png" alt="" />
              <span>去认证</span>
            </div>
          </div>
        </div>
        <div class="layer">
          <span>真实姓名：</span>
          <span>{{ appUser.real_name || '-' }}</span>
        </div>
        <div class="layer">
          <span>身份证号：</span>
          <span>{{ appUser.idcard || '-' }}</span>
        </div>
        <div class="layer">
          <span>手机号码：</span>
          <span>{{ appUser.mobile }}</span>
        </div>
      </div>
      <div class="fields">
        <nut-form>
          <nut-form-item
            v-for="field in fields"
            :key="field.key"
            :label="field.label">
            <nut-input
              v-model="templateParams[field.key]"
              :placeholder="`请输入${field.label}`"
              type="text" />
          </nut-form-item>
        </nut-form>
      </div>
    </div>
    <div class="footer flex justify-center items-center">
      <nut-button
        block
        size="large"
        type="primary"
        :disabled="disabledCreateContractButton"
        :loading="isCreating"
        @click="onCreateContract">
        {{ isCreating ? '创建合同中...' : '确认创建' }}
      </nut-button>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'
import { navTo } from '../../utils/uni'
import { computed, ref } from 'vue'
import { createContractRes } from '../../api'
import { isNullOrWhitespace } from '../../utils/is'

const { currentTemplate, appUser } = storeToRefs(useAppStore())

const templateParams = ref({})
const fields = computed(() => {
  const signature = JSON.parse(currentTemplate.value.signature)
  const ret = []
  for (const key in signature) {
    templateParams.value[key] = null
    const field = {
      label: signature[key],
      key
    }
    ret.push(field)
  }
  return ret
})
const disabledCreateContractButton = computed(() => {
    if (appUser.value.real_status == 0) return true
    for (const key in templateParams.value) {
      if (isNullOrWhitespace(templateParams.value[key])) return true
    }
    return false
  }),
  isCreating = ref(false)
async function onCreateContract() {
  try {
    isCreating.value = true
    const data = await createContractRes({
      id: currentTemplate.value.id,
      ...templateParams.value
    })
    navTo(`/pages/contract/index?id=${data.id}`)
  } finally {
    isCreating.value = false
  }
}
</script>

<style lang="scss" scoped>
.create-contract-wrap {
  margin-bottom: 10vh;
  .userinfo {
    position: relative;
    width: 100%;
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx 20rpx;
    box-sizing: border-box;

    &::before {
      content: '甲方';
      position: absolute;
      top: 0;
      right: 0;
      width: 100rpx;
      height: 40rpx;
      border-top-right-radius: 20rpx;
      border-bottom-left-radius: 20rpx;
      line-height: 40rpx;
      text-align: center;
      font-size: 24rpx;
      font-weight: 550;
      background: rgba(52, 74, 217, 0.1);
      color: #344ad9;
    }

    .layer {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      color: #666;

      &:not(:first-child) {
        margin-top: 20rpx;
      }

      label:last-child {
        color: #333;
      }

      .default,
      .success {
        font-weight: 550;
      }
      .success {
        color: #6bba5b !important;
      }

      .auth {
        display: flex;
        align-items: center;

        label {
          font-size: 24rpx;
          color: #344ad9 !important;
          font-weight: 550;
        }

        image {
          width: 32rpx;
          height: 32rpx;
          margin-right: 5rpx;
        }
      }
    }
  }
  .fields {
    ::v-deep() {
      .nut-cell {
        .nut-input {
          padding: 0 !important;
          input {
            text-align: right !important;
            color: #333 !important;
          }
        }
      }
    }
  }
}
</style>
