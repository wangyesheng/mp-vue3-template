import request from '../utils/request'

export function decryUserPhoneRes(data) {
  return request({
    url: '/api/user/decry_phone',
    method: 'post',
    data: {
      ...data,
      platform_type: 1
    }
  })
}

export function checkLoginRes(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: {
      ...data,
      platform_type: 1
    }
  })
}

export function getUserInfoRes() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

export function updateUserRes(data) {
  return request({
    url: '/api/user/profile',
    method: 'post',
    data
  })
}

export function getAppNameRes() {
  return request({
    url: '/api/index/store_name',
    method: 'get'
  })
}

export function getOrderInfoRes(order_sn) {
  return request({
    url: '/api/order/info',
    method: 'get',
    data: {
      order_sn
    }
  })
}

export function bindOrderRes(data) {
  return request({
    url: '/api/order/bind',
    method: 'post',
    data
  })
}

export function getOrderListRes(data) {
  return request({
    url: '/api/order/list',
    method: 'get',
    data
  })
}

export function getOrderDetailRes(order_id) {
  return request({
    url: '/api/order/detail',
    method: 'get',
    data: {
      order_id
    }
  })
}

export function confirmOrderRes(order_id) {
  return request({
    url: '/api/order/confirm',
    method: 'post',
    data: { order_id }
  })
}

export function rateOrderRes(data) {
  return request({
    url: '/api/order/review',
    method: 'post',
    data
  })
}

export function getRateInfoRes(order_id) {
  return request({
    url: '/api/order/get_review',
    method: 'get',
    data: {
      order_id
    }
  })
}

export function afterSaleSubmitRes(data) {
  return request({
    url: '/api/order/aftersale',
    method: 'post',
    data
  })
}

export function getAfterSaleTimelineRes(aftersale_id) {
  return request({
    url: '/api/order/get_aftersale_timeline',
    method: 'get',
    data: {
      aftersale_id
    }
  })
}

export function getAfterSaleDetailRes(aftersale_id) {
  return request({
    url: '/api/order/get_aftersale',
    method: 'get',
    data: {
      aftersale_id
    }
  })
}

export function getGoodsRes(data) {
  return request({
    url: '/api/points/goods_list',
    method: 'get',
    data
  })
}

export function exchangeGoodRes(data) {
  return request({
    url: '/api/points/exchange',
    method: 'post',
    data
  })
}
