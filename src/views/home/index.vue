<template>
  <div class="box" :class="isExpend? 'expend' : ''">
    <div class="menu-box">
      <div class="pic-box">
        <!--<img src="@/assets/imgs/logo.jpg" class="logo" alt="">-->
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#2d3a4b"
        :collapse="!isExpend"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        @select="select"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-goods" />
            <span>商品管理</span>
          </template>
          <el-menu-item index="/goods-list">商品列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu" />
            <span>提货券管理</span>
          </template>
          <el-menu-item index="/voucher-list">提货券列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-tickets" />
            <span>订单管理</span>
          </template>
          <el-menu-item index="3-1">订单管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-tickets" />
            <span>商家管理</span>
          </template>
          <el-menu-item index="/address">地址管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div class="flex-1 flex flex-column over-hidden">
      <top class="bottom-line" :is-expend="isExpend" @onchange="isExpend = !isExpend" />
      <div class="flex-1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import top from './header'
export default {
  name: 'Index',
  components: { top },
  data() {
    return {
      isExpend: true
    }
  },
  methods: {
    select(path) {
      const router = this.$route.path
      if (router !== path) {
        this.$router.push({ path })
      }
    }
  }
}
</script>

<style scoped lang="less">
.box{
    height: 100%;
    display: flex;
}
.pic-box{
  display: flex;
  justify-content: center;
  padding: 30px 0;
  .logo{
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
}
.menu-box{
  transition: width 500ms linear;
  width: 65px;
  height: 100%;
  background: @main-color;
}
.expend .menu-box{
  transition: width 500ms linear;
  width: 210px;
}
/deep/ .el-menu{
  border-right: 1px solid @main-color;
}
</style>
