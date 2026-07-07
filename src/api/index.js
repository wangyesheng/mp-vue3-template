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

export function h5LoginRes(data) {
  return request({
    url: '/api/user/account_login',
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

export function getGoodRecoedsRes(data) {
  return request({
    url: '/api/points/my_exchange',
    method: 'get',
    data
  })
}

export function saveReceiptInfoRes(data) {
  return request({
    url: '/api/address/save',
    method: 'post',
    data
  })
}

export function getReceiptListRes(data) {
  return request({
    url: '/api/address/list',
    method: 'get',
    data
  })
}
export function deleteReceiptInfoRes(id) {
  return request({
    url: '/api/address/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function getReceiptInfoRes(id) {
  return request({
    url: '/api/address/detail',
    method: 'get',
    data: {
      id
    }
  })
}

export function confirmReceiveRes(exchange_id) {
  return request({
    url: '/api/points/confirm_receive',
    method: 'post',
    data: {
      exchange_id
    }
  })
}

export function confirmAfterSaleRes(aftersale_id) {
  return request({
    url: '/api/order/confirm_aftersale',
    method: 'post',
    data: {
      aftersale_id
    }
  })
}

export function getUserProtocolRes() {
  return request({
    url: '/api/index/user_agreement',
    method: 'get'
  })
}

export function getPrivateProtocolRes() {
  return request({
    url: '/api/index/privacy_agreement ',
    method: 'get'
  })
}
