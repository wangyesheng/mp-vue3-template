<template>
  <nut-popup
    v-model:visible="popupVisible"
    round
    position="bottom"
    safe-area-inset-bottom>
    <div class="popupWrap">
      <div class="__title flex justify-between items-center px-[40rpx]">
        <span>兑换游戏币</span>
      </div>
      <div class="popup-inner exchange-form">
        <div class="info-bar">
          <div class="info-bar__rate">
            <span class="info-bar__side">1 次</span>
            <span class="info-bar__eq">=</span>
            <span class="info-bar__main">{{ cardInfo.coin_ratio }} 游戏币</span>
          </div>
          <div class="info-bar__remain">
            剩余
            <span>{{ cardInfo.residue_quantity ?? 0 }}</span>
            次可兑
          </div>
        </div>

        <div class="form-item flex items-center justify-between">
          <div class="label">兑换次数</div>

          <nut-input-number
            v-model="times"
            :max="cardInfo.residue_quantity"
            input-width="50"
            button-size="30" />
        </div>

        <div class="total-preview">兑换成功后请至实物礼品中使用。</div>

        <div class="action">
          <nut-button
            block
            size="large"
            type="primary"
            :loading="submitting"
            :disabled="submitDisabled"
            @click="onConfirm">
            {{ submitting ? '兑换中...' : '确认兑换' }}
          </nut-button>
        </div>
      </div>
    </div>
  </nut-popup>
</template>

<script setup>
import { toast } from '../../utils/uni'
import { exchangeGameCoinsRes } from '../../api'

const props = defineProps({
  refresh: {
    type: Function,
    default: () => {}
  }
})

const popupVisible = ref(false),
  cardInfo = ref({}),
  submitting = ref(false),
  times = ref(1)

const totalCoins = computed(() => {
  return cardInfo.value.coin_ratio * times.value
})

const submitDisabled = computed(
  () => cardInfo.value.residue_quantity < times.value
)

function onConfirm() {
  uni.showModal({
    title: '确认兑换',
    content: `确定兑换 ${totalCoins.value} 个游戏币吗？`,
    async success({ confirm }) {
      if (!confirm) return
      try {
        submitting.value = true
        uni.showLoading({ title: '兑换中...', mask: true })
        await exchangeGameCoinsRes({
          order_sn: cardInfo.value.order_sn,
          number: times.value
        })
        await props.refresh?.('refresh')
        toast('兑换成功，请至实物礼品中使用')
        popupVisible.value = false
      } catch {
        toast('兑换失败，请稍后再试')
      } finally {
        uni.hideLoading()
        submitting.value = false
      }
    }
  })
}

defineExpose({
  show(data) {
    times.value = 1
    cardInfo.value = data
    popupVisible.value = true
  }
})
</script>

<style lang="scss" scoped>
.exchange-form {
  padding: 20rpx 40rpx 30rpx;

  .info-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx;
    margin-bottom: 30rpx;
    background: rgba(129, 83, 254, 0.05);
    border-radius: 20rpx;

    &__rate {
      display: flex;
      align-items: center;
      gap: 10rpx;

      .info-bar__side {
        font-size: 30rpx;
        font-weight: 550;
        color: #333;
      }

      .info-bar__eq {
        font-size: 26rpx;
        font-weight: 700;
        color: #ccc;
        margin: 0 4rpx;
      }

      .info-bar__main {
        font-size: 36rpx;
        font-weight: 700;
        color: var(--hw-primary-color);
      }
    }

    &__remain {
      font-size: 24rpx;
      color: #999;
      white-space: nowrap;

      label {
        font-style: normal;
        font-weight: 700;
        font-size: 30rpx;
        color: var(--hw-primary-color);
        margin: 0 4rpx;
      }
    }
  }

  .form-item {
    margin-bottom: 24rpx;

    .label {
      font-size: 28rpx;
      font-weight: 500;
      color: #333;
    }

    .hint {
      font-size: 24rpx;
      color: #999;
      font-weight: 400;
      margin-left: 8rpx;
    }
  }

  .total-preview {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 30rpx;

    em {
      font-style: normal;
      font-weight: 550;
      color: var(--hw-primary-color);
      font-size: 30rpx;
    }
  }

  .action {
    padding-top: 20rpx;
  }
}
</style>
