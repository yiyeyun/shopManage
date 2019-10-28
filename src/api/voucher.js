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
export function voucherHandle(data) {
  return request({
    url: `app/voucher/createOrUpdate`,
    data,
    method: 'post'
  })
}
