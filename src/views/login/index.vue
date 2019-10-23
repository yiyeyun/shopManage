<template>
  <div class="login">dengru</div>
</template>

<script>
import {
  getQrcode,
  isLogin
} from '../../api/login'
export default {
  name: 'Index',
  mounted() {
    getQrcode()
    isLogin()
  }
}
</script>

<style scoped lang="less">
  .login{
    height: 100%;
    background: @main-color;
  }
</style>
