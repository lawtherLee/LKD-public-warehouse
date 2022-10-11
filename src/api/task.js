import request from '@/utils/request'

export const taskIdAPI = (taskId, params) => {
  return request({
    url: `/task-service/task/taskInfo/${taskId}`,
    params
  })
}

export const allTaskAPI = () => {
  return request({
    url: '/task-service/task/allTaskStatus'

  })
}
export const SeacherTaskAPI = (params) => {
  return request({
    url: '/task-service/task/search',
    params
  })
}

export const ListTaskAPI = (params) => {
  return request({
    url: '/task-service/taskType/list',
    params
  })
}

export const taskDetailsAPI = (taskId, params) => {
  return request({
    url: `/task-service/taskDetails/${taskId}`,
    params
  })
}

export const createAPI = (data) => {
  return request({
    url: '/task-service/task/create',
    data
  })
}
