<template>
  <div class="list-box">
    <div class="mb20">
      <el-button type="warning" size="small" @click="addGoods">添加商品</el-button>
    </div>
    <idol-table :list="list" />
    <el-dialog
      :title="type === 'add' ? '添加商品': '编辑商品'"
      :visible.sync="goodsDialog"
      width="600px"
    >
      <idol-handle :type="type" />
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '../../../api/product'
import table from './table'
import handle from './handle'
export default {
  name: 'Index',
  components: {
    idolTable: table,
    idolHandle: handle
  },
  data() {
    return {
      list: [],
      type: 'add',
      goodsDialog: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getList().then(res => {
        console.log(res)
        this.list = res.data
      })
    },
    addGoods() {
      this.type = 'add'
      this.goodsDialog = true
    }

  }
}
</script>

<style scoped lang="less">
    .list-box{
        padding: 20px;
    }

</style>
