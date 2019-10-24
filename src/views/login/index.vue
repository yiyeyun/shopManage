<template>
  <div class="login">
    <div v-if="!codeIsValidate" class="code-invalid">二维码失效</div>
    <img v-else :src="qrCode" class="img" alt="">
    <div v-if="codeIsValidate" class="text">微信扫一扫登入</div>
    <div v-else class="mt20">
      <el-button type="warning" class="mt20" @click="getQrcode">刷新二维码</el-button>
    </div>
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
      qrCode: '',
      codeIsValidate: true,
      loginInterval: null
    }
  },
  mounted() {
    this.getQrcode()
  },
  destroyed() {
    clearInterval(this.loginInterval)
  },
  methods: {
    getQrcode() {
      getQrcode().then(res => {
        this.qrCode = res.data
        this.codeIsValidate = true
        this.isLoginInterval()
        setTimeout(() => {
          clearInterval(this.loginInterval)
          this.codeIsValidate = false
        }, 1000 * 60 * 5)
      })
    },
    isLoginInterval() {
      this.loginInterval = setInterval(() => {
        isLogin()
          .then(res => {
            if (res) {
              console.log(res)
              clearInterval(this.loginInterval)
              setToken(res.data.token)
              if (res.data.status === 1) {
                this.$router.replace({ path: '/bind-shop' })
              } else {
                this.$router.replace({ path: '/' })
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
  .code-invalid{
      width: 200px;
      height: 200px;
      background: #fff;
      text-align: center;
      line-height: 200px;
  }
  .text{
    margin-top: 20px;
    color: #fff;
  }
</style>
