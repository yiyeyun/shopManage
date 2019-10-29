<template>
  <div class="page">
    <div class="box border-shadow">
      <div class="text-center font-24-666 font-weight-600">绑定店铺</div>

      <div class="flex align-center mt40">
        <div class="label-80 mr10">店铺名称</div>
        <div class="width-200 mr10">
          <el-input v-model="storeName" />
        </div>
      </div>

      <div class="flex align-center mt20">
        <div class="label-80 mr10">地址选择</div>
        <VDistpicker
          @selected="onSelect"
          :province="address.province"
          :city="address.city"
          :area="address.area"
        />
      </div>
      <div class="flex align-center mt20">
        <div class="label-80 mr10">详细地址</div>
        <div class="flex-1">
          <el-input v-model="storeAddress" />
        </div>
      </div>
      <div class="flex align-center mt20">
        <div class="label-80 mr10">手机号</div>
        <div class="width-200 mr10">
          <el-input v-model="phone" />
        </div>
        <el-button
          type="primary"
          size="small"
          :disabled="second !== 0"
          @click="getCode"
        >{{second !== 0 ? second + 'S后重新发送' : '获取验证码'}}</el-button>
      </div>

      <!--<div class="fa fa-address-card"></div>-->

      <div class="flex align-center mt20">
        <div class="label-80 mr10">验证码</div>
        <div class="width-200 mr10">
          <el-input v-model="code" />
        </div>
      </div>

      <div class="flex align-center mt20">
        <div class="label-80 mr10" />
        <el-button type="warning" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import {
  validateNotNull,
  validatePhone
} from '../../validate'
import {
  bindStore,
  getSmsCode
} from '../../api/bindShop'

export default {
  name: 'Index',
  components: { VDistpicker },
  data() {
    return {
      address: {
        province: '',
        city: '',
        area: ''
      },
      storeAddress: '',
      storeName: '',
      phone: '',
      code: '',
      second: 0,
      interval: null
    }
  },
  methods: {
    onSelect(data) {
      this.address.province = data.province.value
      this.address.city = data.city.value
      this.address.area = data.area.value
    },
    submit() {
      validatePhone(this.phone)
        .then(() => {
          return validateNotNull(this.address.province, '地区未选择')
        })
        .then(() => {
          return validateNotNull(this.address.city, '地区未选择')
        })
        .then(() => {
          return validateNotNull(this.address.area, '地区未选择')
        })
        .then(() => {
          return validateNotNull(this.storeAddress, '详细地址不能为空')
        })
        .then(() => {
          return validatePhone(this.phone)
        })
        .then(() => {
          return validateNotNull(this.code, '验证码不能为空')
        })
        .then(() => {
          return bindStore({
            code: this.code,
            phone: this.phone,
            storeName: this.storeName,
            storeAddress: `${this.address.province}${this.address.city}${this.address.area}${this.storeAddress}`
          })
        })
        .then(res => {
          console.log(res)
        })
    },
    getCode() {
      validatePhone(this.phone)
        .then(() => {
          return getSmsCode({
            mobile: this.phone,
            type: 'MERCHANT_BIND'
          })
        })
        .then(() => {
          this.second = 60
          this.interval = setInterval(() => {
            this.second--
            if (this.second === 0) {
              clearInterval(this.interval)
            }
          }, 1000)
        })
    }
  }
}
</script>

<style scoped lang="less">
  .page{
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box{
    border-radius: 10px;
    background: #fff;
    padding: 40px;
    width: 700px;
  }
</style>
