import request from '@/utils/request'

export function getQrcode() {
  const sceneId = new Date().getTime().toString().MD5(32)
  localStorage.setItem('scene', sceneId)
  return request({
    url: `app/wechat/get/qrcode/${sceneId}`, // 假地址 自行替换
    method: 'get'
  })
}
export function isLogin() {
  const sceneId = localStorage.getItem('scene')
  localStorage.setItem('scene', sceneId)
  return request({
    url: `app/wechat/token/islogin/${sceneId}`, // 假地址 自行替换
    method: 'get'
  })
}
