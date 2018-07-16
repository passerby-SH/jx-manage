<template>
    <div>
      <span class="title">{{title}}</span>
      <el-select size="small" :loading="loading"
                 v-model="model" filterable
                 clearable
                 @change="change"
                 :placeholder="placeHolder"
                 :loading-text="loadingText"
                 v-loading="isLoading"
                 remote
                 :no-data-text="noDataTip"
                 icon="search"
                 @clear="clear"
      >
        <el-option
          v-for="(item, index) in list" v-if="list.length"
          :key="index"
          :label="item.entId +'-' + item.entName"
          :value="item.entId">
          <span style="float: left; font-size: 12px">{{ item.entId }}</span>
          <span style="float: right; font-size: 12px">{{ item.entName }}</span>
        </el-option>
      </el-select>
    </div>
</template>

<script type="text/ecmascript-6">
  import * as Api from 'api'
  import * as Route from 'common/menu'
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      name: {
        type: String,
        default: ''
      },
      placeHolder: {
        type: String,
        default: '请输入企业名称(至少三个字符)'
      },
      noDataTip: {
        type: String,
        default: '无匹配数据'
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        loadingText: '加载中',
        isLoading: false,
        list: [],
        query: {
          entId: '',
          entName: ''
        },
        model: ''
      }
    },
    watch: {
      '$route': {
        immediate: true,
        handler: 'watchRoute'
      }
    },
    methods: {
      watchRoute (r) {
        if (r.path.toString().indexOf(Route.entRoute.EntInfo.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntTrad.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntBalance.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntRealName.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntSign.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntRechargeOrder.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntSalary.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntSalaryDetail.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.JFTrade.route) !== -1
      ) {
          this.salaryEntQuery()
        }
      },
      salaryEntQuery () {
        console.log(`发薪企业查询`)
        this.loadingText = '玩命加载中'
        this.isLoading = true
        Api.getSalaryEnt().then(response => {
          this.isLoading = false
          this.loadingText = ''
          if (response.data.code === '0000') {
            this.list = response.data.data
          }
        })
      },
      change (entId) {
        console.log(`选择企业${entId}`)
        this.$emit('input-select', entId)
      },
      clear () {
        this.isLoading = false
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    text-align: right
    color: #606266
    line-height: 40px
    padding: 0 12px 0 0
    font-size: 14px!important
  .el-select
    width 280px
</style>
