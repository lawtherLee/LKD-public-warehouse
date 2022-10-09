import request from '@/utils/request'

/**
 * 获取用户基本信息
 * @returns {*}
 * @constructor
 * @param id 用户id
 */
export const userInfoAPI = id => {
  return request({
    url: '/user-service/user/' + id
  })
}
/**
 * 人员搜索（列表页）
 * @param params
 * @returns {*}
 * @constructor
 */
export const PersonnelListAPI = params => {
  return request({
    url: '/user-service/user/search',
    params
  })
}
