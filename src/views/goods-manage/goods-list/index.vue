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
      width="600px"
    >
      <idol-handle
        :id="editId"
        :type="type"
        @add-success="addSuccess"
      />
    </el-dialog>
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
      goodsDialog: false,
      editId: ''
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
    },
    addSuccess() {
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
