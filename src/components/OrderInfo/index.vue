<template>
  <div>
    <div
      :class="[
        'order-card',
        data.is_aftersale_order == 1 ? 'after-sale-order' : ''
      ]">
      <div class="card-head">
        <div class="flex flex-col gap-y-1">
          <span class="text-base font-bold">
            {{ data.vehicle_type }}
          </span>
          <span class="text-xs text-[#666]">
            <span>订单号：{{ data.order_sn }}</span>
            <span
              class="ml-0.5 text-[var(--uvt-primary-color)]"
              @click="copy(data.order_sn)">
              复制
            </span>
          </span>
        </div>
        <div class="text-xs font-[550]">
          <span
            v-if="data.aftersale_status < 2"
            :style="{ color: orderTypeMap[data.status]?.color }">
            {{ orderTypeMap[data.status]?.label }}
          </span>
          <span
            v-else
            :style="{
              color: data.aftersale_status == 2 ? '#22c55e' : '#6b6b6b'
            }">
            {{ data.aftersale_status == 2 ? '售后完成' : '关闭售后' }}
          </span>
        </div>
      </div>
      <div class="card-body">
        <div class="product-info">
          <div
            class="product-content"
            :class="{
              collapsed: overflowed && !expanded,
              expanded: overflowed && expanded
            }">
            <div class="product-inner">
              <div class="product-item">
                <div class="label">
                  <span>购买产品</span>
                </div>
                <div class="value">
                  {{ data.product_name }}
                </div>
              </div>

              <div v-if="data.is_construction == 1" class="product-item">
                <div class="label">
                  <span>服务项目</span>
                </div>
                <div class="value">
                  {{ data.service_name }}
                </div>
              </div>
              <div v-if="data.is_construction == 1" class="product-item">
                <div class="label">
                  <image
                    class="w-[30rpx] h-[30rpx] rounded-xl"
                    mode="aspectFill"
                    :src="data.store?.store_image"
                    @click="previewImage(0, [data.store?.store_image])" />
                  <span>施工门店</span>
                </div>
                <div class="value">
                  <span class="whitespace-normal">
                    {{ data.store?.store_name }}
                  </span>
                  <span
                    class="text-[#1890ff] text-xs"
                    @click="copy(data.store?.store_name)">
                    复制
                  </span>
                </div>
              </div>
              <div v-if="data.is_construction == 1" class="product-item">
                <div class="label">
                  <span>门店电话</span>
                </div>
                <div class="value">
                  {{ data.store?.store_mobile }}
                  <span
                    class="text-[#1890ff] text-xs"
                    @click="callPhone(data.store?.store_mobile)">
                    拨打
                  </span>
                </div>
              </div>
              <div
                v-if="data.is_construction == 1"
                class="product-item !w-[100%]">
                <div class="label">
                  <span>门店地址</span>
                </div>
                <div class="value">
                  {{ data.store?.store_address }}

                  <span
                    class="text-[#1890ff] text-xs"
                    @click="copy(data.store?.store_address)">
                    复制
                  </span>
                </div>
              </div>

              <div class="product-item !w-[100%]">
                <div class="label">
                  <span>产品详情</span>
                </div>
                <div class="value !flex-col !items-start !gap-y-1">
                  <div
                    v-for="(item, index) in data.sn_number"
                    :key="index"
                    class="flex flex-col details">
                    <span v-if="item.part_name">
                      {{ item.part_name }}
                    </span>
                    <span>型号：{{ item.part_marque }}</span>
                    <span>SN：{{ item.part_sn }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="overflowed"
              class="expand-toggle"
              @click="expanded = !expanded">
              <span>{{ expanded ? '收起' : '展开更多' }}</span>
              <span
                class="caret i-mdi-chevron-down"
                :class="{ up: expanded }"></span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="data.status < 4" class="card-foot">
        <nut-button
          size="small"
          type="primary"
          @click="onOrderConfirm(data.id)">
          确认施工完成
        </nut-button>
      </div>
      <div v-if="data.status == 4" class="card-foot">
        <!-- 已完成订单 -->
        <nut-button
          v-if="data.is_construction == 1"
          size="small"
          @click="emit('showRatePopup')">
          {{ data.is_reviewed == 1 ? '查看评价' : '去评价' }}
        </nut-button>
        <nut-button
          size="small"
          @click="navTo(`/pages/after-sale/index?id=${data.id}`)">
          申请售后
        </nut-button>
        <nut-button
          type="primary"
          size="small"
          @click="navTo(`/pages/warranty/index?id=${data.id}`)">
          查看质保单
        </nut-button>
      </div>
      <div v-if="data.status == 5" class="card-foot">
        <!-- 售后订单 -->
        <nut-button
          plain
          size="small"
          type="primary"
          @click="navTo(`/pages/after-sale/timeline?id=${data.aftersale_id}`)">
          查看进度
        </nut-button>
        <nut-button
          type="primary"
          size="small"
          @click="navTo(`/pages/warranty/index?id=${data.id}`)">
          查看质保单
        </nut-button>
        <nut-button
          v-if="data.handle_status == 2"
          size="small"
          type="primary"
          @click="onOrderConfirm(data.aftersale_id, 2)">
          确认售后完成
        </nut-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { confirmAfterSaleRes, confirmOrderRes } from '@/api'
import { orderTypeMap } from '@/constant'
import { useAppStore } from '@/stores/app'
import { callPhone, copy, navTo, previewImage } from '@/utils/uni'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['refresh', 'showRatePopup'])

