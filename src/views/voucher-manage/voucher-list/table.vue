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

      <el-table-column label="操作" align="center" width="210px">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.lock === 2"
            type="primary"
            size="mini"
            @click="editItem(scope.row)"
          >编辑</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="printItem(scope.row.voucherId)"
          >打印</el-button>
          <el-button
            type="danger"
            :disabled="scope.row.lock === 2"
            size="mini"
            @click="deleteItem(scope.row.voucherId)"
          >删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="自定义参数"
      :visible.sync="paramsDialog"
      width="600px"
      @close="paramsData=[]"
    >
      <div v-for="item in paramsData" :key="item.key" class="flex mb20">
        <div class="font-14-999 width-100 mr20 text-right">{{ item.key }}</div>
        <div class="font-14-333 font-weight-600">{{ item.value }}</div>
      </div>
    </el-dialog>
    <el-dialog
      title="打印"
      :visible.sync="printDialog"
      width="400px"
    >
      <div class="flex align-center">
        <div class="width-100 mr10 text-right">打印数量</div>
        <div>
          <el-input v-model="printParam.num" />
        </div>
      </div>

      <div v-show="printParam.addressId" class="flex align-center mt10">
        <div class="width-100 mr10 text-right">收货地址</div>
        <div class="font-weight-600">
          {{ address.receiverState }}{{ address.receiverCity }}{{ address.receiverDistrict }}{{ address.receiverAddress }}
        </div>
      </div>

      <div class="flex align-center mt10">
        <div class="width-100 mr10 text-right" />
        <div>
          <el-button type="primary" size="mini" @click="addressSelect">选择地址</el-button>
          <!--<el-select v-model="printParam.addressId" placeholder="请选择收货地址">-->
          <!--<el-option-->
          <!--v-for="item in addressData"-->
          <!--:key="item.addressId"-->
          <!--:label="item.receiverName"-->
          <!--:value="item.addressId"-->
          <!--/>-->
          <!--</el-select>-->
        </div>
      </div>
      <div class="flex mt20">
        <div class="width-100 mr10" />
        <el-button type="warning" size="mini" @click="submit">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="地址选择" :visible.sync="addressDialog" width="600px">
      <div v-for="item in addressData" :key="item.addressId">
        <el-radio v-model="printParam.addressId" :label="item.addressId" @change="onAddressChange(item)">
          <div class="mb10">姓名：{{ item.receiverName }}</div>
          <div class="mb10">联系方式：{{ item.receiverMobile }}</div>
          <div class="mb20">详细地址：{{ item.receiverState }}{{ item.receiverCity }}{{ item.receiverDistrict }}{{ item.receiverAddress }}</div>
        </el-radio>
      </div>
      <!--<el-button type="warning" size="mini">确定</el-button>-->
    </el-dialog>
  </div>
</template>

<script>
import {
  voucherPrint
} from '../../../api/voucher'
import {
  getList
} from '../../../api/address'
import {
  validateIntege
} from '../../../validate'

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
      printParam: {
        num: 0,
        voucherId: '',
        addressId: ''
      },
      paramsDialog: false,
      printDialog: false,
      addressDialog: false,
      address: {},
      paramsData: [],
      addressData: []
    }
  },
  async mounted() {
    const address = await getList()
    this.addressData = address.data
  },
  methods: {
    onAddressChange(data) {
      console.log(this.printParam.addressId)
      this.addressDialog = false
      this.address = data
    },
    addressSelect() {
      this.addressDialog = true
    },
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

    printItem(id) {
      this.printParam.voucherId = id
      this.printDialog = true
    },

    editItem(data) {
      this.$emit('edit-item', data)
    },

    async submit() {
      try {
        await validateIntege(this.printParam.num, '数量格式有误!')
        await voucherPrint(this.printParam)
        this.$message.success('提交成功')
        this.$emit('data-init')
        this.printParam = {
          num: 0,
          voucherId: '',
          addressId: ''
        }
        this.address = {}
        this.printDialog = false
      } catch (e) {
        console.log(e)
      }
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
  .width-100{
    box-sizing: border-box;
  }
    /deep/ .el-radio{
        display: flex;
    }
</style>
