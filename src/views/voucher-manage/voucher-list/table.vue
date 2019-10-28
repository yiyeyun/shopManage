<template>
  <div>
    <el-table
      :data="list"

      style="width: 100%"
    >
      <el-table-column
        prop="name"
        align="center"
        label="名称"
      />
      <el-table-column
        prop="bindProductSize"
        align="center"
        label="数量"
      />
      <el-table-column
        prop="bindProductPrice"
        align="center"
        label="商品价格（元）"
      />
      <el-table-column
        prop="price"
        align="center"
        label="模板价格（元）"
      />
      <el-table-column label="模板图片" align="center" width="80px">
        <template slot-scope="scope">
          <div v-viewer="{movable: false}" class="images pointer" :class="'v-viewer-' + scope.$index" @click="previewImg(scope)">
            <img
              v-for="(item, index) in scope.row.imgList"
              v-show="index === 0"
              :key="index"
              class="table-pic"
              :src="item"
            >
            <small v-show="scope.row.imgList.length-1" class="text-primary ml10">(剩余{{ scope.row.imgList.length-1 }}张)</small>
          </div>
          <!--<img v-for="item in scope.row.image" class="table-pic" :src="item" alt="">-->
        </template>
      </el-table-column>

      <el-table-column
        prop="price"
        align="center"
        label="自定义参数"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="viewParams(scope.row.paramDataMap)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="created"
        label="创建时间"
        align="center"
        width="160px"
      />

      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="自定义参数"
      :visible.sync="paramsDialog"
      width="600px"
      @close="paramsData=[]"
    >
      <div class="flex mb20" v-for="item in paramsData" :key="item.key">
        <div class="font-14-999 width-100 mr20 text-right">{{item.key}}</div>
        <div class="font-14-333 font-weight-600">{{item.value}}</div>
      </div>
    </el-dialog>
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
  data() {
    return {
      paramsDialog: false,
      paramsData: []
    }
  },
  methods: {
    previewImg(data) {
      console.log(data)
      const className = `.v-viewer-${data.$index}`
      const viewer = this.$el.querySelector(className).$viewer
      viewer.show()
    },
    viewParams(data) {
      this.paramsData = []
      for (const key in data) {
        this.paramsData.push({
          key,
          value: data[key]
        })
      }
      this.paramsDialog = true
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
