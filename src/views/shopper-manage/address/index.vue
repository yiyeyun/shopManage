<template>
  <div class="list-box">
    <div class="mb20">
      <el-button type="warning" size="small" @click="addressCreate">新建收货地址</el-button>
    </div>
    <idol-table :list="list" @edit-item="editItem" />
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
  async mounted() {
    const list = getList()
    this.list = list.data
  },
  methods: {
    addressCreate() {
      this.type = 'add'
      this.addressDialog = true
    },
    addSuccess() {
      this.addressDialog = false
    },
    editSuccess() {
      this.addressDialog = false
      this.editData = {}
    },
    editItem(data) {
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
