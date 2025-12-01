<template>
  <AppContainer>
    <div class="__wallet">
      <div class="info">
        <div class="user">
          <div class="header">
            <image class="avatar" :src="appUser.avatar" mode="aspectFill" />
            <div>
              <div class="name">
                <span>{{ appUser.nickname }}</span>
                <image
                  src="../../static/images/me/edit.png"
                  mode="aspectFill" />
              </div>
              <div class="vip">儿童会员</div>
            </div>
          </div>
          <div class="address">
            <img src="../../static/images/home/map.png" alt="" />
            <span>HAOWEN LAND北京密云店</span>
          </div>
        </div>
      </div>
      <nut-tabs type="smile" v-model="selectedWalletType" auto-height>
        <nut-tab-pane title="单次卡" pane-key="1">
          <div class="card">
            <div
              class="item"
              v-for="item in wallets"
              :key="item.id"
              @click="switchTab('/pages/scan/index', false)">
              <div class="inner">
                <image :src="item.image" mode="aspectFill" />
                <div class="info">
                  <div class="info-left">
                    <div class="title">
                      {{ item.title }}
                    </div>
                    <div class="tag">
                      <nut-tag custom-color="#e9e9e9" text-color="#999999">
                        {{ item.use_time_text }}
                      </nut-tag>
                      <nut-tag custom-color="#e9e9e9" text-color="#999999">
                        免预约
                      </nut-tag>
                    </div>
                    <div class="expireTime">失效日期：{{ item.end_time }}</div>
                  </div>
                  <div class="info-right">
                    <span>{{ item.quantity }}</span>
                    <span>剩余/次</span>
                  </div>
                </div>
              </div>
              <div class="footer">去使用</div>
            </div>
          </div>
        </nut-tab-pane>
        <nut-tab-pane title="多次卡" pane-key="2">
          <div class="card">
            <div
              class="item"
              v-for="item in wallets"
              :key="item.id"
              @click="switchTab('/pages/scan/index', false)">
              <div class="inner">
                <image :src="item.image" mode="aspectFill" />
                <div class="info">
                  <div class="info-left">
                    <div class="title">
                      {{ item.title }}
                    </div>
                    <div class="tag">
                      <nut-tag custom-color="#e9e9e9" text-color="#999999">
                        {{ item.use_time_text }}
                      </nut-tag>
                      <nut-tag custom-color="#e9e9e9" text-color="#999999">
                        免预约
                      </nut-tag>
                    </div>
                    <div class="expireTime">失效日期：{{ item.end_time }}</div>
                  </div>
                  <div class="info-right">
                    <span>{{ item.residue_quantity }}</span>
                    <span>剩余/次</span>
                  </div>
                </div>
              </div>
              <div class="footer">去使用</div>
            </div>
          </div>
        </nut-tab-pane>
        <nut-tab-pane title="年卡" pane-key="3">
          <div class="card">
            <div
              class="item"
              v-for="item in wallets"
              :key="item.id"
              @click="switchTab('/pages/scan/index', false)">
              <div class="inner">
                <image :src="item.image" mode="aspectFill" />
                <div class="info">
                  <div class="info-left">
                    <div class="title">
                      {{ item.title }}
                    </div>
                    <div class="tag">
                      <nut-tag custom-color="#e9e9e9" text-color="#999999">
                        {{ item.use_time_text }}
                      </nut-tag>
                      <nut-tag custom-color="#e9e9e9" text-color="#999999">
                        免预约
                      </nut-tag>
                    </div>
                    <div class="expireTime">失效日期：{{ item.end_time }}</div>
                  </div>
                  <div class="info-right">
                    <span>{{ item.residue_quantity }}</span>
                    <span>剩余/天</span>
                  </div>
                </div>
              </div>
              <div class="footer">去使用</div>
            </div>
          </div>
        </nut-tab-pane>
      </nut-tabs>
    </div>
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onLoad } from '@dcloudio/uni-app'
import { getWalletInfoRes } from '../../api'
import { ref, watch } from 'vue'
import { switchTab } from '../../utils/uni'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'

const { appUser } = storeToRefs(useAppStore())
const wallets = ref([])
const selectedWalletType = ref('1')

watch(() => selectedWalletType.value, getWallets)

async function getWallets() {
  const { data } = await getWalletInfoRes({
    page: 1,
    limit: 1000,
    type: selectedWalletType.value
  })
  wallets.value = data
}

onLoad(() => {
  getWallets()
})
</script>

<style lang="scss" scoped>
.__wallet {
  ::v-deep() {
    .nut-tabs {
      .nut-tabs__titles {
        background: transparent !important;
      }

      .nut-tab-pane {
        padding: 0 34rpx 50rpx !important;
        background: transparent !important;
      }
    }
  }
  .card {
    display: flex;
    flex-direction: column;
    row-gap: 20rpx;

    .item {
      border-radius: 24rpx;
      // 如果不设置该属性，则会导致子元素的圆角效果无法显示（子元素添加背景色溢出导致圆角被遮盖）
      overflow: hidden;

      .inner {
        width: 100%;
        background: #fff;
        display: flex;
        align-items: center;

        image {
          width: 200rpx;
          height: auto;
          align-self: stretch; // 拉伸填充父元素高度
        }

        .info {
          flex: 1;
          color: #000;
          padding: 20rpx 10rpx;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;

          &-left {
            flex: 1;
            display: flex;
            flex-direction: column;
            row-gap: 20rpx;

            .title {
              font-weight: 550;
              font-size: 30rpx;
            }

            .tag {
              display: flex;
              flex-wrap: wrap;
              column-gap: 10rpx;
              row-gap: 10rpx;

              ::v-deep() {
                .nut-tag {
                  width: fit-content !important;
                }
              }
            }

            .expireTime {
              font-size: 24rpx;
              color: #999;
            }
          }

          &-right {
            width: 30%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            font-weight: 550;
            color: #000;

            label:first-child {
              font-size: 60rpx;
            }

            label:last-child {
              font-size: 30rpx;
            }
          }
        }
      }

      .footer {
        width: 100%;
        padding: 8rpx 0;
        background: #8153fe;
        text-align: center;

        font-weight: 400;
        font-size: 32rpx;
        color: #fff;
      }
    }
  }

  & > .info {
    width: 100%;
    background: #8153fe;
    position: relative;
    padding: 54rpx 34rpx 0;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;

    .user {
      width: 100%;
      height: 382rpx;
      background: #94dc23;
      border-top-left-radius: 24rpx;
      border-top-right-radius: 24rpx;
      padding: 52rpx 32rpx 22rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .header {
        display: flex;

        .avatar {
          width: 120rpx;
          height: 120rpx;
          background: #94dc23;
          border-radius: 50%;
          margin-right: 16rpx;
        }

        .name {
          display: flex;
          align-items: center;

          label {
            font-weight: 550;
            font-size: 40rpx;
            color: #000;
            margin-right: 48rpx;
          }
          image {
            width: 44rpx;
            height: 44rpx;
          }
        }

        .vip {
          margin-top: 22rpx;
          width: 152rpx;
          height: 44rpx;
          line-height: 44rpx;
          background: var(--hw-primary-color);
          border-radius: 8rpx;
          color: #fff;
          font-size: 28rpx;
          text-align: center;
        }
      }

      .address {
        align-self: flex-end;
        font-weight: 400;
        font-size: 28rpx;
        color: #000000;
        display: flex;
        align-items: center;

        image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 16rpx;
        }
      }
    }
  }
}
</style>
