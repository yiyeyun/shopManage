<template>
  <div class="list-box">
    <div class="mb20">
      <el-button type="warning" size="small" @click="addGoods">添加商品</el-button>
    </div>
    <idol-table
      :list="list"
      @delete-item="deleteItem"
      @edit-item="edit"
    />
    <el-dialog
      :title="type === 'add' ? '添加商品': '编辑商品'"
      :visible.sync="goodsDialog"
      @close="editId = ''"
      width="600px"
    >
      <idol-handle
        :id="editId"
        :dialog="goodsDialog"
        :type="type"
        @add-success="addSuccess"
        @edit-success="editSuccess"
      />
    </el-dialog>
    <el-pagination
      background
      class="mt10"
      :page-size="params.pageSize"
      @current-change="pageChange"
      layout="prev, pager, next"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
import { getList, productDelete } from '../../../api/product'
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
      params: {
        pageNum: 1,
        pageSize: 10
      },
      pageTotal: 0,
      goodsDialog: false,
      editId: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const list = await getList(this.params)
      this.list = list.data
      console.log(list.total)
      this.pageTotal = list.total
    },
    pageChange(e) {
      console.log(e)
      this.params.pageNum = e
      this.getList()
    },
    addGoods() {
      this.type = 'add'
      this.goodsDialog = true
    },
    addSuccess() {
      this.getList()
      this.goodsDialog = false
    },
    editSuccess() {
      this.getList()
      this.goodsDialog = false
    },
    edit(id) {
      console.log(id)
      this.goodsDialog = true
      this.editId = id
      this.type = 'edit'
    },
    async deleteItem(id) {
      try {
        const confirm = await this.$confirm('确认删除?')
        await productDelete(id)
        this.$message.success('删除成功')
        this.getList()
      } catch (e) {
        console.log(e)
      }
    }

  }
}
</script>

<style scoped lang="less">
    .list-box{
        padding: 20px;
    }

</style>
