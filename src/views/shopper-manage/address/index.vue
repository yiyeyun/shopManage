<template>
  <div class="list-box">
    <div class="mb20">
      <el-button type="warning" size="small" @click="addressCreate">新建收货地址</el-button>
    </div>
    <idol-table :list="list" @edit-item="editItem" @delete-item="deleteItem" />
  </div>
</template>

<script>
import table from './table'
import {
  getList
} from '../../../api/address'

export default {
  name: 'Index',
  data() {
    return {
      list: []
    }
  },
  components: {
    idolTable: table
  },
  async mounted() {
    const list = getList()
    this.list = list.data
  },
  methods: {
    addressCreate() {},
    editItem() {},
    deleteItem() {}
  }
}
</script>

<style scoped>
  .list-box{
    padding: 20px;
  }
</style>
