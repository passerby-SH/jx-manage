<template>
   <div>
      <el-form :inline="true" :model="queryModel" class="toolbar demo-form-inline" label-position="right">
        <el-row type="flex">
          <el-col :span="8">
            <ent-select title="发薪企业" place-holder="请选择发薪企业"
                        @input-select="salaryInputSelect">
            </ent-select>
          </el-col>
          <el-col :span="8">
            <el-form-item label="认证状态">
              <el-select size="small" v-model="queryModel.verifyState" filterable clearable placeholder="请选择认证状态">
                <el-option
                  v-for="item in entAuthStateSource"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约状态">
              <el-select size="small" v-model="queryModel.signState" filterable clearable placeholder="请选择签约状态">
                <el-option
                  v-for="item in entSignStateSource"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="创建时间开始">
              <el-date-picker
                class="startDate"
                size="small"
                :editable=false
                v-model="queryModel.startDate"
                type="date"
                placeholder="请选择开始时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间结束">
              <el-date-picker
                class="endDate"
                size="small"
                :editable=false
                v-model="queryModel.endDate"
                type="date"
                placeholder="请选择结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="3">
            <el-button  size="small" type="primary" @click="updateSelectEnt" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_edit')">编辑企业</el-button>
          </el-col>
          <el-col :span="3">
            <el-button  size="small" type="primary" icon="el-icon-search" :disabled="isLoading" @click="resetDoQuery">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

     <el-table
       ref="salaryEntTable" :data="entDataList" style="width: 100%" highlight-current-row border
       v-loading="isLoading"
       @row-click="tableRowClick" >
       <!--企业编号-->
       <el-table-column :span="6" prop="enterpriseId" align="center" label="企业编号" >
         <template slot-scope="scope">
           <span class="globalPointer" size="small"  @click.stop="clickEntId(scope.$index, scope.row)">{{scope.row.entId}}</span>
         </template>
       </el-table-column>

       <!--企业名称-->
       <el-table-column  :span="6" prop="enterpriseId" align="center" label="企业名称" >
         <template slot-scope="scope">
           <span  size="small">{{scope.row.entName}}</span>
         </template>
       </el-table-column>

       <!--运营主企业-->
       <el-table-column :span="6" prop="enterpriseId" align="center" label="运营主企业" >
         <template slot-scope="scope">
           <span  size="small">{{scope.row.operationEntName}}</span>
         </template>
       </el-table-column>

       <!--认证状态-->
       <el-table-column :span="6" prop="enterpriseId" align="center" label="认证状态" >
         <template slot-scope="scope">
           <span size="small">{{scope.row.verifyState | filterEntVerifyState}}</span>
         </template>
       </el-table-column>

       <!--签约状态-->
       <el-table-column :span="6" prop="enterpriseId" align="center" label="签约状态" >
         <template slot-scope="scope">
           <span  size="small">{{scope.row.signState | filterEntSignState}}</span>
         </template>
       </el-table-column>

       <!--创建时间-->
       <el-table-column :span="6" align="center"
         label="日期">
         <template slot-scope="scope">{{ scope.row.createDate | filterdateYMDHMS}}</template>
       </el-table-column>
     </el-table>
     <el-col :span="24" class="toolbar">
       <div class="block">
         <el-pagination
           @size-change="pageChange"
           @current-change="pageHandelCurrentChange"
           :current-page="queryModel.pageNum"
           :page-size="queryModel.pageSize"
           layout="total, prev, pager, next"
           :total="total">
         </el-pagination>
       </div>
     </el-col>
     <el-dialog :title="detail.title" center width="60%" :visible.sync="detail.visible" :close-on-click-modal="1===0" >
       <ent-detail :ent-id="detail.entId" :timestamp="detail.timeStamp" :is-edit="detail.isEdit" @cancelEdit="closeEditDialog"></ent-detail>
     </el-dialog>
   </div>
</template>

