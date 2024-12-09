<template>
  <nut-popup
    round
    position="bottom"
    safe-area-inset-bottom
    :custom-style="{
      boxSizing: 'border-box',
      padding: '40rpx',
      background: '#F7F9FC'
    }"
    :visible="visible"
    @close="() => emit('update:visible', false)">
    <div class="__rechargePopupWrap">
      <div class="recharge-content">
        <div class="__title ml-[20rpx]">充值档次</div>
        <div class="inner">
          <div
            v-for="level in levels"
            :key="level.id"
            :class="[
              'recharge',
              currentSelectedLevel.id == level.id ? 'selected' : ''
            ]"
            hover-class="rechargeHoverClass"
            hover-stay-time="150"
            @click="
              () => {
                currentSelectedLevel = level
              }
            ">
            <div class="text-[36rpx] mb-[10rpx]">￥{{ level.amount }}</div>
            <div class="text-[26rpx]">
              {{ `${level.amount} 元 ${level.gift_times} 次` }}
            </div>
          </div>
        </div>
      </div>
      <div class="customAmount mt-[20rpx]">
        <nut-button
          block
          size="large"
          type="primary"
          :loading="payLoading"
          :disabled="payButtonDisabled"
          @click="debounce(onCallRecharge)">
          {{ payLoading ? '充值中...' : '充值' }}
        </nut-button>
      </div>
    </div>
  </nut-popup>
</template>

<script setup>
import { computed, ref } from 'vue'
import debounce from '../../utils/debounce'
import { useAppStore } from '../../stores/app'
import { buyPackageRes } from '../../api'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  levels: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:visible', 'refresh'])

const appStore = useAppStore()

const currentSelectedLevel = ref({}),
  payLoading = ref(false),
  payButtonDisabled = computed(() => !currentSelectedLevel.value.id)

async function onCallRecharge() {
  try {
    if (payLoading.value) return
    payLoading.value = true
    const data = await buyPackageRes({
      package_id: currentSelectedLevel.value.id
    })

    data &&
      uni.requestPayment({
        ...data,
        success(result) {
          console.log('用户支付扣款成功', result)
          payLoading.value = false
          appStore.refreshAppUser()
          emit('update:visible', false)
        },
        fail(error) {
          console.log('用户支付扣款失败', error)
          payLoading.value = false
        }
      })
  } catch {
    payLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.__rechargePopupWrap {
  .recharge-content {
    .inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;

      .recharge {
        width: 45%;
        border: 2rpx solid #f0f0f0;
        background: #fff;
        box-sizing: border-box;
        padding: 40rpx 0;
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20rpx;

        view:first-child {
          color: #333;
        }

        view:last-child {
          color: #9c9c9c;
        }

        &.selected {
          background-color: rgb(52 74 217 / 5%);
          border-color: #344ad9;

          view {
            color: #344ad9 !important;
          }
        }
      }

      .rechargeHoverClass {
        background: #f5f5f5;
      }
    }
  }
}
</style>
