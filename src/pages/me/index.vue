<template>
  <AppContainer>
    <div class="__me">
      <div class="userInfo">
        <div class="inner" v-if="appUser.id">
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
          <div class="cardInfo">
            <div class="item">
              <span>{{ userTabletInfo.coupon_num ?? appUser.coupon_num }}</span>
              <div></div>
              <span>券票/张</span>
            </div>
            <div class="item">
              <span>{{ userTabletInfo.ticket_num ?? appUser.ticket_num }}</span>
              <div></div>
              <span>次卡/次</span>
            </div>
            <div class="item">
              <span>
                {{ userTabletInfo.year_card_num ?? appUser.year_card_num }}
              </span>
              <div></div>
              <span>年卡/天</span>
            </div>
          </div>
        </div>
        <div v-else class="noLoginUser" open-type="getUserInfo" @click="login">
          <div class="avatar-wrap">
            <img src="../../static/images/me/noLoginUser.png" alt="" />
          </div>
          <span>请登录</span>
        </div>
        <div class="position">
          <div class="inner">
            <div>
              <img src="../../static/images/home/map.png" alt="" />
              <span>HAOWEN LAND北京密云店</span>
            </div>
          </div>
        </div>
      </div>

      <div class="funcs">
        <div
          class="item"
          v-for="item in funcs"
          :key="item.label"
          @click="item.handler ? item.handler() : navTo(item.page)">
          <image :src="item.icon" mode="aspectFill" />
          <span>{{ item.label }}</span>
        </div>
      </div>

      <Recharge
        v-model:visible="rechargePopupVisible"
        :levels="rechargeLevels" />
      <BindMobile
        v-model:visible="bindMobileVisible"
        :getPhoneNumber="getPhoneNumber" />
    </div>
  </AppContainer>
</template>

<script setup>
import Recharge from '@/components/Recharge/index'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { getUserTabletRes } from '../../api'
import { ref } from 'vue'
import { useLogin } from '../../hooks/useLogin'
import { navTo, toast } from '../../utils/uni'
import orderIcon from '../../static/images/me/order.png'
import appointmentIcon from '../../static/images/me/appointment.png'
import babyIcon from '../../static/images/me/baby.png'
import contractIcon from '../../static/images/me/contract.png'
import couponIcon from '../../static/images/me/coupon.png'
import giftIcon from '../../static/images/me/gift.png'
import settingIcon from '../../static/images/me/setting.png'
import walletIcon from '../../static/images/me/wallet.png'
import { onShow } from '@dcloudio/uni-app'

const funcs = [
  {
    label: '我的订单',
    icon: orderIcon
    // page: '/pages/order/index'
  },
  {
    label: '入园预约',
    icon: appointmentIcon,
    handler() {
      return toast('Coming Soon')
    }
  },
  {
    label: '我的卡包',
    icon: walletIcon,
    page: '/pages/me/wallet'
  },
  {
    label: '我的券包',
    icon: couponIcon,
    page: '/pages/coupon/my'
  },
  {
    label: '联系客服',
    icon: contractIcon,
    page: '/pages/help/customer-service'
  },
  {
    label: '宝贝管理',
    icon: babyIcon,
    page: '/pages/me/baby'
  },
  {
    label: '兑换中心',
    icon: giftIcon,
    page: '/pages/mall/index'
  },
  {
    label: '设置',
    icon: settingIcon,
    page: '/pages/me/setting'
  }
]

const appStore = useAppStore()
const { appUser } = storeToRefs(appStore)
const { bindMobileVisible, login, getPhoneNumber } = useLogin(getUserTablet)

const userTabletInfo = ref({})
async function getUserTablet() {
  if (appUser.value.id) {
    const data = await getUserTabletRes()
    userTabletInfo.value = data
  }
}
onShow(getUserTablet)

// const baseUrl = import.meta.env.VITE_BASE_API
// const uploadUrl = `${baseUrl}/api/common/upload`
// async function onChooseAvatar(e) {
//   const {
//     detail: { avatarUrl }
//   } = e

//   uni.uploadFile({
//     url: uploadUrl,
//     filePath: avatarUrl,
//     name: 'file',
//     header: {
//       token: appUser.value.token,
//       'content-type': 'multipart/form-data'
//     },
//     success: async (result) => {
//       const {
//         code,
//         data: { fullurl },
//         msg
//       } = JSON.parse(result.data)
//       if (code !== 1) {
//         toast(msg)
//       } else {
//         await updateUserRes({ avatar: fullurl })
//         const newUserInfo = {
//           ...appUser.value,
//           avatar: fullurl
//         }
//         appStore.setAppUser(newUserInfo)
//         uni.setStorageSync('APP_USER', newUserInfo)
//       }
//     },
//     fail: (uploadFileErr) => {
//       console.log('upload::error', uploadFileErr)
//       toast('上传失败！')
//     }
//   })
// }

