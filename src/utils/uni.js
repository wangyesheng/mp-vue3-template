export function toast(message) {
  uni.showToast({
    icon: 'none',
    title: message,
    duration: 3000
  })
}

export function copy(content, tips = '复制成功') {
  uni.setClipboardData({
    data: content,
    success() {
      toast(tips)
    }
  })
}

export function navTo(url) {
  const appUser = uni.getStorageSync('APP_USER') || {}
  if (!appUser.id) {
    return toast('请授权登录')
  }
  uni.navigateTo({
    url
  })
}

export function previewImage(urls) {
  uni.previewImage({
    urls
  })
}

export function callPhone(phoneNumber) {
  if (phoneNumber) {
    uni.makePhoneCall({
      phoneNumber
    })
  }
}

export function setNavigationBarTitle(title) {
  uni.setNavigationBarTitle({ title })
}
