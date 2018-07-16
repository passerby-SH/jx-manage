<template>
  <section id="entDetail" v-loading="isLoading">
    <el-form ref="entInfoForm" :model="entInfo" :rules="rules" label-position="left" label-width="160px">
      <h3 style="margin: 5px auto; border-top: 1px dashed grey">企业基本信息</h3>
      <el-form-item label="企业名称:">
        <el-input v-model="entInfo.entName" :disabled="entInfo.verifyState==='3'" size="small"></el-input>
      </el-form-item>
      <el-form-item label="企业昵称:" prop="entNickName">
        <el-input v-model="entInfo.entNickName" :disabled="disableBaseInfo" size="small"></el-input>
      </el-form-item>
      <el-form-item label="企业办公地址:" required>
        <el-col :span="4">
          <el-form-item prop="province">
            <el-select :disabled="disable" v-model="entInfo.province" @change="selectProvince" size="small">
              <el-option v-for="item in _provinces"
                         :key="item.uniqueId"
                         :label="item.addrName"
                         :value="item.uniqueId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="city">
            <el-select :disabled="disable" v-model="entInfo.city" @change="selectCity" size="small">
              <el-option v-for="item in cities"
                         :key="item.uniqueId"
                         :label="item.addrName"
                         :value="item.uniqueId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="address">
            <el-input v-model="entInfo.address" :disabled="disable" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="法人代表姓名:" prop="legalPerson">
        <el-col :span="style.inputspan">
          <el-input v-model="entInfo.verifyInfo.legalPerson" :disabled="disable" size="small"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="法人代表身份证号码:" prop="legalPersonCard">
        <el-col :span="style.inputspan">
          <el-input v-model="entInfo.verifyInfo.legalPersonCard" :disabled="disable" size="small"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="统一社会信用代码:" prop="comid">
        <el-col :span="style.inputspan">
          <el-input v-model="entInfo.verifyInfo.comid" :disabled="disable" size="small"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人:">
        <el-col :span="style.inputspan">
          <el-input v-model="entInfo.contactName" :disabled="disableBaseInfo" size="small"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="联系电话:">
        <el-col :span="style.inputspan">
          <!--<el-input v-model="entInfo.contactPhone" disabled="disable"></el-input>-->
          <el-input v-model="entInfo.contactPhone" :disabled="disableBaseInfo" size="small"></el-input>
        </el-col>
      </el-form-item>
      <el-row style="border-top: 1px dashed grey" v-for="item in entInfo.entAdmins" :key="item.adminName">
        <h4 style="margin: 5px auto">企业管理员</h4>
        <el-col :span="10">
          <el-form-item label="角色:" labelWidth="80">
            {{item.adminName}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="手机号:" required>
            <el-input v-model="item.mobile" :disabled="disable" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="border-top: 1px dashed grey">
        <h4 style="margin: 5px auto">银行卡信息</h4>
      </el-row>
      <el-table border stripe :data="entInfo.entBankcardInfs" style="width: 100%;" align="center">
        <el-table-column show-overflow-tooltip align="center" :span="6"
                         prop="bankAccountName" label="银行账户名">
          <template slot-scope="scope">
            <el-input v-if="scope.row.keyId != ''" :disabled="disable" v-model="scope.row.bankAccountName" size="small"></el-input>
            <el-input v-else v-model="scope.row.bankAccountName" size="small"></el-input>
          </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip align="center" :span="6"
                         prop="bankName" label="银行开户行">
          <template slot-scope="scope">
            <el-input v-if="scope.row.keyId != ''" :disabled="disable" v-model="scope.row.bankName" size="small"></el-input>
            <el-select v-model="scope.row.bankName" placeholder="请选择开户行"
                       filterable v-else clearable auto-complete="off" size="small">
              <el-option
                v-for="item in bankNameList"
                :key="item.key"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip align="center" :span="6"
                         prop="bankBranch" label="开户支行">

          <template slot-scope="scope">
            <el-input size="small" v-if="scope.row.keyId != ''" :disabled="disable" v-model="scope.row.bankBranch"></el-input>
            <el-input size="small" v-else v-model="scope.row.bankBranch"></el-input>
          </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip align="center" :span="6"
                         prop="bankcardNo" label="银行账号">
          <template slot-scope="scope">
            <el-input size="small" v-if="scope.row.keyId != ''" :disabled="disable" v-model="scope.row.bankcardNo"></el-input>
            <el-input size="small" v-else v-model="scope.row.bankcardNo"></el-input>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="50" v-if="isEdit" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.$index=== bankCardRealCount" type="text" size="small"
                       @click="addBankCard(scope.row)">添加
            </el-button>
            <el-button v-else @click.native.prevent="deleteBankCard(scope.$index, scope.row)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-row v-show="isEdit" style="padding-top: 10px">
      <el-col :span="12" :offset="2">
        <el-button class="role_off" size="small" @click="cancelEdit">取消</el-button>
      </el-col>
      <el-col :span="2" :offset="4">
        <el-button type="primary" size="small" @click.native="editSubmit">保存</el-button>
      </el-col>
    </el-row>
  </section>

</template>

<script type="text/ecmascript-6">
  import * as Api from 'api'
  import * as Regex from 'common/js/regex'
  import { entBankName } from 'common/js/state-dic'

  export default {
    props: {
      edit: {
        type: Boolean,
        default: false
      },
      isEdit: [Boolean, String],
      entId: String,
      timestamp: String
    },
    data () {
      var validatePersonCard = (rule, value, callback) => {
        value = this.entInfo.verifyInfo.legalPersonCard
        if (!value) {
          return callback(new Error('身份证号不能为空'))
        } else {
          setTimeout(() => {
            if (Regex.regIDCard.test(value) === false) {
              callback(new Error('身份证输入不合法'))
            } else {
              callback()
            }
          }, 200)
        }
      }
      var validateEntNickName = (rule, value, callback) => {
        value = this.entInfo.entNickName
        if (!value) {
          return callback(new Error('企业昵称不能为空'))
        } else {
          setTimeout(() => {
            if (Regex.regEn.test(value) || Regex.regCn.test(value)) {
              callback(new Error('不能包含非法字符'))
            } else {
              callback()
            }
          }, 200)
        }
      }
      var validateLegalPerson = (rule, value, callback) => {
        value = this.entInfo.verifyInfo.legalPerson
        if (!value) {
          return callback(new Error('法人代表姓名不能为空'))
        } else {
          setTimeout(() => {
            if (Regex.regEn.test(value) || Regex.regCn.test(value)) {
              callback(new Error('不能包含非法字符'))
            } else {
              callback()
            }
          }, 200)
        }
      }
      var validateComid = (rule, value, callback) => {
        value = this.entInfo.verifyInfo.comid
        if (!value) {
          return callback(new Error('请输入统一社会信用代码'))
        } else {
          setTimeout(() => {
            if (Regex.regEn.test(value) || Regex.regCn.test(value)) {
              callback(new Error('不能包含非法字符'))
            } else {
              callback()
            }
          }, 200)
        }
      }
      return {
        isLoading: false,
        cities: [],
        entInfo: {
          entName: '',
          address: '',
          contactName: '',
          contactPhone: '',
          mobile: '',
          verifyInfo: {
            legalPersonCard: ''
          },
          entAdmins: [],
          entBankcardInfs: [{
            'keyId': '',
            'bankName': '',
            'bankAccountName': '',
            'bankBranch': '',
            'entId': '',
            'bankcardNo': ''
          }]
        },
        entInfoOld: {},
        rules: {
          province: [
            {required: true, message: '请选择省份', trigger: 'change'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          legalPersonCard: [
            {required: true, validator: validatePersonCard, trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入企业地址', trigger: 'blur'}
          ],
          entNickName: [
            {required: true, validator: validateEntNickName, trigger: 'blur'}
          ],
          legalPerson: [
            {required: true, validator: validateLegalPerson, trigger: 'blur'}
          ],
          comid: [
            {required: true, validator: validateComid, trigger: 'blur'}
          ]
        },
        style: {
          inputspan: 14
        },
        deleteBankCardList: []
      }
    },
    computed: {
      _provinces () {
        let provinces = this.$store.getters.provinces
        console.log(provinces)
        return provinces
      },
      disable () {
        if (!this.isEdit) {
          return true
        } else {
          //  认证中  已认证状态 不能修改
          if (this.entInfo.verifyState === '3' || this.entInfo.verifyState === '1') {
            return true
          } else {
            return false
          }
        }
      },
      disableBaseInfo () {
        return !this.isEdit
      },
      bankCardRealCount () {
        return this.entInfo.entBankcardInfs.length - 1
      },
      bankNameList () {
        return entBankName()
      }
    },
    created () {
      this._getEntDetail()
    },
    methods: {
      selectProvince (val) {
        console.log(`选中省份${val}`)
        this.entInfo.province = val
        Api.getCities({provinceId: val}).then(response => {
          if (response.data.code === Api.ERR_OK) {
            this.cities = response.data.data
            this.entInfo.city = this.cities[0].uniqueId
          }
        })
      },
      selectCity (val) {
        console.log(`选中了城市${val}`)
        this.entInfo.city = val
      },
      cancelEdit () {
        console.log('取消编辑')
        this.isLoading = false
        this.$emit('cancelEdit')
      },
      editSubmit () {
        console.log('提交编辑')
        console.log(this.entInfo)
        console.log(this.entInfoOld)

        this.$refs['entInfoForm'].validate((valid) => {
          if (valid) {
            this.isLoading = true
            // 需要删除的银行卡
            if (this.deleteBankCardList.length > 0) {
              let i = this.deleteBankCardList.length
              while (i--) {
                Api.deleteEntBankCard({keyId: this.deleteBankCardList[i], entId: this.entInfo.entId}).then(response => {
                  this.$message({
                    message: response.data.msg,
                    type: response.data.code === '0000' ? 'success' : 'error'
                  })
                })
                this.deleteBankCardList.splice(i, 1)
              }
            }

            // 新增银行卡
            let addBankCardList = this.entInfo.entBankcardInfs.filter(o => {
              if (o.bankcardNo !== undefined && o.bankcardNo.trim().length > 1 &&
                (o.keyId === undefined || o.keyId.trim() < 1)) {
                return true
              } else {
                return false
              }
            })
            addBankCardList.forEach(card => {
              Api.addEntBankCard(
                {
                  'entId': this.entInfo.entId,
                  'bankAccountName': card.bankAccountName,
                  'bankcardNo': card.bankcardNo,
                  'bankName': card.bankName,
                  'bankBranch': card.bankBranch
                }
              ).then(response => {
                this.$message({
                  message: response.data.msg,
                  type: response.data.code === '0000' ? 'success' : 'error'
                })
              })
            })
            let addNum = this.entInfo.entBankcardInfs.length
            while (addNum--) {
              let card = this.entInfo.entBankcardInfs[addNum]
              if (card.bankcardNo !== undefined && card.bankcardNo.trim().length > 1 &&
                (card.keyId === undefined || card.keyId.trim() < 1)) {
                this.entInfo.entBankcardInfs.splice(addNum, 1)
              }
            }
            // 更新企业信息
            Api.updateEntBaseInfo({
              entId: this.entInfo.entId,
              entName: this.entInfo.entName,
              contactPhone: this.entInfo.contactPhone,
              contactName: this.entInfo.contactName,
              city: this.entInfo.city,
              province: this.entInfo.province,
              address: this.entInfo.address,
              entNickName: this.entInfo.entNickName
            }).then(response => {
              this.isLoading = false
              this.$message({
                message: response.data.msg,
                type: response.data.code === '0000' ? 'success' : 'error'
              })
              // 更新成功关闭页面
              if (response.data.code === '0000') {
                this.$emit('cancelEdit')
              }
            })
          }
        })
      },
      _getEntDetail (val) {
        if (val === '') {
          return
        }
        this.isLoading = true
        Api.getEntDetail({entId: this.entId}).then(response => {
          console.log('查询企业详情!')
          this.isLoading = false
          this.entInfo = response.data.data
          if (this.isEdit) {
            this.addEmptyBankCard()
            this.deleteBankCardList = []
          }
          this.entInfoOld = JSON.parse(JSON.stringify(this.entInfo))
        })
      },
      deleteBankCard (index, row) {
        console.log('删除银行卡 将待删除的银行卡添加到删除队列')
        /*
        if (this.bankCardRealCount < 1) {
          this.$message({
            message: '银行卡至少保留一张',
            type: 'warning'
          })
          return
        }*/
        console.log(row)
        if (row.keyId !== null && row.keyId !== undefined) {
          this.deleteBankCardList.push(row.keyId)
        }
        console.log('deleteBankCardList')
        this.entInfo.entBankcardInfs.splice(index, 1)
        console.log(this.deleteBankCardList)
      },
      addBankCard (val) {
        console.log('添加银行卡')
        if (val.bankName === undefined || val.bankName.trim().length < 0 ||
          val.bankAccountName === undefined || val.bankAccountName.trim().length < 0 ||
          val.bankcardNo === undefined || val.bankcardNo.trim().length < 0 ||
          val.bankBranch === undefined || val.bankBranch.trim().length < 0) {
          this.$message({
            message: '银行卡信息填写有误',
            type: 'warning'
          })
          return
        }

        console.log(val)
        this.entInfo.entBankcardInfs.splice(this.bankCardRealCount, 1)
        this.entInfo.entBankcardInfs.push(val)
        this.addEmptyBankCard()
      },
      addEmptyBankCard () {
        this.entInfo.entBankcardInfs.push({
          'keyId': ''
        })
      }
    },
    watch: {
      timestamp (val) {
        this.$refs['entInfoForm'].resetFields()
        this._getEntDetail()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #entDetail
    .el-form
      .el-form-item
        .el-input
          width 300px
</style>
