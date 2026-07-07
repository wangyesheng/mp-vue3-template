export function calcMenuButton() {
  const menuInfo = (() => {
    try {
      return uni.getMenuButtonBoundingClientRect()
    } catch {
      return { height: 0, top: 20 }
    }
  })()
  const headerTop = menuInfo.top + menuInfo.height * 2
  const contentTop = headerTop + 80

  return [headerTop, contentTop]
}
