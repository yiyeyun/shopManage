<template>
  <div class="header-box">
    <div class="flex">
      <div
        class="fa menu-control"
        :class="isExpend ? 'fa-outdent' : 'fa-indent'"
        @click="changeMenuStatus"
      />
      <div class="fa fa-arrows-alt ml10" @click="fullScreen" />
    </div>
    <div class="flex align-center">
      <!--<div class="avatar">{{ userInfo.storeName ? userInfo.storeName[0] : '' }}</div>-->
      <div class="font-14-999 mr20">您好！{{ userInfo.storeName }}</div>
      <div class="fa fa-sign-out" @click="logout" />
    </div>
  </div>
</template>

<script>
import {
  removeToken
} from '../../utils/auth'
import {
  getUserInfo
} from '../../api/login'

export default {
  name: 'Header',
  props: {
    isExpend: {
      type: Boolean
    }
  },
  data() {
    return {
      userInfo: {}
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    changeMenuStatus() {
      this.$emit('onchange')
    },
    getUserInfo() {
      getUserInfo()
        .then(res => {
          console.log(res)
          this.userInfo = res.data
        })
    },
    logout() {
      removeToken()
      this.$router.replace({
        path: '/login'
      })
    },
    fullScreen() {
      const el = document.documentElement
      const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
      if (typeof rfs !== 'undefined' && rfs) {
        rfs.call(el)
      }
    }
  }
}
</script>

<style scoped lang="less">
    .header-box{
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        align-items: center;
        height: 50px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }
  .fa{
    cursor: pointer;
    font-size: 20px;
    padding: 5px;
    color: #666;
  }
  .avatar{
      width: 36px;
      height: 36px;
      border-radius: 36px;
      line-height: 36px;
      color: #fff;
      margin-right: 10px;
      text-align: center;
      background: #9dffa7;
  }
  .fa:hover{
    background: #e9e9e9;
  }
</style>
