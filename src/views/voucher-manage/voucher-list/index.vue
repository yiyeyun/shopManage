<template>
  <div class="list-box">
    <div class="mb20">
      <el-button type="warning" size="small" @click="voucherCreate">创建提货券</el-button>
    </div>
    <idol-table
      :list="list"
      @init-data="getList"
      @edit-item="editItem"
      @delete-item="deleteItem"
    />
    <el-pagination
      background
      class="mt10"
      :page-size="params.pageSize"
      layout="prev, pager, next"
      :total="pageTotal"
      @current-change="pageChange"
    />
    <el-dialog
      :title="handleType === 'add' ? '创建提货券' : '编辑提货券'"
      :visible.sync="voucherDialog"
      width="600px"
    >
      <idol-handle
        :dialog="voucherDialog"
        :edit-data="editData"
        :type="handleType"
        @view-detail="viewDetail"
        @init-edit-data="editData = {}"
        @edit-success="editSuccess"
        @add-success="addSuccess"
      />
    </el-dialog>
    <el-dialog
      title="模板详情"
      :visible.sync="templateDialog"
      width="600px"
    >
      <div class="flex">
        <div class="width-100 mr10 mb10 font-color-9 text-right">材质</div>
        <div class="font-weight-600 font-color-3">{{ templateData.material }}</div>
      </div>
      <div class="flex">
        <div class="width-100 mr10 mb10 font-color-9 text-right">价格</div>
        <div class="font-weight-600 font-color-3">{{ templateData.price }}</div>
      </div>
      <div class="flex">
        <div class="width-100 mr10 mb10 font-color-9 text-right">销量</div>
        <div class="font-weight-600 font-color-3">{{ templateData.selectNum }}元</div>
      </div>
      <div class="flex">
        <div class="width-100 mr10 mb10 font-color-9 text-right">创建时间</div>
        <div class="font-weight-600 font-color-3">{{ templateData.created }}</div>
      </div>
      <div class="flex">
        <div class="width-100 mr10 mb10 font-color-9 text-right">图片</div>
        <div v-viewer="{movable: false}" class="images v-viewer pointer" @click="previewImg">
          <img
            v-for="(item, index) in templateData.imgList"
            :key="index"
            class="pic"
            :src="item"
          >
        </div>
      </div>
      <div class="flex">
        <div class="width-100 mr10 mb10 font-color-9 text-right">其他参数</div>
        <div
          v-for="item in templateData.paramData"
          :key="item"
          class="font-weight-600 mr10 font-color-3"
        >{{ item }}</div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {
  getList,
  voucherDelete
} from '../../../api/voucher'
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
      params: {
        pageNum: 1,
        pageSize: 10
      },
      handleType: 'add',
      voucherDialog: false,
      pageTotal: 0,
      templateData: {},
      templateDialog: false,
      list: [],
      editData: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    viewDetail(data) {
      this.templateData = data
      this.templateDialog = true
    },
    voucherCreate() {
      this.voucherDialog = true
      this.handleType = 'add'
    },
    addSuccess() {
      this.params.pageNum = 1
      this.getList()
      this.voucherDialog = false
    },
    editItem(data) {
      this.editData = data
      this.handleType = 'edit'
      this.voucherDialog = true
    },
    editSuccess() {
      this.getList()
      this.voucherDialog = false
    },
    pageChange(page) {
      this.params.pageNum = page
      this.getList()
    },
    previewImg() {
      const viewer = this.$el.querySelector('v-viewer').$viewer
      viewer.show()
    },
    async deleteItem(id) {
      try {
        await this.$confirm('确认删除?')
        await voucherDelete(id)
        this.$message.success('删除成功')
        this.getList()
      } catch (e) {
        console.log(e)
      }
    },
    async getList() {
      try {
        const list = await getList(this.params)
        this.list = list.data
        this.pageTotal = list.total
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
  .pic{
    width: 120px;
  }
</style>
