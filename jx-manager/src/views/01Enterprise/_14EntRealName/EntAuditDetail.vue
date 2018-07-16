<template>
  <div>
    <el-form ref="entInfo" :model="detail" v-if="detail" :rules="rules" labelWidth="50%" class="toobar" label-position="left">
      <el-form-item  style="border-top: 1px dashed gray" label="企业名称 :">
        <el-col :span="style.inputspan">
          <span v-text="detail.entName"></span>
        </el-col>
      </el-form-item>
      <el-form-item label="法人代表姓名 :" >
        <el-col :span="style.inputspan">
          <span v-text="detail.legalPerson"></span>
        </el-col>
      </el-form-item>
      <el-form-item label="法人代表身份证号 :" >
        <el-col :span="style.inputspan">
          <span v-text="detail.legalPersonCard"></span>
        </el-col>
      </el-form-item>
      <el-form-item label="统一社会信用代码 :" >
        <el-col :span="style.inputspan">
          <span v-text="detail.comid"></span>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人 :" >
        <el-col :span="style.inputspan">
          <span v-text="detail.contactName"></span>
        </el-col>
      </el-form-item>
      <el-form-item label="联系电话 :" >
        <el-col :span="style.inputspan">
          <span v-text="detail.contactPhone"></span>
        </el-col>
      </el-form-item>
      <el-form-item label="办公地址 :" >
        <el-col :span="style.inputspan">
          <span v-text="entAddress"></span>
        </el-col>
      </el-form-item>
      <el-form-item label="营业执照 :" v-show="detail.businessLicencePath.toString().length > 1">
        <img ref="entImg" style="width: 50px; height: 50px" :src="detail.businessLicencePath" @click="showBigImg">
        <img  style="width: 50px; height: 50px; visibility: hidden">
      </el-form-item>
    </el-form>

    <el-row v-show="isEdit" style="padding-top: 10px">
      <el-col :span="12" :offset="2">
        <el-button class="role_off" @click="_doEntVerify(2)">拒绝</el-button>
      </el-col>
      <el-col :span="2" :offset="4">
        <el-button type="primary" @click.native="_doEntVerify(3)">同意</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script type="text/ecmascript-6">
import { doEntVerify } from 'api'
import { ERR_OK } from '../../../api/index'
export default {
  props: {
    isAudit: {
      type: Boolean,
      default: false
    },
    detail: {
//      entId: '',
//      entName: '',
//      legalPerson: '',
//      legalPersonCard: '',
//      comid: '',
//      contactName: '',
//      businessLicencePath: '',
//      verifyState: ''
    },
    isEdit: false,
    rules: {}
  },
  data () {
    return {
      style: {
        inputspan: 14
      },
      model: {},
      isbigimg: false
    }
  },
  computed: {
    entAddress () {
      let province = this.detail.province
      if (province === null || province === undefined) {
        province = ''
      }
      let city = this.detail.city
      if (city === null || city === undefined) {
        city = ''
      }
      let address = this.detail.address
      if (address === null || address === undefined) {
        address = ''
      }
      return province + city + address
    }
  },
  beforeUpdate() {
    this.isbigimg = false
  },
  watch: {
    isbigimg(val) {
      if (this.isbigimg === true) {
        this.$refs.entImg.style = `width:500px;height:700px;position:absolute;left:50%;margin-left:-400px;top:10;margin-top:-500px;z-index:100`
      } else {
        this.$refs.entImg.style = `width: 50px; height: 50px`
      }
    }
  },
  methods: {
    _doEntVerify (state) {
      // 2 拒绝 3 通过
      doEntVerify({entId: this.detail.entId, verifyState: state}).then(response => {
        if (response.data.code === ERR_OK) {
          this.detail.verifyState = state
          this.$message({
            message: '操作已完成',
            type: 'success'
          })
        } else {
          this.$message({
            message: '操作异常',
            type: 'warning'
          })
        }
        this.$emit('done', this.detail.verifyState)
      })
    },
    showBigImg() {
      console.log('你点击了图片')
      this.isbigimg = !this.isbigimg
    }
  },
  components: {
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-col
    span
      font-size 14px
</style>
