<template>
  <section id="recharge_manage_new">
    <el-form :inline="true" :model="queryModel" class="toolbar demo-form-inline">
      <el-row type="flex">
        <el-col>
            <ent-select title="企业名称"
                        place-holder="请输入企业编号或名称"
                        @input-select="salaryInputSelect"
            ></ent-select>
        </el-col>
        <el-col>
          <el-form-item label="交易类型">
            <el-select size="small" v-model="queryModel.transType" filterable clearable placeholder="请选择交易类型">
              <el-option
                v-for="item in _entTradeType"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-form-item label="交易时间" :span=8>
          <el-date-picker
            v-model="selectDateRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="left">
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" @click="resetDoQuery" :disabled="isLoading">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      ref="entTradeTable" :data="entTradeList" style="width: 100%" border
      v-loading="isLoading"
      @row-click="tableRowClick" highlight-current-row>
      <!--交易时间-->
      <el-table-column :span="6" align="center"
                       label="交易时间">
        <template slot-scope="scope">{{scope.row.clearingDate | filterdateYMDHMS}}
        </template>
      </el-table-column>

      <!--企业名称-->
      <el-table-column :span="6" align="center" label="企业名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName}}</span>
        </template>
      </el-table-column>

      <!--运营主企业-->
      <el-table-column :span="6" align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.operationEntName}}</span>
        </template>
      </el-table-column>

      <!--交易金额(元)-->
      <el-table-column :span="6" align="center" label="交易金额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.transAmt}}</span>
        </template>
      </el-table-column>

      <!--交易后的余额(元)-->
      <el-table-column :span="6" align="center" label="交易后的余额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.afterBalance}}</span>
        </template>
      </el-table-column>

      <!--交易类型-->
      <el-table-column :span="6" align="center" label="交易类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.transType | filterTradeType}}</span>
        </template>
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
  </section>
</template>

<script type="text/ecmascript-6">
  import EntSelect from 'components/select/EntSelect'
  import * as Api from 'api'
  import * as State from 'common/js/state-dic'
  import * as filters from 'filters'

  export default {
    data () {
      return {
        isLoading: false,
        selectDateRange: '',
        total: 10,
        salaryDataList: [],
        entTradeList: [],
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    computed: {
      _entTradeType () {
        return State.funEntTransfer()
      }
    },
    methods: {
      resetDoQuery () {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      salaryInputSelect (entId) {
        if (entId !== undefined) {
          this.queryModel.entId = entId
        } else {
          this.queryModel.entId = null
        }
        console.log(this.queryModel.entId)
      },
      doQuery () {
        console.log('查询交易记录')
        this.isLoading = true
        let _startDate = this.queryModel.startDate
        let _endDate = this.queryModel.endDate
        if (this.queryModel.startDate !== null) {
          this.queryModel.startDate = filters.parseTime(this.queryModel.startDate, '{y}-{m}-{d}')
        }
        if (this.queryModel.endDate !== null) {
          this.queryModel.endDate = filters.parseTime(this.queryModel.endDate, '{y}-{m}-{d}')
        }

        Api.getEntTradeInfo(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === '0000') {
            this.entTradeList = response.data.data.list
            this.total = parseInt(response.data.data.totalCount)

            this.queryModel.startDate = _startDate
            this.queryModel.endDate = _endDate
          }
        })
      },
      pageChange () {
        console.log('pageChange')
      },
      pageHandelCurrentChange (val) {
        console.log('pageHandelCurrentChange')
        this.queryModel.pageNum = val
        this.doQuery()
      },
      tableRowClick () {
      }
    },
    components: {
      EntSelect
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
