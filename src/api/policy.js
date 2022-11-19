import request from '@/utils/request'
export const SeacherAPI = (params) => {
  return request({
    url: '/vm-service/policy/search',
    params
  })
}
export const policyAPI = (data) => {
  return request({
    url: '/vm-service/policy',
    method: 'post',
    data
  })
}

export const delpolicyAPI = (policyId) => {
  return request({
    url: `/vm-service/policy/${policyId} `,
    method: 'DELETE'
  })
}

export const editpolicyAPI = (data) => {
  return request({
    url: `/vm-service/policy/${data.policyId} `,
    method: 'PUT',
    data
  })
}

export const vmListAPI = (policyId, params) => {
  return request({
    url: `/vm-service/policy/vmList/${policyId}`,
    params
  })
}

