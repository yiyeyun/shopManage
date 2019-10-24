<template>
  <div>
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="商品标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="商品类目">
        <el-select v-model="form.cid" placeholder="请选择类目">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品条形码">
        <el-input v-model="form.barcode" />
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input v-model="form.num" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="商品详情">
        <el-input  type="textarea" v-model="form.itemDesc" />
      </el-form-item>
      <el-form-item label="">
        <el-button :type="type=== 'add' ? 'warning': 'primary'" size="mini">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Handle',
  props: {
    type: {
      type: String,
      value: 'add'
    }
  },
  data() {
    return {
      form: {
        title: '',
        barcode: '',
        price: '',
        image: [],
        itemDesc: '',
        num: '',
        cid: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
