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

export function navTo(url, needToken = true) {
  if (needToken) {
    const appUser = uni.getStorageSync('APP_USER') || {}
    if (!appUser.id) {
      return toast('请授权登录')
    }
  }

  uni.navigateTo({
    url
  })
}

export function switchTab(url, needToken = true) {
  if (needToken) {
    const appUser = uni.getStorageSync('APP_USER') || {}
    if (!appUser.id) {
      return toast('请授权登录')
    }
  }

  uni.switchTab({ url })
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

export function addHtmlClassName(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') {
    return htmlString
  }
  return htmlString
    .replace(/<div/g, '<div class="div"')
    .replace(/<p/g, '<p class="p"')
    .replace(/<strong/g, '<strong class="strong"')
    .replace(/<ul/g, '<ul class="ul"')
    .replace(/<li/g, '<li class="li"')
    .replace(/<span/g, '<span class="span"')
    .replace(/<img/g, '<img class="img"')
}
