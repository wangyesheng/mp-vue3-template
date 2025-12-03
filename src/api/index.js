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

export function getBannersRes() {
  return request({
    url: '/api/banner/list',
    method: 'get'
  })
}

export function getTicketsRes(data) {
  return request({
    url: '/api/ticket/list',
    method: 'get',
    data
  })
}

export function getTicketDetailsRes(id) {
  return request({
    url: `/api/ticket/detail?id=${id}`,
    method: 'get'
  })
}

export function getCarTypesRes() {
  return request({
    url: '/api/index/get_vehicle_list',
    method: 'get'
  })
}

export function createOrderRes(data) {
  return request({
    url: '/api/order/create_order',
    method: 'post',
    data
  })
}

export function getOrdersRes(data) {
  return request({
    url: `/api/order/get_order_list`,
    method: 'get',
    data
  })
}

export function getOrderDetailsRes(order_number) {
  return request({
    url: `/api/order/get_order_detail?order_number=${order_number}`,
    method: 'get'
  })
}

export function callPayRes(data) {
  return request({
    url: `/api/order/pay`,
    method: 'post',
    data
  })
}

export function cancelOrderRes(order_number) {
  return request({
    url: `/api/order/cancel_order`,
    method: 'post',
    data: {
      order_number
    }
  })
}

export function confirmOrderRes(order_number) {
  return request({
    url: `/api/order/confirm_order?order_number=${order_number}`,
    method: 'get'
  })
}

export function getWalletInfoRes(data) {
  return request({
    url: `/api/user/mycard`,
    method: 'get',
    data
  })
}

export function getCouponsRes(data) {
  return request({
    url: `/api/coupon/list`,
    method: 'get',
    data
  })
}

export function receiveCouponRes(coupon_id) {
  return request({
    url: `/api/coupon/receive`,
    method: 'post',
    data: {
      coupon_id
    }
  })
}

export function getMyCouponsRes(data) {
  return request({
    url: `/api/coupon/my`,
    method: 'get',
    data
  })
}

export function getAvailableCouponsRes(data) {
  return request({
    url: `/api/coupon/usable`,
    method: 'get',
    data
  })
}

export function getTicketPriceRes(data) {
  return request({
    url: `/api/order/settlement`,
    method: 'post',
    data
  })
}

export function getRechargeLevelsRes() {
  return request({
    url: `/api/recharge/get_list`,
    method: 'get'
  })
}

export function callRechargeRes(data) {
  return request({
    url: `/api/recharge/recharge`,
    method: 'post',
    data
  })
}

export function getMoneyLogsRes(data) {
  return request({
    url: `/api/user/user_money_log`,
    method: 'get',
    data
  })
}

export function getFlowProcessRes() {
  return request({
    url: `/api/index/get_flow`,
    method: 'get'
  })
}

export function getAboutUsRes() {
  return request({
    url: `/api/index/get_about`,
    method: 'get'
  })
}

export function getTelRes() {
  return request({
    url: `/api/index/get_tel`,
    method: 'get'
  })
}

export function getQQMapKeyRes() {
  return request({
    url: `/api/index/get_map_key`,
    method: 'get'
  })
}

export function addComplaintRes(data) {
  return request({
    url: `/api/complaint/add_complaint`,
    method: 'post',
    data
  })
}

export function getComplaintTypesRes() {
  return request({
    url: `/api/index/get_complaint_type`,
    method: 'get'
  })
}

export function getComplaintsRes() {
  return request({
    url: `/api/complaint/get_complaint_list`,
    method: 'get'
  })
}

export function getComplaintDetailsRes(complaint_id) {
  return request({
    url: `/api/complaint/get_complaint_detail?complaint_id=${complaint_id}`,
    method: 'get'
  })
}

export function getFeedbackTypesRes() {
  return request({
    url: `/api/index/get_feedback_type`,
    method: 'get'
  })
}

export function getMyFeedbacksRes() {
  return request({
    url: `/api/feedback/get_feedback_list`,
    method: 'get'
  })
}

export function getFeedbackDetailsRes(feedback_id) {
  return request({
    url: `/api/feedback/get_feedback_detail?feedback_id=${feedback_id}`,
    method: 'get'
  })
}

export function addFeedbackRes(data) {
  return request({
    url: `/api/feedback/add_feedback`,
    method: 'post',
    data
  })
}

export function getQRCodeRes() {
  return request({
    url: `/api/user/mycode`,
    method: 'get'
  })
}

export function getUserWalletsByScanRes(data) {
  return request({
    url: `/api/user/scan`,
    method: 'get',
    data
  })
}

export function verifyRes(id) {
  return request({
    url: `/api/ticket/verify`,
    method: 'post',
    data: {
      id
    }
  })
}

export function getMallGoodsRes(data) {
  return request({
    url: `/api/mall/list`,
    method: 'get',
    data
  })
}
export function getUserTabletRes() {
  return request({
    url: `/api/user/tablet`,
    method: 'get'
  })
}
