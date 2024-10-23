export function calcMenuButton() {
  const menuInfo = uni.getMenuButtonBoundingClientRect()
  const headerTop = menuInfo.top + menuInfo.height * 2,
    contentTop = headerTop + 80

  return [headerTop, contentTop]
}
