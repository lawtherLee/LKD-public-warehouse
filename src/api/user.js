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
/**
 * 删除人员
 * @param id
 * @returns {*}
 */
export const deleteUserAPI = (id) => {
  return request({
    url: `/user-service/user/${id}`,
    method: 'DELETE'
  })
}
/**
 * 新增人员
 * @param data
 * @returns {*}
 */
export const addUserAPI = (data) => {
  return request({
    url: '/user-service/user',
    method: 'POST',
    data
  })
}
/**
 * 修改人员
 * @param data
 * @returns {*}
 */
export const editUserAPI = (data) => {
  return request({
    url: `/user-service/user/${data.id}`,
    method: 'PUT',
    data
  })
}
/**
 * 获取下拉框角色
 * @param params
 * @returns {*}
 */
export const getRoleAPI = params => {
  return request({
    url: '/user-service/role',
    params
  })
}
/**
 * 获取区域列表
 * @param params
 * @returns {*}
 */
export const getAreasAPI = params => {
  return request({
    url: 'vm-service/region/search',
    params
  })
}
