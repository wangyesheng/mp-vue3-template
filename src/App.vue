<script setup>
onLaunch(() => {
  if (uni.canIUse('getUpdateManager')) {
    const updateManager = uni.getUpdateManager()

    updateManager.onCheckForUpdate((res) => {
      console.info('检查更新结果:', res.hasUpdate)
    })

    updateManager.onUpdateReady(() => {
      uni.showModal({
        title: '更新提示',
        content: '新版本已准备好，是否立即重启应用？',
        success(res) {
          if (res.confirm) updateManager.applyUpdate()
        }
      })
    })

    updateManager.onUpdateFailed(() => {
      console.error('更新下载失败')
    })
  } else {
    console.warn('当前基础库不支持 getUpdateManager')
  }
})
</script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import 'nutui-uniapp/styles/index.scss';
@import './index.scss';
</style>
