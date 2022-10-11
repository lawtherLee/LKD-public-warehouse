import request from '@/utils/request'
// 商品列表
export const getGoodsListAPI = (page) => {
  return request({
    url: '/vm-service/skuClass/search',
    params: page
  })
}
// 新增商品

export const addGoodslistAPI = (className) => {
  return request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data: {
      className
    }
  })
}

// 编辑商品
export const editGoodslistAPI = (data) => {
  return request({
    url: `/vm-service/skuClass/${data.classId}`,
    method: 'PUT',
    data: {
      className: data.className
    }
  })
}

// 所有商品类型名称
export const getSkuGoodsListAPI = (page) => {
  return request({
    url: '/vm-service/sku/search',
    params: page
  })
}

// 新增商品管理
export const addGoodslistTypeAPI = (data) => {
  return request({
    url: '/vm-service/sku',
    method: 'POST',
    data
  })
}
// 修改商品管理
export const editGoodslistTypeAPI = (data, skuId) => {
  console.log(8, data, skuId)
  return request({
    url: `/vm-service/sku/${skuId}`,
    method: 'PUT',
    data
  })
}
