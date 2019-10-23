<template>
  <div class="box">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-goods" />
          <span>商品管理</span>
        </template>
        <el-menu-item index="1-1">商品列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu" />
          <span>提货券管理</span>
        </template>
        <el-menu-item index="2-1">提货券管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-tickets" />
          <span>订单管理</span>
        </template>
        <el-menu-item index="3-1">订单管理</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="flex-1 flex flex-column">
        <top class="bottom-line"></top>
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
  methods: {
    handleOpen(e) {
      console.log(1, e)
    },
    handleClose(e) {
      console.log(2, e)
    }
  }
}
</script>

<style scoped lang="less">
.box{
    height: 100%;
    display: flex;
}
    /deep/ .el-menu{
        width: 200px;
    }
</style>
