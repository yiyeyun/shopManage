<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" :disabled="type==='edit'"/>
      </el-form-item>
      <el-form-item label="模板选择" prop="templateId">
        <div class="flex">
          <div
            v-for="(item, index) in templateList"
            v-show="type === 'add' || item.templateId === form.templateId"
            :key="item.templateId"
            :class="item.templateId === form.templateId ? 'active': ''"
            class="flex flex-column model mr10 align-center"
            @click="selectTemplate(item)"
          >
            <el-radio
              v-show="false"
              v-model="form.templateId"
              :label="item.templateId"
            >模板{{ index + 1 }}</el-radio>
            <div class="pic" :style="'background-image: url('+ item.imgList[0] +')'" />
            <el-button type="primary" size="mini" @click.stop="viewDetail(item)">模板详情</el-button>

          </div>
        </div>
      </el-form-item>
      <el-form-item v-show="paramDataKey.length" label="其他参数">
        <!--<el-button type="primary" size="mini" @click="addParam">添加参数</el-button>-->
        <div v-for="(item, index) in paramDataKey" :key="index" class="flex mb10">
          <!--<el-button type="danger" size="mini" @click="deleteParam(index)">删除</el-button>-->
          <!--<el-input v-model="paramDataKey[index]" placeholder="请输入参数名" class="ml10 flex-1 mr10"/>-->
          <span class="text-right mr10">{{ item }}</span>
          <el-input v-model="paramDataValue[index]" :placeholder="'请输入' + item" class="flex-1" />
        </div>
      </el-form-item>
      <el-form-item label="绑定商品">
        <el-select v-model="form.productList" multiple placeholder="请选择">
          <el-option
            v-for="item in productList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" size="mini" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {
  getTemplateList,
  voucherHandle
} from '../../../api/voucher'
import {
  getList
} from '../../../api/product'
import {
  validateNotNull
} from '../../../validate'

export default {
  name: 'Handle',
  props: {
    voucherId: String,
    type: String,
    dialog: Boolean,
    editData: Object
  },
  data() {
    return {
      templateList: [],
      templateData: {},
      paramDataKey: [],
      paramDataValue: [],
      form: {
        name: '',
        templateId: '',
        paramData: {},
        productList: []
      },
      rules: {},
      productList: []
    }
  },
  watch: {
    dialog(data) {
      if (!data) {
        this.form.name = ''
        this.form.templateId = ''
        this.form.paramData = {}
        this.form.productList = []
        this.paramDataKey = []
        this.paramDataValue = []
        this.$emit('init-edit-data')
      }
    },
    editData: {
      immediate: true,
      deep: true,
      handler(data) {
        console.log('data', data)
        if (data.name) {
          this.form.name = data.name
          this.form.templateId = +data.templateId
          this.form.productList = data.productIdList
          for (const key in data.paramDataMap) {
            this.paramDataKey.push(key)
            this.paramDataValue.push(data.paramDataMap[key])
          }
        }
      }
    }
  },
  async mounted() {
    this.getTemplateList()
    const list = await getList({ pageNum: 1, pageSize: 100 })
    this.productList = list.data
  },
  methods: {
    async getTemplateList() {
      try {
        const list = await getTemplateList()
        this.templateList = list.data
      } catch (e) {
        console.log(e)
      }
    },
    viewDetail(data) {
      this.$emit('view-detail', data)
      // this.templateData = data
    },
    submit() {
      console.log(this.form)
      this.paramDataKey.forEach((item, index) => {
        this.form.paramData[item] = this.paramDataValue[index]
      })
      validateNotNull(this.form.name, '模版名称不能为空')
        .then(() => {
          return validateNotNull(this.form.templateId, '模版未选择')
        })
        .then(() => {
          return validateNotNull(this.form.productList.length, '未绑定商品')
        })
        .then(() => {
          console.log(this.type, 555)
          if (this.type === 'add') {
            return voucherHandle(this.form)
          } else {
            return voucherHandle(this.form, this.editData.voucherId)
          }
        })
        .then(res => {
          if (this.type === 'add') {
            this.$emit('add-success')
          } else {
            this.$emit('edit-success')
          }
          this.$message.success('操作成功')
        })
    },
    selectTemplate(data) {
      if (this.type === 'add') {
        this.paramDataKey = []
        this.paramDataValue = []
        this.form.templateId = data.templateId
        data.paramData.forEach(item => {
          this.paramDataKey.push(item)
          this.paramDataValue.push('')
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .pic{
    width: 120px;
    height: 150px;
    background-size: cover;
    margin: 10px 0;
  }
  .model{
    padding: 5px;
    /*background: #f9f9f9;*/
    border-radius: 6px;
    border: 1px solid #999;
  }
  .active{
    background: #bcdeff;
  }
    /deep/ .el-select{
        width: 100%;
    }
</style>
