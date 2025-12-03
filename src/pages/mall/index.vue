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

      <div class="content" v-if="goods.length > 0">
        <div class="item" v-for="good in goods" :key="good.id">
          <image :src="good.image" mode="aspectFill" />
          <div class="inner">
            <span class="title">{{ good.title }}</span>
            <div class="action">
              <div class="price">
                <span>{{ good.price }}</span>
                <span>积分</span>
              </div>
              <nut-button type="primary" size="small">兑换</nut-button>
            </div>
          </div>
        </div>
      </div>
      <Empty description="暂无兑换商品" customClass="mt-[10vh]" v-else />
    </div>
  </AppContainer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'
import { onLoad } from '@dcloudio/uni-app'
import { getMallGoodsRes } from '@/api'

const { appUser } = storeToRefs(useAppStore()),
  goods = ref([])

async function getGoods() {
  const { data } = await getMallGoodsRes({
    page: 1,
    limit: 50
  })
  goods.value = data
}

onLoad(getGoods)
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
      padding: 15rpx 30rpx;
      box-sizing: border-box;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        column-gap: 12rpx;

        image {
          width: 80rpx;
          height: 80rpx;
        }

        label {
          color: #333;
          font-size: 28rpx;
          font-weight: 550;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-weight: 550;
        color: #333;

        label:first-child {
          font-size: 50rpx;
        }

        label:last-child {
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
