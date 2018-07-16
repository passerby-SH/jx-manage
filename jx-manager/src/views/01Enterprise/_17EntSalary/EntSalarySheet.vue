<template>
  <div class="customDialog">
    <el-form ref="entInfo" :model="detail" v-if="detail" class="toobar"
             label-position="left">

      <span class="item-title">应发明细</span>
      <el-row type="flex" v-for="(val,key,index) in detail.addAmount" v-if="detail.addAmount" :key="index">
        <el-form-item :label="key" :span="10">
          <span>{{val}}</span>
        </el-form-item>
      </el-row>
      <span class="item-title">代扣明细</span>
      <el-row type="flex" v-for="(val,key,index) in detail.subtractAmount" v-if="detail.subtractAmount" :key="index">
        <el-form-item :label="key" :span="10">
          <span>{{val}}</span>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      detail: {}
    },
    data () {
      return {}
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
      border-bottom 1px dashed gray
    }
    .el-form-item {
      width: 50%;
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
