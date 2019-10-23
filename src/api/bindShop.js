import request from '@/utils/request'

export function getSmsCode(data) {
  return request({
    url: `app/sms/smsCode`,
    method: 'post',
    data
  })
}
export function bindStore(data) {
  return request({
    url: `app/merchant/update/store`,
    method: 'post',
    data
  })
}
