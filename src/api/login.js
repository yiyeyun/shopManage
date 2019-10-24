import request from '@/utils/request'

export function getQrcode() {
  const sceneId = new Date().getTime().toString().MD5(32)
  localStorage.setItem('scene', sceneId)
  return request({
    url: `app/wechat/get/qrcode/${sceneId}`,
    method: 'get'
  })
}
export function isLogin() {
  const sceneId = localStorage.getItem('scene')
  localStorage.setItem('scene', sceneId)
  return request({
    url: `app/wechat/token/islogin/${sceneId}`,
    method: 'get'
  })
}
export function getUserInfo() {
  return request({
    url: `app/merchant/userInfo`,
    method: 'post'
  })
}
