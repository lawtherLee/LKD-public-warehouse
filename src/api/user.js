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
/**
 * 上传图片
 * @param data
 * @returns {*}
 */
export const upDatePhotoAPI = data => {
  const formdata = new FormData()
  formdata.append('filename', data)
  return request({
    url: 'vm-service/sku/fileUpload',
    method: 'POST',
    data: formdata
  })
}

/**
 * 获取当时工单汇总信息(人员统计头部信息)
 * @param start 开始时间
 * @param end 结束时间
 * @returns {*}
 */
export const taskReportInfoAPI = (start, end) => {
  return request({
    url: `task-service/task/taskReportInfo/${start}/${end}`
  })
}
/**
 * 工单状态统计
 * @param start 开始日期
 * @param end 结束日期
 * @returns {*}
 */
export const collectReportAPI = (start, end) => {
  return request({
    url: `task-service/task/collectReport/${start}/${end}`
  })
}

/**
 * 人员排名
 * @param start
 * @param end
 * @param isRepair 是否是运维工单
 * @param regionId 区域Id(如果是全部区域，请传0）
 * @returns {*}
 */
export const getUserWorkTopAPI = (start, end, isRepair, regionId) => {
  return request({
    url: `task-service/task/userWorkTop10/${start}/${end}/${isRepair}/${regionId}`
  })
}

/**
 * 人员工作量列表
 * @param params
 * @returns {*}
 */
export const getWorkloadListAPI = (params) => {
  return request({
    url: 'user-service/user/searchUserWork',
    params
  })
}
/**
 * 获取用户工作量
 * @param params
 * @returns {*}
 */
export const getUserWorksAPI = (params) => {
  return request({
    url: 'task-service/task/userWork',
    params
  })
}

