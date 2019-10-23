<template>
  <div class="login">
    <img :src="qrCode" class="img" alt="">
    <div class="text">微信扫一扫登入</div>
  </div>
</template>

<script>
import {
  setToken
} from '../../utils/auth'
import {
  getQrcode,
  isLogin
} from '../../api/login'
export default {
  name: 'Index',
  data() {
    return {
      qrCode: ''
    }
  },
  mounted() {
    getQrcode().then(res => {
      this.qrCode = res.data
      this.isLoginInterval()
    })
  },
  methods: {
    isLoginInterval() {
      this.loginInterval = setInterval(() => {
        isLogin()
          .then(res => {
            if (res) {
              clearInterval(this.loginInterval)
              setToken(res.data.token)
              if (res.data.status === 1) {
                this.$router.push({ path: '/bind-shop' })
              } else {
                this.$router.push({ path: '/' })
              }
            }
          })
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
  .login{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    background: @main-color;
  }
  .img{
    width: 200px;
    height: 200px;
  }
  .text{
    margin-top: 20px;
    color: #fff;
  }
</style>
