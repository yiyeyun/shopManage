<template>
  <div class="list-box">
    <el-table :data="list" style="width:100%">
      <el-table-column
        prop="receiverName"
        align="center"
        label="收货人"
      />
      <el-table-column
        prop="voucherName"
        align="center"
        label="模版名称"
      />
      <el-table-column
        prop="bindProductPrice"
        align="center"
        label="模板价格"
      />
      <el-table-column
        prop="num"
        align="center"
        label="打印数量"
      />
      <el-table-column
        prop="printPrice"
        align="center"
        label="打印价格"
      />
      <el-table-column
        prop="bindProductPrice"
        align="center"
        label="绑定商品价格"
      />
      <el-table-column
        prop="address"
        align="center"
        label="订单地址"
      />
      <el-table-column
        align="center"
        label="打印状态"
      >
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.status == 1"
            type="danger"
            size="mini"
            @click="printCancel(scope.row.printOrderId)"
          >取消打印</el-button>
          <div v-show="scope.row.status == 2">打印中</div>
          <div v-show="scope.row.status == 3">打印成功</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="mt10"
      :page-size="printParam.pageSize"
      layout="prev, pager, next"
      :total="pageTotal"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import {
  getPrintList,
  printCancel
} from '../../../api/voucher'

export default {
  name: 'Index',
  data() {
    return {
      list: [],
      printParam: {
        pageNum: 1,
        pageSize: 10
      },
      pageTotal: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async printCancel(id) {
      try {
        await this.$confirm('确认取消打印?')
        await printCancel(id)
        this.$message.success('取消成功')
        this.getList()
      } catch (e) {
        console.log(e)
      }
    },
    pageChange(page) {
      this.printParam.pageNum = page
      this.getList()
    },
    async getList() {
      const list = await getPrintList(this.printParam)
      this.list = list.data
      this.pageTotal = list.total
    }
  }
}
</script>

<style scoped lang="less">
    .list-box{
        padding: 20px;
    }
</style>
