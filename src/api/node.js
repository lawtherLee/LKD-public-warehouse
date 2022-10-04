import request from '@/utils/request'

export function getRegionListAPI(params) {
  return request({
    url: '/vm-service/region/search',
    params
  })
}
