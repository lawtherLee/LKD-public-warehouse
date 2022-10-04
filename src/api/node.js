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
 * 获取区域列表
 * @param {*} params 当前页码，每页数据个数，区域名称
 * @returns
 */
export function getNodeListAPI(params) {
  return request({
    url: '/vm-service/node/search',
    params
  })
}
