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
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <div v-viewer="{movable: false}" class="images pointer" @click="previewImg">
            <img v-for="(item, index) in scope.row.image" v-show="index === 0" class="table-pic" :src="item">
            <small class="text-primary ml10">(剩余{{ scope.row.image.length-1 }}张)</small>
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

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="primary" size="mini">编辑</el-button>
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
    previewImg() {
      const viewer = this.$el.querySelector('.images').$viewer
      viewer.show()
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
