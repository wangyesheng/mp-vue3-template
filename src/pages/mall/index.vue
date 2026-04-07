<template>
  <AppContainer>
    <div class="mall">
      <div
        class="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1890ff] to-blue-600 py-4 px-6 text-white mb-4">
        <div class="relative flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 p-1 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <image
                class="w-full h-full rounded-md"
                mode="aspectFill"
                :src="appUser.avatar" />
            </div>
            <div>
              <h2 class="text-base font-bold">{{ appUser.nickname }}</h2>
              <div class="flex items-center gap-1 text-blue-100 text-sm">
                {{ appUser.mobile }}
              </div>
            </div>
          </div>
        </div>

        <div class="relative flex items-end justify-between">
          <div>
            <p class="text-blue-100 text-sm mb-1">当前可用积分</p>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-black tracking-tighter">
                {{ appUser.score }}
              </span>
              <span class="text-lg font-medium text-blue-100">积分</span>
            </div>
          </div>
          <button
            class="!mx-0 bg-white text-blue-600 px-4 py-2 rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/20 flex items-center gap-2"
            @click="navTo('/pages/mall/record')">
            兑换记录
            <span class="i-mdi-arrow-right"></span>
          </button>
        </div>
      </div>

      <div v-if="goods.length > 0" class="content">
        <div v-for="good in goods" :key="good.id" class="item">
          <image mode="aspectFill" :src="good.image" />
          <div class="inner">
            <span class="title">{{ good.name }}</span>
            <div class="action">
              <div class="price">
                <span>{{ good.points }}</span>
                <span>积分</span>
              </div>
              <nut-button type="primary" size="small" @click="onExchange(good)">
                兑换
              </nut-button>
            </div>
          </div>
        </div>
      </div>
      <Empty v-else description="暂无兑换商品" custom-class="mt-[10vh]" />
    </div>
  </AppContainer>
</template>

<script setup>
import { useAppStore } from '../../stores/app'
import { navTo, toast } from '../../utils/uni'
import { exchangeGoodRes, getGoodsRes } from '@/api'

const appStore = useAppStore(),
  { appUser } = storeToRefs(appStore),
  goods = ref([])
async function getGoods() {
  const result = await getGoodsRes({
    page: 1,
    limit: 500
  })
  goods.value = result.data
}

function onExchange(good) {
  uni.showModal({
    title: '提示',
    content: '确定要兑换该商品吗？',
    async success({ confirm }) {
      if (confirm) {
        await exchangeGoodRes({
          goods_id: good.id
        })
        appStore.refreshAppUser()
        toast('兑换成功！')
      }
    }
  })
}

onLoad(() => {
  getGoods()
  appStore.refreshAppUser()
})
</script>

<style lang="scss" scoped>
.mall {
  padding: 30rpx;

  .score {
    background: rgba(174, 215, 253, 0.1);
    border: 2rpx solid #1890ff;
    border-radius: 15rpx;
    padding: 20rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        border: 2rpx solid #fff;
        margin-bottom: 5rpx;
      }

      label {
        font-weight: 550;
        color: #333;
        font-size: 28rpx;
      }
    }

    .right {
      align-self: flex-end;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      font-weight: 550;
      color: #333;

      label:first-child {
        font-size: 60rpx;
      }

      label:last-child {
        font-size: 28rpx;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 20rpx;

    .item {
      width: calc(50% - 10rpx);
      min-height: 400rpx;
      background: #fff;
      display: flex;
      flex-direction: column;
      row-gap: 10rpx;
      border-radius: 20rpx;
      overflow: hidden;
      padding: 15rpx;
      box-sizing: border-box;

      image {
        width: 100%;
        height: 200rpx;
      }

      .inner {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: 28rpx;
          color: #333;
        }

        .action {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .price {
            display: flex;
            column-gap: 5rpx;
            color: var(--uvt-primary-color);

            label:first-child {
              font-weight: 550;
              font-size: 36rpx;
            }

            label:last-child {
              font-size: 24rpx;
              align-self: flex-start;
            }
          }
        }
      }
    }
  }
}
</style>
