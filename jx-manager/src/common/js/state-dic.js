
const entVerifyStateMap = {
  0: '未认证',
  1: '认证中',
  2: '认证失败',
  3: '已认证'
}

export {entVerifyStateMap}

export function entVerifyState () {
  return [
    {'key': 0, 'value': '未认证'},
    {'key': 1, 'value': '认证中'},
    {'key': 2, 'value': '认证失败'},
    {'key': 3, 'value': '已认证'}
  ]
}

// 企业信息管理签约状态
const entSignStateMap = {
  0: '未签约',
  1: '已签约'
}
export {entSignStateMap}
export function entSignState () {
  return [{
    'key': 0,
    'value': '未签约'
  }, {
    'key': 1,
    'value': '已签约'
  }
  ]
}
// 银行卡名称
export function entBankName () {
  return [
    {'key': 1, 'value': '民生银行'},
    {'key': 2, 'value': '兴业银行'},
    {'key': 3, 'value': '中信银行'},
    {'key': 4, 'value': '华夏银行'},
    {'key': 5, 'value': '光大银行'},
    {'key': 6, 'value': '北京银行'},
    {'key': 7, 'value': '上海银行'},
    {'key': 8, 'value': '天津银行'},
    {'key': 9, 'value': '大连银行'},
    {'key': 10, 'value': '杭州商业银行'},
    {'key': 11, 'value': '宁波银行'},
    {'key': 12, 'value': '厦门银行'},
    {'key': 13, 'value': '广州银行'},
    {'key': 14, 'value': '平安银行'},
    {'key': 15, 'value': '浙商银行'},
    {'key': 16, 'value': '上海农商银行'},
    {'key': 17, 'value': '重庆银行'},
    {'key': 18, 'value': '江苏银行'},
    {'key': 19, 'value': '北京农村商业银行'},
    {'key': 20, 'value': '济宁银行'},
    {'key': 21, 'value': '台州银行'},
    {'key': 22, 'value': '深圳发展银行'},
    {'key': 23, 'value': '成都银行'},
    {'key': 24, 'value': '徽商银行'}
  ]
}

// 企业交易类型
const typeEntTransfer = {
  1: '工资发放',
  2: '工资代发充值',
  7: '工资发放撤回',
  8: '企业垫资还款'
}
export {typeEntTransfer}
export function funEntTransfer () {
  return [
    {'key': 1, 'value': '工资发放'},
    {'key': 2, 'value': '工资代发充值'},
    {'key': 7, 'value': '工资发放撤回'},
    {'key': 8, 'value': '企业垫资还款'}
  ]
}

// 实名认证企业审核状态
const typeEntAudit = {
  1: '待审批',
  2: '拒绝',
  3: '审批通过'
}
export {typeEntAudit}
export function funEntAudit () {
  return [
    {'key': 1, 'value': '待审批'},
    {'key': 2, 'value': '拒绝'},
    {'key': 3, 'value': '审批通过'}
  ]
}

// 企业签约审核 审批状态
export const typeEntSignState = {
  0: '待审批',
  1: '审批通过'
}
export function funEntSignState () {
  return [
    {'key': 1, 'value': '审批通过'},
    {'key': 0, 'value': '待审批'}
  ]
}

// 企业充值订单 审批状态
export const typeEntRechargeOrderVerifyState = {
  0: '审核失败',
  1: '审核通过',
  2: '待审核'
}
export function funRechargeOrderVerifyType () {
  return [
    {'key': 0, 'value': '审核失败'},
    {'key': 1, 'value': '审核通过'},
    {'key': 2, 'value': '待审核'}
  ]
}

// 企业充值订单 订单状态
export const typeEntRechargeOrderState = {
  1: '充值成功',
  2: '提交成功'
}
export function funRechargeOrderStateType () {
  return [
    {'key': 1, 'value': '充值成功'},
    {'key': 2, 'value': '提交成功'}
  ]
}

// 工资发放类型 (显示的时候有三种)
const typeSalaryType = {
  1: '工资发放',
  2: '发工资条',
  3: '工资和工资条'
}
export {typeSalaryType}

// 前端查询时只传两种
export function funSalaryType () {
  return [
    {'key': 1, 'value': '工资发放'},
    {'key': 2, 'value': '发工资条'}
  ]
}

// 工资发放状态
export const typeSalaryState = {
  1: '发放成功',
  0: '发放失败',
  3: '待付款',
  4: '订单关闭',
  5: '发放中',
  7: '部分撤回'
}
export function funSalaryState () {
  return [
    {'key': 1, 'value': '发放成功'},
    {'key': 0, 'value': '发放失败'},
    {'key': 3, 'value': '待付款'},
    {'key': 4, 'value': '订单关闭'},
    {'key': 5, 'value': '发放中'},
    {'key': 7, 'value': '部分撤回'}
  ]
}
// 工资发放状态
export const typeSalaryDetailState = {
  1: '发放成功',
  0: '发放失败',
  3: '待付款',
  4: '订单关闭',
  5: '发放中',
  7: '已撤回'
}
export function funSalaryDetailState () {
  return [
    {'key': 1, 'value': '发放成功'},
    {'key': 0, 'value': '发放失败'},
    {'key': 3, 'value': '待付款'},
    {'key': 4, 'value': '订单关闭'},
    {'key': 5, 'value': '发放中'},
    {'key': 7, 'value': '已撤回'}
  ]
}

