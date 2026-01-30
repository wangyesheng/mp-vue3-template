<template>
  <AppContainer>
    <nut-searchbar v-model="mobile" placeholder="输入客户手机号查询">
      <template #rightout>
        <nut-button type="primary" @click="debounce(onSearch)">搜索</nut-button>
      </template>
    </nut-searchbar>

    <div class="px-[30rpx] py-[20rpx]">
      <PageList
        ref="pageListRef"
        :active="false"
        :api="getOrderByPhoneRes"
        :params="{ mobile }">
        <template #item="{ data }">
          <WalletItem
            :data="data"
            only-show-bind-baby-action
            @show-select-baby-popup-visible="
              () => selectBabyPopupRef.show(data)
            " />
        </template>
      </PageList>
      <SelectBabyPopup
        ref="selectBabyPopupRef"
        :baby-list="babyList"
        :code="mobile"
        @refresh="() => pageListRef.refresh()" />
    </div>
  </AppContainer>
</template>

<script setup>
import { getOrderByPhoneRes, getUserBabyListRes } from '@/api'
import debounce from '@/utils/debounce'
import { isValidPhone } from '@/utils/is'
import { toast } from '@/utils/uni'

const mobile = ref('15895347201'),
  pageListRef = ref(),
  selectBabyPopupRef = ref(),
  babyList = ref([])

let currentUserId
async function getBabyList() {
  if (currentUserId) {
    const data = await getUserBabyListRes(currentUserId)
    babyList.value = data
  }
}

async function onSearch() {
  if (!isValidPhone(mobile.value)) {
    return toast('手机号格式不正确！')
  }
  await pageListRef.value.refresh()
  const data = pageListRef.value.getData()
  currentUserId = data[0]?.user_id
  getBabyList()
}

onShow(getBabyList)
</script>

<style lang="scss" scoped>
::v-deep() {
  .nut-searchbar {
    .nut-searchbar__search-input {
      height: 100rpx !important;
      border-radius: 100rpx !important;

      input {
        font-size: 30rpx;
      }
    }
  }
}
</style>
