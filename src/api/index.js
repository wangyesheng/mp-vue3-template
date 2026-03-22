import request from '../utils/request'

export function decryUserPhoneRes(data) {
  return request({
    url: '/api/user/decry_phone',
    method: 'post',
    data
  })
}

export function checkLoginRes(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
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

export function getOrderBindInfoRes(order_sn) {
  return request({
    url: `/api/order/bind_info?order_sn=${order_sn}`,
    method: 'get'
  })
}

export function bindOrderRes(data) {
  return request({
    url: '/api/order/bind',
    method: 'post',
    data
  })
}