// async function onNicknameChange(e) {
//   const value = e.detail.value
//   if (value) {
//     await updateUserRes({ nickname: value, username: value })
//     appStore.setAppUser({
//       ...appUser.value,
//       nickname: value,
//       username: value
//     })
//     uni.setStorageSync('APP_USER', appUser.value)
//   }
// }
</script>

<style lang="scss" scoped>
.__me {
  position: relative;
  min-height: 100vh;
  .wallet {
    ::v-deep() {
      .nut-button {
        background: #e3c377 !important;
        width: 144rpx !important;
        height: 48rpx !important;
        color: #333 !important;
        font-size: 24rpx !important;
      }
    }
  }

  .noLoginUser {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 32rpx;
    color: #fff;
    position: absolute;
    top: 80rpx;
    left: 50%;
    transform: translateX(-50%);

    .avatar-wrap {
      width: 180rpx;
      height: 180rpx;
      background: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20rpx;

      image {
        width: 100rpx;
        height: 100rpx;
      }
    }
  }

  .userInfo {
    width: 100%;
    height: 560rpx;
    background: #8153fe;
    position: relative;

    & > .inner {
      padding: 20rpx 70rpx 0;
      box-sizing: border-box;

      .header {
        display: flex;

        .avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          margin-right: 16rpx;
        }

        .name {
          display: flex;
          align-items: center;

          label {
            font-size: 40rpx;
            font-weight: 550;
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
          background: #94dc23;
          border-radius: 8rpx;
          color: #fff;
          font-size: 28rpx;
          text-align: center;
        }
      }

      .cardInfo {
        margin-top: 62rpx;
        display: flex;
        justify-content: space-between;

        .item {
          padding: 16rpx 28rpx;
          box-sizing: border-box;
          border-radius: 16rpx;
          border: 2rpx solid #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;

          label:first-child {
            font-weight: 550;
            font-size: 40rpx;
          }
          label:last-child {
            font-weight: 400;
            font-size: 28rpx;
          }

          view {
            height: 2rpx;
            width: 100%;
            background: #fff;
            margin: 8rpx 0;
            position: relative;

            &::before {
              content: '';
              width: 6px;
              height: 6px;
              background: #fff;
              border-radius: 50%;
              position: absolute;
              top: -3px;
              left: 0;
            }

            &::after {
              content: '';
              width: 6px;
              height: 6px;
              background: #fff;
              border-radius: 50%;
              position: absolute;
              top: -3px;
              right: 0;
            }
          }
        }
      }
    }

    .position {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;

      & > .inner {
        background: url(https://hwly.tuomuit.com/wechat/img/me-position-bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 750rpx;
        height: 138rpx;
        padding: 32rpx 88rpx;
        box-sizing: border-box;

        view {
          display: flex;
          align-items: center;
          image {
            width: 40rpx;
            height: 40rpx;
            margin-right: 16rpx;
          }

          label {
            color: #000;
            font-size: 28rpx;
          }
        }
      }
    }
  }

  .funcs {
    padding: 24rpx 52rpx 48rpx;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    row-gap: 24rpx; // 在第一行与第二行之间产生 24rpx 的间距

    // 1. 将容器设置为 Grid 网格布局 2. 容器内的直接子元素自动成为网格项
    // display: grid;

    // grid-template-columns: repeat(4, 1fr);
    // 定义列的结构，
    // 1. repeat(4, 1fr) - 重复4次，每次1份
    // 2. 完整写法等同于：1fr 1fr 1fr 1fr
    // 3. 1fr = 1个"份额"单位（fraction），表示可用空间的一份
    // 4. 结果：创建 4列，每列宽度相等（平分容器宽度）
    // 5. 其他写法
    // 固定宽度
    // grid-template-columns: 100rpx 100rpx 100rpx 100rpx;
    // 混合单位
    // grid-template-columns: 200rpx 1fr 1fr 2fr; // 第一列固定200rpx，后面按比例分配
    // 百分比
    // grid-template-columns: 25% 25% 25% 25%;

    // 定义行的结构
    // 1. repeat(2, 148rpx) - 重复2次，每次148rpx
    // 2. 完整写法等同于：148rpx 148rpx
    // 3. 结果：创建 2行，每行高度固定为 148rpx
    // grid-template-rows: repeat(2, 148rpx);

    // 定义网格项之间的间隙
    // 1. 行间距和列间距都是 24rpx
    // 2. 完整写法：gap: 24rpx 24rpx;（行间距 列间距）
    // 3. 旧属性名：grid-gap
    // gap: 24rpx;

    .item {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      // 选中第一行的四个元素
      // &:nth-child(-n + 4) {
      //   margin-bottom: 24rpx;
      // }

      // 选中第二行的四个元素
      // &:nth-child(n + 5) {
      //   margin-top: 24rpx;
      // }

      image {
        width: 92rpx;
        height: 92rpx;
        border-radius: 8rpx;
        margin-bottom: 16rpx;
      }

      label {
        font-weight: 400;
        font-size: 28rpx;
        color: #000;
      }
    }
  }
}
</style>
