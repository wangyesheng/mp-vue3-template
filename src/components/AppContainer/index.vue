<template>
  <nut-config-provider :theme-vars="themeVars">
    <div :class="['app-contanier', customClass]">
      <nut-toast />
      <slot />
    </div>
    <nut-tabbar
      v-if="canShowTabbar"
      bottom
      controlled
      placeholder
      safe-area-inset-bottom
      @tab-switch="onSwitchTab">
      <nut-tabbar-item v-for="item in tabbarList" :key="item.title">
        <template #icon>
          <div class="py-[10rpx]">
            <nut-animate v-if="item.key == 'scan'" type="flicker" loop>
              <button v-if="appToken" :class="[item.key]">
                <image :src="getTabberIcon(item)" mode="aspectFill" />
              </button>
              <button
                v-else
                :class="[item.key]"
                open-type="getUserInfo"
                @click.stop="login">
                <image :src="getTabberIcon(item)" mode="aspectFill" />
              </button>
            </nut-animate>

            <div
              v-else
              :class="[
                'custom-tabbar-item',
                item.key,
                item.path.includes(currentPath) ? 'active' : ''
              ]">
              <image :src="getTabberIcon(item)" mode="aspectFill" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </template>
      </nut-tabbar-item>
    </nut-tabbar>

    <BindMobile
      v-model:visible="bindMobileVisible"
      :get-phone-number="getPhoneNumber" />
  </nut-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import home from '../../static/images/tabbar/home.png'
import homeSelected from '../../static/images/tabbar/home-selected.png'
import me from '../../static/images/tabbar/me.png'
import meSelected from '../../static/images/tabbar/me-selected.png'
import scan from '../../static/images/tabbar/scan.png'
import { useLogin } from '@/hooks/useLogin'
import { useAppStore } from '@/stores/app'

defineProps({
  customClass: {
    type: String,
    default: ''
  }
})

const themeVars = reactive({
  primaryColor: '#8153FE',
  primaryColorEnd: '#8153FE',
  tagPrimaryBackgroundColor: '#8153FE'
})

const tabbarList = [
  {
    key: 'home',
    title: '首页',
    icon: home,
    selectedIcon: homeSelected,
    path: '/pages/home/index'
  },
  { key: 'scan', title: '扫码核销', icon: scan, path: '/pages/scan/index' },
  {
    key: 'me',
    title: '我的',
    icon: me,
    selectedIcon: meSelected,
    path: '/pages/me/index'
  }
]

const { bindMobileVisible, login, getPhoneNumber } = useLogin(() => {
  uni.switchTab({
    url: '/pages/scan/index'
  })
})
const { appToken } = storeToRefs(useAppStore())

const currentPath = computed(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return currentPage.route
})

const canShowTabbar = computed(
  () => !!tabbarList.find((item) => item.path.includes(currentPath.value))
)

function getTabberIcon(item) {
  if (item.key == 'scan') {
    return item.icon
  } else {
    return item.path.includes(currentPath.value) ? item.selectedIcon : item.icon
  }
}

function onSwitchTab(item, index) {
  const { path, key } = tabbarList[index]
  if (key === 'scan' && !appToken.value) return
  uni.switchTab({
    url: path
  })
}
</script>

<style lang="scss">
.app-contanier {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  padding-bottom: calc(50rpx + env(safe-area-inset-bottom));
}
</style>