const instance = getCurrentInstance()
const expanded = ref(false)
const overflowed = ref(false)

// 内容实际高度超过 260rpx 时才启用折叠 + 展开按钮
function measureOverflow() {
  nextTick(() => {
    uni
      .createSelectorQuery()
      .in(instance.proxy)
      .select('.product-inner')
      .boundingClientRect((rect) => {
        if (!rect) return
        const { windowWidth } = uni.getSystemInfoSync()
        overflowed.value = rect.height > (260 / 750) * windowWidth + 2
      })
      .exec()
  })
}

onMounted(measureOverflow)
watch(() => props.data, measureOverflow, { deep: true })

const appStore = useAppStore()

async function onOrderConfirm(id, type = 1) {
  uni.showModal({
    title: '提示',
    content:
      '请检查您爱车状态，漆面或玻璃本身等车辆其他地方是否因施工产生损坏，点击确认即代表已检查且未发现问题，该提示不影响购买产品自身售后。',
    async success({ confirm }) {
      if (confirm) {
        if (type == 1) {
          await confirmOrderRes(id)
          appStore.refreshAppUser()
        } else {
          await confirmAfterSaleRes(id)
        }
        emit('refresh')
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.order-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 0 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  position: relative;

  &.after-sale-order {
    &::after {
      content: '售后订单';
      position: absolute;
      top: 0;
      right: 0;
      padding: 5rpx 10rpx;
      background: rgb(255, 140, 0, 0.1);
      color: rgb(255, 140, 0);
      font-size: 22rpx;
      font-weight: 550;
      border-top-right-radius: 20rpx;
      border-bottom-left-radius: 20rpx;
    }
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #eeeeee;
  }

  .card-body {
    padding: 15rpx 0;

    .product-info {
      padding: 0 10rpx;
      flex: 1;
      display: flex;
      flex-direction: column;

      .product-content {
        position: relative;
        min-height: 260rpx;
        overflow: hidden;

        &.collapsed {
          max-height: 260rpx;

          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 80rpx;
            background: linear-gradient(
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.45) 30%,
              rgba(255, 255, 255, 0.8) 60%,
              #fff 100%
            );
            pointer-events: none;
          }
        }

        &.expanded .product-inner {
          /* 给悬浮的收起按钮留出空间，避免盖住最后一行内容 */
          padding-bottom: 64rpx;
        }

        .expand-toggle {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 8rpx;
          font-size: 24rpx;
          color: var(--uvt-primary-color, #1890ff);
          font-weight: bold;

          .caret {
            &.up {
              transform: rotate(180deg);
            }
          }
        }

        .product-inner {
          display: flex;
          flex-wrap: wrap;
          row-gap: 20rpx;
          column-gap: 1%;
          align-content: flex-start;

          .product-item {
            width: 49%;
            display: flex;
            flex-direction: column;
            row-gap: 8rpx;

            .label {
              font-size: 22rpx;
              color: #aaa;
              font-weight: 500;
              display: flex;
              align-items: center;
              column-gap: 5rpx;
            }

            .value {
              display: flex;
              align-items: center;
              column-gap: 5rpx;
              font-size: 26rpx;
              color: #333;
              font-weight: 500;

              .details {
                width: 100%;
                &:not(:last-child) {
                  padding-bottom: 8rpx;
                  border-bottom: 1rpx solid #f0f0f0;
                }
              }
            }
          }
        }
      }
    }
  }

  .card-foot {
    padding: 20rpx 0;
    border-top: 1rpx solid #eeeeee;
    display: flex;
    justify-content: flex-end;
    column-gap: 10rpx;
  }
}
</style>
