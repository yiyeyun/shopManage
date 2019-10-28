import { Message } from 'element-ui'
const warningMessage = (message) => {
  Message({
    message,
    type: 'warning'
  })
}

// 验证手机号
export function validatePhone(value) {
  return new Promise((resolve, reject) => {
    if (!(value && value.trim())) {
      warningMessage('手机号不能为空')
      reject()
    }
    if (!/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value.trim())) {
      warningMessage('手机号格式有误')
      reject()
    } else {
      resolve()
    }
  })
}



// 不为空验证
export function validateNotNull(value, type) {
  return new Promise((resolve, reject) => {
    if (!(value && (value + '').trim())) {
      warningMessage(type)
      reject()
    } else {
      resolve()
    }
  })
}

// 验证文本长度
export function validateTextLength(value, name, min, max) {
  console.log(value, name)
  const length = value && (value + '').trim().length
  console.log(length)
  if (min && !value) {
    return false
  }
  if (min && length < min) {
    return false
  }
  if (max && length > max) {
    return false
  }
  return true
}
