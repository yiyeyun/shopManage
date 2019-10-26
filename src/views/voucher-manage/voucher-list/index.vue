<template>
  <div class="list-box">
    <div class="mb20">
      <el-button type="warning" size="small" @click="voucherCreate">创建购物券</el-button>
    </div>
    <idol-table :list="[1,1,1,1,1]" />
  </div>

</template>

<script>
import {
  getList
} from '../../../api/voucher'
import table from './table'
export default {
  name: 'Index',
  components: {
    idolTable: table
  },
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    voucherCreate() {},
    async getList() {
      const list = await getList(this.params)
    }
  }
}
</script>

<style scoped lang="less">
    .list-box{
        padding: 20px;
    }

</style>
