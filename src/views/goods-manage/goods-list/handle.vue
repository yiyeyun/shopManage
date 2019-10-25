<template>
  <div>
    <el-form ref="form" :model="form" label-width="90px" :rules="rules">
      <el-form-item label="商品标题" prop="title">
        <el-input v-model="form.title" :disabled="type === 'edit'" />
      </el-form-item>
      <el-form-item label="商品类目" prop="cid">
        <el-select v-model="form.cid" placeholder="请选择类目">
          <el-option v-for="item in catList" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品条形码" prop="barcode">
        <el-input v-model="form.barcode" />
      </el-form-item>
      <el-form-item label="商品库存" prop="num">
        <el-input v-model.number="form.num" />
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model.number="form.price" />
      </el-form-item>
      <el-form-item label="商品图片" required>
        <idol-qiniu-upload
          list-type="picture-card"
          :limit="3"
          :file-list="form.image"
          @upload-success="goodsPicUpload(arguments)"
          @remove="goodsPicRemove(arguments)"
        >
          <i class="el-icon-plus" />
        </idol-qiniu-upload>
      </el-form-item>
      <el-form-item label="商品详情">
        <el-input v-model="form.sellPoint" type="textarea" />
      </el-form-item>

      <el-form-item label="详情图片">
        <idol-qiniu-upload
          list-type="picture-card"
          :limit="6"
          :file-list="form.itemImageList"
          @upload-success="detailPicUpload(arguments)"
          @remove="detailPicRemove(arguments)"
        >
          <i class="el-icon-plus" />
        </idol-qiniu-upload>
      </el-form-item>

      <el-form-item label="">
        <el-button
          :type="type=== 'add' ? 'warning': 'primary'"
          size="mini"
          @click="submit"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import { getCatList, productAdd, productUpdate, getProductDetail } from '../../../api/product'

export default {
  name: 'Handle',
  components: {
    idolQiniuUpload: qiniuUplad
  },
  props: {
    type: {
      type: String,
      value: 'add'
    },
    id: String,
    dialog: Boolean
  },
  data() {
    return {
      pid: '',
      form: {
        title: '',
        barcode: '',
        price: '',
        image: [],
        itemImageList: [],
        sellPoint: '',
        num: '',
        cid: ''
      },
      catList: [],
      rules: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        barcode: [
          { required: true, message: '请输入商品条形码', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '商品价格不能为空' },
          { type: 'number', message: '商品价格必须为数字' }
          // { type: 'number', required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        cid: [
          { required: true, message: '请选择商品类目', trigger: 'change' }
        ],
        num: [
          { required: true, message: '库存不能为空' },
          { type: 'number', message: '库存必须为数字' }
          // { type: 'number', required: true, message: '请输入库存', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    id: {
      async handler(data) {
        if (this.type === 'edit' && data) {
          try {
            const res = await getProductDetail(data)
            this.pid = res.data.id
            this.form.title = res.data.title
            this.form.barcode = res.data.barcode
            this.form.price = +res.data.price
            this.form.sellPoint = res.data.sellPoint
            this.form.num = +res.data.num
            this.form.cid = res.data.categoryName
            this.form.image = res.data.image
            this.form.itemImageList = res.data.itemImageList
            // const list = await getCatList()
          } catch (e) {
            console.log(e)
          }
        }
      },
      immediate: true
    },
    dialog(data) {
      if (!data) {
        this.$refs['form'].resetFields()
        console.log(this.form)
        this.form.image = []
        this.form.sellPoint = ''
        this.form.itemImageList = []
      }
    }
  },
  async mounted() {
    const list = await getCatList()
    this.catList = list.data
  },
  methods: {
    removePicHandle(path, groups) {
      const arr = []
      groups.forEach(item => {
        if (path !== item) {
          arr.push(item)
        }
      })
      return arr
    },
    submit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          try {
            if (this.type === 'add') {
              await productAdd(this.form)
              this.$emit('add-success')
            } else {
              await productUpdate(this.form, this.pid)
              this.$emit('edit-success')
            }

            this.$message.success('提交成功')
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    goodsPicUpload(e) {
      console.log('goodsPicUpload', e)
      this.form.image.push(e[0])
    },
    goodsPicRemove(e) {
      console.log('goodsPicRemove', e)
      this.form.image = this.removePicHandle(e[0], this.form.image)
    },
    detailPicUpload(e) {
      console.log('detailPicUpload', e)
      this.form.itemImageList.push(e[0])
    },
    detailPicRemove(e) {
      console.log('detailPicRemove', e)
      this.form.itemImageList = this.removePicHandle(e[0], this.form.itemImageList)
    }
  }
}
</script>

<style scoped lang="less">
  /deep/ .el-upload-list--picture-card .el-upload-list__item,
  /deep/ .el-upload--picture-card{
    width: 60px;
    height: 60px;
  }
  /deep/ .el-upload--picture-card{
    line-height: 68px;
  }
</style>