//用户激活状态
export const typeUserActiveState = {
  1: '已激活',
  0: '未激活'
}
export function funUserActiviState () {
  return [
    {'key': 1, 'value': '已激活'},
    {'key': 0, 'value': '未激活'}
  ]
}

//用户实名认证状态
export const typeUserVerifyState = {
  1: '已认证',
  0: '未认证'
}
export function funUserVerifyState () {
  return [
    {'key': 1, 'value': '已认证'},
    {'key': 0, 'value': '未认证'}
  ]
}

// 用户业务规则状态
export const typeUserBusinessRule = {
  1: '提现'
}
export function funUserBusinessRuleType () {
  return [
    {'key': '1', 'value': '提现'}
  ]
}

// 用户业务规则状态
export const typeUserBusinessRuleState = {
  0: '未启用',
  1: '启用'
}
export function funUserBusinessRuleState () {
  return [
    {'key': '0', 'value': '未启用'},
    {'key': '1', 'value': '启用'}
  ]
}

//用户交易类型
export const typeUserTrade = {
  1: '工资发放',
  2: '转账 (出)',
  3: '转账 (入)',
  6: '提现退款',
  7: '发薪撤回',
  8: '余额提现'
}
export function funUserTradeType () {
  return [
    {'key': 1, 'value': '工资发放'},
    {'key': 2, 'value': '转账 (出)'},
    {'key': 3, 'value': '转账 (入)'},
    {'key': 6, 'value': '提现退款'},
    {'key': 7, 'value': '发薪撤回'},
    {'key': 8, 'value': '余额提现'}
  ]
}

// 用户订单类型
export const typeUserOrderType = {
  '01': '提现',
  '02': '转账 (出)',
  '03': '转账 (入)'
}
export function funUserOrderType () {
  return [
    {'key': '01', 'value': '提现'},
    {'key': '02', 'value': '转账 (出)'},
    {'key': '03', 'value': '转账 (入)'}
  ]
}

// 用户订单状态
export const typeUserOrderState = {
  '0': '待支付',
  '1': '成功',
  '2': '已支付',
  '3': '处理中',
  '4': '已退款',
  '5': '订单关闭',
  '7': '退款中'
}
export function funUserOrderState () {
  return [
    {'key': '0', 'value': '待支付'},
    {'key': '1', 'value': '成功'},
    {'key': '2', 'value': '已支付'},
    {'key': '3', 'value': '处理中'},
    {'key': '4', 'value': '已退款'},
    {'key': '5', 'value': '订单关闭'},
    {'key': '7', 'value': '退款中'}
  ]
}

export const typeSystemErrorType = {
  '1': '企业流水更改异常',
  '2': '用户流水更改异常',
  '3': '更改发薪及详情状态异常',
  '4': 'JF成功开户更改本地状态异常',
  '6': '用户提现异常',
  '7': '福利分配异常'
}

export function funSystemErrorType () {
  return [
    {'key': '1', 'value': '企业流水更改异常'},
    {'key': '2', 'value': '用户流水更改异常'},
    {'key': '3', 'value': '更改发薪及详情状态异常'},
    {'key': '4', 'value': 'JF成功开户更改本地状态异常'},
    {'key': '6', 'value': '用户提现异常'},
    {'key': '7', 'value': '福利分配异常'}
  ]
}

export const typeSystemJobState = {
  '0': 'job等待执行ing',
  '1': 'job执行成功',
  '2': 'job执行失败',
  '3': '需要人工介入'
}

export function funSystemJobState () {
  return [
    {'key': '0', 'value': 'job等待执行ing'},
    {'key': '1', 'value': 'job执行成功'},
    {'key': '2', 'value': 'job执行失败'},
    {'key': '3', 'value': '需要人工介入'}
  ]
}

export function funErrorJobHopeState () {
  return [
    {'key': 'success', 'value': '执行为成功'},
    {'key': 'fail', 'value': '执行为失败'}
  ]
}

// JF开放平台流水类型
export const typeJFFlowType = {
  '1': '消费',
  '2': '消费退款',
  '3': '充值',
  '4': '充值退款',
  '5': '转出',
  '6': '转入'
}

export const typeResourceLevel = {
    '1': '超级管理员',
    '2': '管理员',
    '3': '子操作',
    '4': '公共操作'
}

// 权限级别
export function funResourceLevel () {
  return [
    {'key': '1', 'value': '超级管理员'},
    {'key': '2', 'value': '管理员'},
    {'key': '3', 'value': '子操作'},
    {'key': '4', 'value': '公共操作'}
  ]
}

export const typeAuthority = {
  '1': '按钮',
  '2': '菜单'
}
// 权限类型
export function funAuthorityType () {
  return [
    {'key': '1', 'value': '按钮'},
    {'key': '2', 'value': '菜单'}
  ]
}

// 角色状态
export const typeAdminRole = {
  '0': '无效',
  '1': '有效'
}

// 角色状态
export function funAdminRoleType () {
  return [
    {'key': '0', 'value': '无效'},
    {'key': '1', 'value': '有效'}
  ]
}

// 管理员在职状态
export const typeAdminJobState = {
  '0': '在职',
  '1': '离职'
}

export function funAdminJobStateType () {
  return [
    {'key': '1', 'value': '离职'},
    {'key': '0', 'value': '在职'}
  ]
}
