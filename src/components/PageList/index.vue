<template>
  <view v-if="pageInfo.data?.length > 0" id="pageListWrap" class="page-wrap">
    <view class="page-list" :style="{ '--item-gap': gap + 'rpx' }">
      <view
        v-for="(item, index) in pageInfo.data"
        :key="index"
        class="page-item"
        :style="getPageItemStyle()">
        <slot name="item" :data="item" />
      </view>
    </view>
    <view
      v-if="pageInfo.end && isOverScreen"
      class="h-[6vh] relative flex justify-center items-center text-[#999] text-[28rpx]">
      没有更多了...
    </view>
    <view v-if="pageInfo.loading && !isRefresh" class="h-[6vh] relative">
      <Loading position="absoluted" />
    </view>
  </view>
  <view v-else class="py-[10vh] relative">
    <Loading v-if="pageInfo.loading" show-text position="absoluted" />
    <Empty v-else />
  </view>
</template>

<script setup>
import { useAppStore } from '@/stores/app'

const props = defineProps({
  active: {
    type: Boolean,
    default: true
  },
  api: {
    type: Function,
    required: true
  },
  params: {
    type: Object,
    default: () => ({})
  },
  limit: {
    type: Number,
    default: 10
  },
  contentFullHeight: {
    // 占满内容区的高度，一般默认是设备的可使用窗口高度，用于计算是否需要显示底部 `没有更多了` 的文案
    type: Number,
    default: uni.getSystemInfoSync().windowHeight
  },
  cols: {
    type: [Number, String],
    default: 1
  }
})

const { appToken } = storeToRefs(useAppStore())
const instance = getCurrentInstance()
const pageInfo = ref({
    loading: false,
    end: false,
    data: [],
    page: 1,
    limit: props.limit
  }),
  isOverScreen = ref(false),
  isRefresh = ref(false),
  isError = ref(false) // 刷新页面时不显示 loading

const gap = 20
function getPageItemStyle() {
  if (props.cols == 1) return { width: '100%' }

  // 一行多列的情况下，需要计算(总宽度 - (总列数 - 1 * 间隔 gap)) / 总列数
  // 假设一行三列，gap 设置的是 20，那么第一列与第二列有间隔，第二列与第三列有间隔，也就是总间隔为 2 * 20
  // 即每列宽度就得以 (100% - (3 - 1 * 20)) / 3 => (100% - 40) / 3 => (100 / 3)% - 40 / 3
  // 这里还有一个坑，就是假设单位换成 rpx 的话，那么 13.33333rpx 在小程序渲染的时候就会变成 6px，所以此处直接除 2 以 px 为单位
  const rest = ((props.cols - 1) * gap) / props.cols / 2 + 'px'
  return {
    width: `calc(${100 / props.cols}% - ${rest})`
  }
}

watch(
  () => props.active,
  (newValue) => {
    if (newValue && pageInfo.value.data.length === 0) {
      getData(1)
    }
  },
  {
    immediate: true
  }
)

async function getData(page) {
  if (!appToken.value) return
  try {
    pageInfo.value.loading = true
    if (page == 1) {
      pageInfo.value.page = 1
      pageInfo.value.end = false
    }

    const result = await props.api({
      ...props.params,
      page: pageInfo.value.page,
      limit: pageInfo.value.limit
    })

    if (Array.isArray(result) && result.length === 0) {
      pageInfo.value.data = result
      pageInfo.value.end = true
      return
    }

    const { total, data } = result
    pageInfo.value.data =
      pageInfo.value.page == 1 ? data : pageInfo.value.data.concat(data)

    if (total <= pageInfo.value.data.length) {
      pageInfo.value.end = true
    }
    if (!isOverScreen.value) {
      // 数据加载完成后检查是否超过一屏
      checkOverScreen()
    }
  } catch (error) {
    isError.value = true
    pageInfo.value.loading = false
  } finally {
    pageInfo.value.loading = false
  }
}

// 检查内容是否超过一屏
function checkOverScreen() {
  setTimeout(() => {
    // 延迟确保渲染完成
    uni
      .createSelectorQuery()
      .in(instance.proxy) // 在组件内部使用 createSelectorQuery 必须指定组件实例，否则查询不到
      .select('#pageListWrap') // 使用 id 选择器更可靠
      .boundingClientRect()
      .exec((res) => {
        if (res && res[0]) {
          const { height } = res[0]
          isOverScreen.value = height > props.contentFullHeight
        }
      })
  })
}

onReachBottom(async () => {
  if (
    props.active &&
    !pageInfo.value.end &&
    !pageInfo.value.loading &&
    !isRefresh.value &&
    !isError.value
  ) {
    pageInfo.value.page++
    await getData()
  }
})

onPullDownRefresh(async () => {
  if (props.active && !pageInfo.value.loading) {
    try {
      isRefresh.value = true
      uni.showLoading({
        title: '下拉刷新中...',
        mask: true
      })
      await getData(1)
    } finally {
      uni.hideLoading()
      isRefresh.value = false
    }
  }
  uni.stopPullDownRefresh()
})

defineExpose({
  async refresh() {
    try {
      isRefresh.value = true
      await nextTick()
      await getData(1)
    } finally {
      isRefresh.value = false
    }
  },
  getData() {
    return pageInfo.value.data
  }
})
</script>

<style lang="scss" scoped>
.page-wrap {
  .page-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--item-gap);
  }
}
</style>
