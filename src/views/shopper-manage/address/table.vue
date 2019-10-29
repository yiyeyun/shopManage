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
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    list: Array
  }
}
</script>

<style scoped>

</style>
