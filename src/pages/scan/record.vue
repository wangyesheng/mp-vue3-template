<template>
  <AppContainer>
    <div class="search-bar">
      <nut-searchbar
        v-model="keywords"
        placeholder="输入客户手机号/订单号查询"
        @search="debounce(onSearch)">
        <template #rightout>
          <nut-button type="primary" @click="debounce(onSearch)">
            查询
          </nut-button>
        </template>
      </nut-searchbar>
    </div>
    <div class="__record">
      <nut-tabs v-model="currentRecordTabKey">
        <nut-tab-pane
          v-for="item in recordTabs"
          :key="item.key"
          :title="item.label"
          :pane-key="item.key"
          :custom-class="currentRecordTabKey == item.key ? 'mount' : 'unmount'">
          <PageList
            :ref="(el) => (item.instance = el)"
            :api="getVerifyRecordsRes"
            :active="currentRecordTabKey == item.key"
            :params="{
              status: item.key,
              ...params
            }">
            <template #item="{ data }">
              <div class="record-item">
                <div class="record-inner">
                  <image :src="data.image" mode="aspectFill" />
                  <div class="record-info">
                    <div class="record-title">{{ data.title }}</div>
                    <div class="record-meta">
                      <span>核销时间：{{ data.createtime }}</span>
                    </div>
                    <div class="record-meta">
                      <span>核销次数：{{ data.verify_number || 1 }} 次</span>
                    </div>
                    <div class="record-meta">
                      <span>客户号码：{{ data.user.mobile }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="data.status == 0" class="record-action">
                  <nut-button
                    plain
                    type="primary"
                    size="small"
                    :loading="revokingId === data.id"
                    :disabled="revokingId === data.id"
                    @click.stop="onRevoke(data)">
                    撤销
                  </nut-button>
                </div>
              </div>
            </template>
          </PageList>
        </nut-tab-pane>
      </nut-tabs>
    </div>
  </AppContainer>
</template>

<script setup>
import { getVerifyRecordsRes, revokeVerifyRes } from '@/api'
import debounce from '@/utils/debounce'
import { isValidPhone } from '@/utils/is'
import { toast } from '@/utils/uni'

const recordTabs = ref([
    { key: 0, label: '已核销', instance: null },
    { key: 1, label: '已撤回核销', instance: null }
  ]),
  currentRecordTabKey = ref(0),
  revokingId = ref(null),
  keywords = ref(''),
  params = ref({})

function refresh() {
  const current = recordTabs.value.find(
    (x) => x.key == currentRecordTabKey.value
  )
  current?.instance?.refresh()
}

async function onSearch() {
  params.value = {}
  if (keywords.value) {
    if (isValidPhone(keywords.value)) {
      params.value.mobile = keywords.value
    } else {
      params.value.order_sn = keywords.value
    }
  }
  refresh()
}

async function onRevoke(data) {
  const { confirm } = await uni.showModal({
    title: '提示',
    content: `确定要撤销该记录吗？撤销后该票券可重新核销。`,
    confirmText: '确定'
  })

  if (!confirm) return

  try {
    revokingId.value = data.id
    await revokeVerifyRes(data.id)
    toast('撤销成功')
    refresh()
  } finally {
    revokingId.value = null
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9999;
}
.__record {
  padding: 132rpx 32rpx 32rpx;
  box-sizing: border-box;

  :deep() {
    .nut-tabs {
      .nut-tabs__titles {
        background: transparent !important;
      }

      .nut-tab-pane {
        padding: 0 !important;
        margin-top: 20rpx !important;
        background: transparent !important;

        &.mount {
          height: 100% !important;
        }

        &.unmount {
          height: 0 !important;
        }
      }
    }
  }

  .record-item {
    background: #fff;
    border-radius: 15rpx;
    overflow: hidden;
    padding: 20rpx;
    position: relative;

    .record-inner {
      display: flex;
      align-items: center;
    }

    image {
      width: 180rpx;
      height: 180rpx;
      border-radius: 10rpx;
      flex-shrink: 0;
    }

    .record-info {
      flex: 1;
      padding: 0 20rpx;
      display: flex;
      flex-direction: column;
      row-gap: 10rpx;
      min-width: 0;

      .record-title {
        font-weight: 550;
        font-size: 30rpx;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .record-meta {
        font-size: 24rpx;
        color: #888;
      }
    }

    .record-action {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
