<template>
  <AppContainer>
    <div class="__mall">
      <div class="banner">
        <div class="score">
          <div class="left">
            <image :src="appUser.avatar" mode="aspectFill" />
            <span>{{ appUser.nickname }}</span>
          </div>
          <div class="right">
            <span>{{ appUser.score }}</span>
            <span>积分</span>
          </div>
        </div>
      </div>

      <div class="content">
        <PageList :api="getMallGoodsRes" :cols="2">
          <template #item="{ data: good }">
            <div class="item">
              <image :src="good.image" mode="aspectFill" />
              <div class="inner">
                <span class="title">{{ good.title }}</span>
                <div class="action">
                  <div class="price">
                    <span>{{ good.price }}</span>
                    <span>积分</span>
                  </div>
                  <nut-button
                    type="primary"
                    size="small"
                    @click="onExchange(good)">
                    兑换
                  </nut-button>
                </div>
              </div>
            </div>
          </template>
        </PageList>
      </div>
    </div>
    <div
      class="absolute left-[20rpx]"
      :style="{ top: iconTop + 'px' }"
      @click="onBack">
      <nut-icon name="rect-left" custom-color="#fff" size="20" />
    </div>
  </AppContainer>
</template>

<script setup>
import { useAppStore } from '../../stores/app'
import { exchangeRes, getMallGoodsRes } from '@/api'
import { toast } from '@/utils/uni'

const appStore = useAppStore(),
  { appUser } = storeToRefs(appStore),
  iconTop = computed(() => {
    const data = uni.getMenuButtonBoundingClientRect()
    // data.top 胶囊距离顶部得距离
    // data.height / 2 胶囊自身高度的一半
    // 10 图标自身高度的一半
    return data.top + data.height / 2 - 10
  })

function onExchange(good) {
  uni.showModal({
    title: '提示',
    content: '确定要兑换该商品吗？',
    async success({ confirm }) {
      if (confirm) {
        await exchangeRes(good.id)
        toast('兑换成功，快去卡包查看吧！')
        appStore.refreshAppUser()
      }
    }
  })
}

function onBack() {
  uni.navigateBack()
}

onShow(() => {
  appStore.refreshAppUser()
})
</script>

<style lang="scss" scoped>
.__mall {
  .content {
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 20rpx;

    .item {
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
            color: var(--hw-primary-color);

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
  .banner {
    background: url(https://hwly.tuomuit.com/wechat/img/gift-bg.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 640rpx;
    position: relative;
    .score {
      width: 680rpx;
      background: #f2f2f2;
      border-radius: 15rpx;
      position: absolute;
      left: 50%;
      bottom: 20rpx;
      transform: translateX(-50%);
      padding: 20rpx 30rpx;
      box-sizing: border-box;

      display: flex;
      justify-content: space-between;
      align-items: center;

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
  }
}
</style>
