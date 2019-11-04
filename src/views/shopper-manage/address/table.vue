<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column
        prop="receiverName"
        align="center"
        label="收货人"
      />
      <el-table-column
        prop="receiverMobile"
        align="center"
        label="电话"
      />
      <el-table-column
        prop="receiverState"
        align="center"
        label="省"
      />
      <el-table-column
        prop="receiverCity"
        align="center"
        label="市"
      />
      <el-table-column
        prop="receiverDistrict"
        align="center"
        label="区/县"
      />
      <el-table-column
        prop="receiverAddress"
        align="center"
        label="详细地址"
      />
      <el-table-column
        label="操作"
        align="center"
        width="150px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editItem(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.addressId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  addressDelete
} from '../../../api/address'

export default {
  name: 'Table',
  props: {
    list: Array
  },
  methods: {
    editItem(data) {
      this.$emit('edit-item', data)
    },
    async deleteItem(id) {
      try {
        await this.$confirm('确认删除?')
        await addressDelete(id)
        this.$message.success('删除成功')
        this.$emit('delete-success')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
