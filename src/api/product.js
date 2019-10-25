import request from '@/utils/request'
export function getList() {
  return request({
    url: `app/product/list`,
    method: 'post'
  })
}
export function getQiniuToken() {
  return request({
    url: `app/pic/token`
  })
}

// 0 获取全部
export function getCatList(id = 0) {
  return request({
    url: `app/cat/list/${id}`,
    method: 'post'
  })
}

export function productAdd(data) {
  return request({
    url: `app/product/add`,
    method: 'post',
    data
  })
}

export function productUpdate(data, id) {
  return request({
    url: `app/product/update`,
    method: 'post',
    data
  })
}

export function getProductDetail(id) {
  return request({
    url: `app/product/findDescript/${id}`
  })
}
export function productDelete(id) {
  return request({
    url: `app/product/delete/${id}`
  })
}
