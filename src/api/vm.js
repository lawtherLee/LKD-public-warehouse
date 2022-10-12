import request from '@/utils/request'
// 设备列表
export const deviceListAPI = (params) => {
  return request({
    url: '/vm-service/vm/search',
    params
  })
}
// 搜索售货机
export const searchListAPI = (params) => {
  return request({
    url: '/vm-service/vmType/search',
    params
  })
}
// 获取机器类型
export const vmTypeListApi = (params) => {
  return request({
    url: '/vm-service/vmType/search',
    params
  })
}
// 获取点位·搜索
export const vmNodeListApi = (params) => {
  return request({
    url: '/vm-service/node/search',
    params
  })
}
//  添加首页数据
export const adddeviceListAPI = (data) => {
  return request({
    url: '/vm-service/vm',
    method: 'POST',
    data
  })
}
// 获得策略所有策略
export const editStrategyAPI = () => {
  return request({
    url: '/vm-service/policy'

  })
}
// 更改策略
export const changeStrategyAPI = (data) => {
  return request({
    url: '/vm-service/vm/applyPolicy',
    method: 'PUT',
    data
  })
}
// 当前查找策略
export const getThisClickStrategyAPI = (innerCode) => {
  return request({
    url: `/vm-service/policy/vmPolicy/${innerCode}`
  })
}
// 删除策略
export const DelThisClickStrategyAPI = (params) => {
  return request({
    url: `/vm-service/vm/cancelPolicy/${params.innerCode}/${params.policyId}`,
    method: 'PUT'
  })
}
// 点位列表
export const getClickModifyAPI = (params) => {
  return request({
    url: '/vm-service/node/search',
    params
  })
}
// 修改收货机点位

export const editClickModifyAPI = (params) => {
  return request({
    url: `/vm-service/vm/${params.id}/${params.nodeId}`,
    method: 'PUT'
  })
}
// 商品销量
export const getGoosvolumeAPI = (params) => {
  return request({
    url: `/order-service/report/skuCollect/${params.innerCode}/${params.start}/${params.end}`
  })
}
// 销售量
export const getGoosvolumeLAPI = (params) => {
  return request({
    url: `/order-service/report/orderCount`,
    params
  })
}
// 销售额
export const getGoosvolumeEAPI = (params) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params
  })
}
// 补给次数
export const getGoosvolumeAddAPI = (params) => {
  return request({
    url: `/task-service/task/repairCount/${params.innerCode}/${params.start}/${params.end}`
  })
}
// 维修次数
export const getGoosvolumeXAPI = (params) => {
  return request({
    url: `/task-service/task/supplyCount/${params.innerCode}/${params.start}/${params.end}`
  })
}

// 新增收获机类型
export const addVendingMachineAPI = (data) => {
  return request({
    url: `/vm-service/vmType`,
    method: 'POST',
    data
  })
}
// 上传图片·
export const uploadIMGAPI = (file) => {
  // window.URL.createObjectURL(file)
  const fm = new FormData()
  fm.append('fileName', file)
  // console.log(fm)
  return request({
    url: `/vm-service/sku/fileUpload`,
    method: 'POST',
    data: fm
  })
}
// 售货机类型修改
export const editMachineTypeAPI = (data) => {
  return request({
    url: `/vm-service/vmType/${data.typeId}`,
    method: 'PUT',
    data
  })
}
// 货道全部货物·
export const getchannelAPI = (data) => {
  return request({
    url: `/vm-service/channel/channelList/${data.innerCode}`

  })
}
// 日月销售个数
export const getSalesAPI = (params) => {
  return request({
    url: `/order-service/report/orderCount`,
    params
  })
}
// 销售额
export const getSalesHasAPI = (params) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params
  })
}
// 分成
export const getDividedintoAPI = (params) => {
  return request({
    url: `/order-service/report/totalBill`,
    params
  })
}
// 合作商列表
export const getPartnersListAPI = (params) => {
  return request({
    url: `/user-service/partner/search`,
    params
  })
}
// 获取一定日期范围之内的合作商分成汇总数据
export const getPartnersMoneyListAPI = (params) => {
  return request({
    url: `/order-service/report/partnerCollect`,
    params
  })
}
// 日销售统计
export const getdaySalesAPI = (params) => {
  return request({
    url: `/order-service/report/orderCount/`,
    params
  })
}
