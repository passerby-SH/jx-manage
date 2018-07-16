<template>
  <div class="customDialog">
    <el-form ref="userInfo"  :inline="true"   class="toobar"
             label-position="left">

      <span class="item-title">未激活的用户手机号修改后,将重新发送邀请短信</span>
      <el-row type="flex">
        <el-form-item label="姓 名" >
          <el-input v-model="userName" size="small" :disabled="isVerify.toString()==='1'"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="手 机 号" >
          <el-input v-model="mobile" size="small" maxlength="11"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="身份证号">
          <el-input v-model="idNumber" :disabled="isVerify.toString()==='1'" size="small"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row  style="padding-top: 50px">
      <el-col :span="12" :offset="2">
        <el-button class="role_off" size="small" @click="cancelEdit">取消</el-button>
      </el-col>
      <el-col :span="2" :offset="4">
        <el-button type="primary" size="small" @click.native="editSubmit">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as Api from 'api'
  export default {
    props: {
      userId: '',
      mobile: '',
      idNumber: '',
      userName: '',
      isVerify: ''
    },
    data () {
      return {
      }
    },
    methods: {
      cancelEdit(val) {
        this.$emit('cancelEdit', val)
      },
      editSubmit() {
        Api.editUserInfo({
          userId: this.userId,
          userName: this.userName,
          mobile: this.mobile,
          idNumber: this.idNumber
        }).then(response => {
          this.$notify({
            type: response.data.code === Api.ERR_OK ? 'success' : 'error',
            message: response.data.msg
          })
          this.cancelEdit('1')
        })
        this.$message('信息已提交')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .customDialog
    .item-title {
      width 100%
      font-size 16
      font-weight bold
      color black
      display block
      padding 10px 0
      border-top 1px dashed gray
    }
    .el-form-item {
      margin-left 50px
      width: 100%;
      height: 20px
      margin-bottom 10px
    }

    .el-form-item__label {
      width: 30%;
    }

  .el-col
    span
      font-size 14px
</style>
