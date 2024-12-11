<template>
  <AppContainer>
    <div
      class="bg-[#344AD9] w-full h-[400rpx] py-[60rpx] px-[30rpx] box-border">
      <div class="flex items-center">
        <img
          class="w-[100rpx] h-[100rpx]"
          :src="noPreviewAuth ? noAuthIcon : signInfo.icon"
          alt="" />
        <span class="text-[32rpx] font-[550] text-[#fff] ml-[10rpx]">
          {{ noPreviewAuth ? '您无权查看' : signInfo.label }}
        </span>
      </div>
    </div>
    <div class="content">
      <div class="text-center text-[32rpx] font-[550]">
        {{ currentContract.template_name }}
      </div>
      <image
        class="w-[400rpx]"
        src="https://jsxyq.tuomuit.com/wechat/image/share.png"
        mode="widthFix" />
      <div class="text-[28rpx] text-[#333]">
        <div>
          <span>甲方：</span>
          <span>{{ currentContract.first_party }}</span>
        </div>
        <div v-if="currentContract.second_party_id" class="mt-[10rpx]">
          <span>乙方：</span>
          <span>{{ currentContract.second_party }}</span>
        </div>
      </div>
    </div>

    <div class="footer flex justify-center items-center">
      <nut-button
        v-if="appUser.id"
        block
        size="large"
        type="primary"
        :disabled="noPreviewAuth"
        @click="onPreviewContract">
        查看合同
      </nut-button>

      <nut-button
        v-else
        block
        size="large"
        type="primary"
        open-type="getUserInfo"
        @click="login">
        查看合同
      </nut-button>
    </div>

    <BindMobile
      v-model:visible="bindMobileVisible"
      :getPhoneNumber="getPhoneNumber" />
  </AppContainer>
</template>

<script setup>
import AppContainer from '@/components/AppContainer/index'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { navTo, toast } from '../../utils/uni'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { useLogin } from '../../hooks/useLogin'
import { computed, ref } from 'vue'
import { bindPartyBRes, getContractDetailsRes } from '../../api'
import { signInvitationStatusMap } from '../../constant'
import noAuthIcon from '../../static/images/noAuth.png'

const { appUser } = storeToRefs(useAppStore())
const { bindMobileVisible, login, getPhoneNumber } = useLogin()

const currentContract = ref({}),
  signInfo = ref({}),
  noPreviewAuth = computed(
    () =>
      currentContract.value.status > 2 &&
      currentContract.value.second_party_id != appUser.value.id &&
      currentContract.value.first_party_id != appUser.value.id
  )
async function refreshData(contractId) {
  const data = await getContractDetailsRes(contractId)
  currentContract.value = data || {}
  signInfo.value = signInvitationStatusMap[currentContract.value.status]
}

onLoad(({ contractId = 32 }) => {
  refreshData(contractId)
})

onShow(() => {
  if (currentContract.value.id) refreshData(currentContract.value.id)
})

async function onPreviewContract() {
  if (appUser.value.real_status == 0) {
    navTo(`/pages/template/complete-userinfo`)
    return
  }

  if (currentContract.value.first_party_id == appUser.value.id) {
    // 甲乙方为同一人
    toast(`甲乙方不能为同一人`)
    return
  }

  if (currentContract.value.status == 2) {
    // 待乙方操作状态下才需要绑定乙方信息
    await bindPartyBRes(currentContract.value.id)
  }

  if (noPreviewAuth.value) {
    // 已绑定乙方信息，此时查看合同的人必须是甲乙方一个
    toast(`您无权查看该合同`)
    return
  }

  navTo(`/pages/contract/index?id=${currentContract.value.id}`)
}
</script>

<style lang="scss" scoped>
.content {
  background: #fff;
  width: 90%;
  height: 50vh;
  border-radius: 20rpx;
  position: absolute;
  top: 250rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 30rpx 0;
  box-sizing: border-box;
}
</style>
