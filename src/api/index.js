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
    url: '/api/user/userinfo',
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

export function getBannersRes() {
  return request({
    url: '/api/banner/list?type=1',
    method: 'get'
  })
}
