<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="模板选择" prop="templateId">
        <div class="flex">
          <div
            v-for="(item, index) in templateList"
            :key="item.templateId"
            :class="item.templateId === form.templateId ? 'active': ''"
            class="flex flex-column model mr10 align-center"
            @click="selectTemplate(item.templateId)"
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
      <el-form-item label="其他参数">
        <el-button type="primary" size="mini" @click="addParam">添加参数</el-button>
        <div v-for="(item, index) in paramDataKey" class="flex mb10" :key="index">
          <el-button type="danger" size="mini" @click="deleteParam(index)">删除</el-button>
          <el-input v-model="paramDataKey[index]" placeholder="请输入参数名" class="ml10 flex-1 mr10"/>
          <el-input v-model="paramDataValue[index]" placeholder="请输入参数值" class="flex-1"/>
        </div>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {
  getTemplateList
} from '../../../api/voucher'

export default {
  name: 'Handle',
  data() {
    return {
      templateList: [],
      templateData: {},
      paramDataKey: [],
      paramDataValue: [],
      form: {
        name: '',
        templateId: '',
        paramData: {}
      },
      rules: {}
    }
  },
  mounted() {
    this.getTemplateList()
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
    deleteParam(index) {
      this.paramDataKey.splice(index, 1)
      this.paramDataValue.splice(index, 1)
    },
    addParam() {
      this.paramDataKey.push('')
      this.paramDataValue.push('')
    },
    selectTemplate(id) {
      this.form.templateId = id
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
</style>
