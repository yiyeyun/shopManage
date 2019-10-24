<template>
  <div class="header-box">
    <div class="flex">
      <div
        class="fa menu-control"
        :class="isExpend ? 'fa-outdent' : 'fa-indent'"
        @click="changeMenuStatus"></div>
      <div class="fa fa-arrows-alt ml10"></div>
    </div>
    <div class="flex">
      <div class="fa fa-sign-out"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isExpend: {
      type: Boolean
    }
  },
  data() {
    return {
      // isExpend: true
    }
  },
  watch: {
    // isExpend(data) {
    //   console.log(data)
    //   this.isExpend = data
    // }
  },
  methods: {
    changeMenuStatus() {
      this.$emit('onchange')
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
  .fa:hover{
    background: #e9e9e9;
  }
</style>
