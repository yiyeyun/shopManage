import request from '@/utils/request'
export function getList({ pageNum, pageSize }) {
  return request({
    url: `app/voucher/store/list/${pageNum}/${pageSize}`
  })
}
export function getTemplateList() {
  return request({
    url: `app/voucher/template/list`
  })
}
export function voucherHandle(data, id) {
  if (id) {
    data.voucherId = id
  }
  return request({
    url: `app/voucher/createOrUpdate`,
    data,
    method: 'post'
  })
}
export function voucherPrint(data) {
  return request({
    url: `app/voucher/application/print`,
    method: 'get',
    params: data
  })
}
export function voucherDelete(id) {
  return request({
    url: `app/voucher/delete/${id}`,
    method: 'post'
  })
}
