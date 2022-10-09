import request from '@/utils/request'

/**
 * 获取区域列表
 * @param {*} params 当前页码，每页数据个数，区域名称
 * @returns
 */
export function getRegionListAPI(params) {
  return request({
    url: '/vm-service/region/search',
    params
  })
}

/**
 * 获取点位列表
 * @param {*} params 当前页码，每页数据个数，区域名称
 * @returns
 */
export function getNodeListAPI(params) {
  return request({
    url: '/vm-service/node/search',
    params
  })
}

/**
<<<<<<< HEAD
 * 获取合作商列表
 * @param {*} params 当前页码，每页数据个数，区域名称
 * @returns
 */
export function getPartnerListAPI(params) {
  return request({
    url: '/user-service/partner/search',
    params
  })
}

/**
 * 新增合作商
 * @param {*} data 密码和手机号必须
 * @returns
 */
export function addPartnerListAPI(data) {
  return request({
    url: '/user-service/partner',
    method: 'POST',
    data
  })
}

/**
 * 删除合作商
 * @param {*} data 合作商Id
 * @returns
 */
export function delPartnerAPI(id) {
  return request({
    url: `/user-service/partner/${id}`,
    method: 'DELETE'
  })
}

/**
 * 修改合作商
 * @param {*} id 合作商id
 * @returns
 */
export function emitPartnerAPI(data) {
  return request({
    url: `/user-service/partner/${data.id}`,
    method: 'PUT',
    data
=======
 * 商圈列表
 * @returns
 */
export function getBusinessListAPI() {
  return request({
    url: '/vm-service/businessType'
>>>>>>> point/node
  })
}
