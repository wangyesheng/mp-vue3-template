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
    method: 'post'
  })
}

export function getTemplatesRes() {
  return request({
    url: '/api/template/get_list?page=1&limit=10',
    method: 'get'
  })
}

export function getTemplateDetailRes(id) {
  return request({
    url: `/api/template/get_detail?id=${id}`,
    method: 'get'
  })
}

export function createContractRes(data) {
  return request({
    url: `/api/template/create`,
    method: 'post',
    data
  })
}

// 甲方合同
export function getPartyAContractsRes(id) {
  return request({
    url: `/api/template/get_first_sign_list?page=1&limit=10`,
    method: 'get'
  })
}

// 乙方合同
export function getPartyBContractsRes(id) {
  return request({
    url: `/api/template/get_second_sign_list?page=1&limit=10`,
    method: 'get'
  })
}

export function getContractDetailsRes(id) {
  return request({
    url: `/api/template/get_sign_detail?id=${id}`,
    method: 'get'
  })
}
