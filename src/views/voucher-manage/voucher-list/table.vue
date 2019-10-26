<template>
  <div>
    <el-table
      :data="list"

      style="width: 100%"
    >
      <el-table-column
        prop="title"
        align="center"
        label="商品名称"
      />
      <el-table-column
        prop="barcode"
        align="center"
        label="商品条形码"
      />
      <el-table-column
        prop="categoryName"
        align="center"
        label="类目"
      />
      <el-table-column
        prop="price"
        align="center"
        label="价格（元）"
      />
      <el-table-column label="图片" align="center" width="80px">
        <template slot-scope="scope">
          <div v-viewer="{movable: false}" class="images pointer" :class="'v-viewer-' + scope.$index" @click="previewImg(scope)">
            <img
              v-for="(item, index) in scope.row.image"
              v-show="index === 0"
              :key="index"
              class="table-pic"
              :src="item"
            >
            <small v-show="scope.row.image.length-1" class="text-primary ml10">(剩余{{ scope.row.image.length-1 }}张)</small>
          </div>
          <!--<img v-for="item in scope.row.image" class="table-pic" :src="item" alt="">-->
        </template>
      </el-table-column>

      <el-table-column
        prop="num"
        align="center"
        label="库存"
      />
      <!--<el-table-column-->
      <!--prop="updated"-->
      <!--label="更新时间"-->
      <!--/>-->
      <el-table-column
        prop="created"
        label="创建时间"
        align="center"
        width="160px"
      />

      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    list: {
      type: Array,
      value: []
    }
  },
  methods: {
    previewImg(data) {
      console.log(data)
      // const viewerInstance = document.getElementsByClassName('viewer-container')
      // viewerInstance[0].remove()
      // console.log(viewerInstance)
      const className = `.v-viewer-${data.$index}`
      const viewer = this.$el.querySelector(className).$viewer
      viewer.show()
    },
    edit(id) {
      this.$emit('edit-item', id)
    },
    deleteItem(id) {
      this.$emit('delete-item', id)
    }
  }
}
</script>

<style scoped lang="less">
  .table-pic{
    width: 40px;
    height: 40px;
    margin: 0 5px;
  }
</style>
