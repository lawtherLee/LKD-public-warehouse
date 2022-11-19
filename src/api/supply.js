import request from '@/utils/request'
export function supplyAPI() {
  return request({
    url: '/task-service/task/supplyAlertValue'

  })
}