<script type="text/ecmascript-6">
import * as Api from 'api'
import * as state from 'common/js/state-dic'
import * as filters from 'filters'
import EntDetail from './EntDetail'
import EntSelect from 'components/select/EntSelect'

export default {
  data () {
    return {
      total: 10,
      isLoading: false,
      queryModel: {
        verifyState: null,
        signState: null,
        entName: null,
        salaryEntId: null,
        startDate: null,
        endDate: null,
        pageSize: 10,
        pageNum: 1
      },
      entDataList: [],
      entId: '',
      detail: {
        entId: '',
        title: '企业详情',
        isEdit: false,
        visible: false,
        timeStamp: ''
      },
      selectRow: null
    }
  },
  activated() {
    console.log(this.$store.getters.btns)
  },
  computed: {
    entAuthStateSource() {
      return state.entVerifyState()
    },
    entSignStateSource() {
      return state.entSignState()
    }
  },
  methods: {
    resetDoQuery() {
      this.queryModel.pageNum = 1
      this.getEntList()
    },
    salaryInputSelect(entId) {
      if (entId !== undefined) {
        this.queryModel.salaryEntId = entId
      } else {
        this.queryModel.salaryEntId = null
      }
      console.log(this.queryModel.salaryEntId)
    },
    updateEnterprise() {
    },
    getEntList() {
      console.log(`企业查询 ${this.queryModel}`)

      let _startDate = this.queryModel.startDate
      let _endDate = this.queryModel.endDate
      if (this.queryModel.startDate !== null) {
        this.queryModel.startDate = filters.parseTime(this.queryModel.startDate, '{y}-{m}-{d}')
      }
      if (this.queryModel.endDate !== null) {
        this.queryModel.endDate = filters.parseTime(this.queryModel.endDate, '{y}-{m}-{d}')
      }
      console.log(this.queryModel)
      this.isLoading = true
      Api.getEntList(this.queryModel).then(response => {
        this.isLoading = false
        this.entDataList = response.data.data.list
        this.total = parseInt(response.data.data.totalCount)
        this.queryModel.startDate = _startDate
        this.queryModel.endDate = _endDate
      })
    },
    clickEntId(index, row) {
      console.log('clickEntId')

      let r = this.$store.getters.getBtnIsShowByName('btn_ent_detail')
      if (!r) {
        console.log('哈哈, 你木有权限!')
        return
      }
      this.detail.entId = row.entId
      this.detail.isEdit = false
      this.detail.title = '企业详情'
      this.detail.visible = true
      this.detail.timeStamp = new Date().getTime().toString()
      this.selectRow = null
    },
    pageHandelCurrentChange(val) {
      this.queryModel.pageNum = val
      this.getEntList()
      console.log('pageHandelCurrentChange')
      console.log(this.queryModel)
      console.log(val)
    },
    tableRowClick(row, event, column) {
      console.log('tableRowClick')
      this.selectRow = row
      this.$refs.salaryEntTable.setCurrentRow(row)
      console.log(this.selectRow)
    },
    pageChange(val) {
      console.log('pageChange')
      console.log(val)
    },
    updateSelectEnt() {
      if (this.selectRow === null) {
        this.$message.warning('请重新点击选择一个企业')
      }
      this.detail.entId = this.selectRow.entId
      this.detail.isEdit = true
      this.detail.title = '企业编辑'
      this.detail.visible = true
      this.detail.timeStamp = new Date().getTime().toString()
    },
    closeEditDialog() {
      this.detail.visible = false
      this.getEntList()
    }
  },
  components: {
    EntSelect,
    EntDetail
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #recharge_manage_new .el-form-item {
    width: 100%;
  }

  #recharge_manage_new .el-form-item__label {
    width: 30%;
  }

  #recharge_manage_new .el-form-item__content {
    width: 70%;
  }

  #recharge_manage_new .el-form-item__content .el-select {
    width: 100%;
  }

  #recharge_manage_new .el-date-editor {
    width: 100%;
  }
</style>
