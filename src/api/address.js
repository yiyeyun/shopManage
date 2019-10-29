import request from '@/utils/request'
export function getList() {
  return request({
    url: `app/address/list`
  })
}

export function addressDelete(id) {
  return request({
    url: `app/address/delete/${id}`
  })
}

export function addressHandle(data, id) {
  if (id) {
    data.addressId = id
  }
  data.receiverZip = '000000'
  return request({
    url: `app/address/createOrUpdate`,
    data,
    method: 'post'
  })
}

