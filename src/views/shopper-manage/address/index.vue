<template>
  <div class="list-box">
    <div class="mb20">
      <el-button type="warning" size="small" @click="addressCreate">新建收货地址</el-button>
    </div>
    <idol-table :list="list" @edit-item="editItem" @delete-success="getList"/>
    <el-dialog
      :title="handleType === 'add' ? '新增地址': '编辑地址'"
      :visible.sync="addressDialog"
      width="600px"
    >
      <idol-handle
        :dialog="addressDialog"
        @init="editData = {}"
        @add-success="addSuccess"
        @edit-success="editSuccess"
        :address="editData"
        :type="handleType"/>
    </el-dialog>
  </div>
</template>

<script>
import table from './table'
import handle from './handle'
import {
  getList
} from '../../../api/address'

export default {
  name: 'Index',
  components: {
    idolHandle: handle,
    idolTable: table
  },
  data() {
    return {
      list: [],
      handleType: 'add',
      addressDialog: false,
      editData: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const list = await getList()
      this.list = list.data
    },
    addressCreate() {
      this.type = 'add'
      this.addressDialog = true
    },
    addSuccess() {
      this.getList()
      this.addressDialog = false
    },
    editSuccess() {
      this.addressDialog = false
      this.editData = {}
    },
    editItem(data) {
      console.log(data, '222')
      this.editData = data
      this.type = 'edit'
      this.addressDialog = true
    }
  }
}
</script>

<style scoped>
  .list-box{
    padding: 20px;
  }
</style>
