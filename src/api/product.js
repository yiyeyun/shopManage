import request from '@/utils/request'
export function getList() {
  return request({
    url: `app/product/list`,
    method: 'post'
  })
}
