import request from '@/utils/request'
export function getList({ pageNum, pageSize }) {
  return request({
    url: `app/voucher/store/list/${pageNum}/${pageSize}`
  })
}
