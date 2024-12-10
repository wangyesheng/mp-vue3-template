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
export function getPartyAContractsRes(data) {
  return request({
    url: `/api/template/get_first_sign_list`,
    method: 'get',
    data
  })
}

// 乙方合同 - 废弃
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

export function partyASignRes(data) {
  return request({
    url: `/api/template/first_sign`,
    method: 'post',
    data
  })
}

export function changeContractStatusRes(id) {
  return request({
    url: `/api/template/change_status?id=${id}`,
    method: 'get'
  })
}

export function bindPartyBRes(id) {
  return request({
    url: `/api/template/second_bind`,
    method: 'post',
    data: {
      id
    }
  })
}

export function refuseContractSignRes(id) {
  return request({
    url: `/api/template/refuse`,
    method: 'post',
    data: {
      id
    }
  })
}

export function getPackagesRes() {
  return request({
    url: `/api/template_package/get_package_list`,
    method: 'get'
  })
}

export function buyPackageRes(data) {
  return request({
    url: `/api/template_package/buy_package`,
    method: 'post',
    data
  })
}

export function getMoneyLogsRes(data) {
  return request({
    url: `/api/template_package/get_my_package_list`,
    method: 'get',
    data
  })
}

export function getSignPriceRes() {
  return request({
    url: `/api/user/get_sign_price`,
    method: 'get'
  })
}

export function partyBCallPayRes(data) {
  return request({
    url: `/api/template/second_create`,
    method: 'post',
    data
  })
}

export function partyBSignRes(data) {
  return request({
    url: `/api/template/second_sign`,
    method: 'post',
    data
  })
}

export function getFreeTimesRes() {
  return request({
    url: `/api/template/get_free_times`,
    method: 'get'
  })
}

export function getAboutUsRes() {
  return request({
    url: `/api/user/about_us`,
    method: 'get'
  })
}

export function getUserAgreementRes() {
  return request({
    url: `/api/user/agreement`,
    method: 'get'
  })
}
