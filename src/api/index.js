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
