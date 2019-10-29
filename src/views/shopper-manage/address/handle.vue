<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="收货人">
        <el-input v-model="form.receiverName" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.receiverMobile" />
      </el-form-item>
      <el-form-item label="所在地区">
        <VDistpicker
          :province="form.receiverState"
          :city="form.receiverCity"
          :area="form.receiverDistrict"
          @selected="onSelect"
        />
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.receiverAddress" />
      </el-form-item>
      <el-form-item label="">
        <el-button
          type="warning"
          size="mini"
          @click="submit"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addressHandle
} from '../../../api/address'
import {
  validateNotNull,
  validatePhone
} from '../../../validate'
import VDistpicker from 'v-distpicker'
export default {
  name: 'Handle',
  components: { VDistpicker },
  props: {
    type: String,
    dialog: Boolean,
    address: Object
  },
  data() {
    return {
      addressId: '',
      form: {
        receiverName: '',
        receiverMobile: '',
        receiverState: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverAddress: ''
      }
    }
  },
  watch: {
    address: {
      immediate: true,
      handler(data) {
        if (data.id) {
          this.addressId = data.id
          this.form.receiverName = data.receiverName
          this.form.receiverState = data.receiverState
          this.form.receiverCity = data.receiverCity
          this.form.receiverDistrict = data.receiverDistrict
          this.form.receiverAddress = data.receiverAddress
        }
      }
    },
    addressDialog(data) {
      if (!data) {
        this.form = {
          receiverName: '',
          receiverMobile: '',
          receiverState: '',
          receiverCity: '',
          receiverDistrict: '',
          receiverAddress: ''
        }
        this.$emit('init')
      }
    }
  },
  methods: {
    onSelect(data) {
      this.form.receiverState = data.province.value
      this.form.receiverCity = data.city.value
      this.form.receiverDistrict = data.area.value
    },
    async submit() {
      try {
        console.log(this.form)
        await validateNotNull(this.form.receiverName, '收货人姓名不能为空')
        await validatePhone(this.form.receiverMobile)
        await validateNotNull(this.form.receiverState, '地区未选择')
        await validateNotNull(this.form.receiverCity, '地区未选择')
        await validateNotNull(this.form.receiverDistrict, '地区未选择')
        await validateNotNull(this.form.receiverAddress, '详细地址未填写')
        if (this.type === 'add') {
          await addressHandle(this.form)
          this.$emit('add-success')
        } else {
          await addressHandle(this.form, this.address.id)
          this.$emit('edit-success')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
