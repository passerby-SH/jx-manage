import fetch from '../utils/fetch'

export const http = {
  prefix: '/jx-manage',
  post: 'post',
  get: 'get'
}

// 企业名称查询
export function getSimpleEntList (para) {
  return fetch({
    url: http.prefix + '/ent/info/getall',
    method: http.get,
    params: para
  })
} ;

// 发薪企业查询
export function getSalaryEnt(para) {
  return fetch({
    // url: '/jx-ent/jx/common/salaryentinfo',
    url: http.prefix + '/ent/info/getall',
    method: 'get',
    params: para
  })
} ;

export function getEntList (para) {
  return fetch({
    // url: '/jx-ent/ent/info/getinfo',
    url: http.prefix + '/ent/info/getinfo',
    method: http.get,
    params: para
  })
} ;

export function getEntDetail (para) {
  return fetch({
    url: http.prefix + '/ent/info/getdetail',
    method: 'get',
    params: para
  })
} ;

export function deleteEntBankCard (param) {
  return fetch({
    url: http.prefix + '/ent/info/deletebankcard',
    method: 'post',
    params: param
  })
} ;
// 更改企业基本信息
export function updateEntBaseInfo (param) {
  return fetch({
    url: http.prefix + '/ent/info/updateinfo',
    method: 'post',
    params: param
  })
}

export function addEntBankCard (params) {
  return fetch({
    url: http.prefix + '/ent/info/addbankcard',
    method: http.post,
    params: params
  })
} ;

// 企业交易记录查询
export function getEntTradeInfo (param) {
  return fetch({
    url: http.prefix + '/ent/balance/getclear',
    method: http.post,
    params: param
  })
} ;

//  余额查询
export function getEntBalance (param) {
  return fetch({
    url: http.prefix + '/ent/balance/getbalance',
    method: http.post,
    params: param
  })
}

// 实名认证审核状态查询
export function getEntAuditInfo (param) {
  return fetch({
    url: http.prefix + '/ent/verify/info',
    method: http.post,
    params: param
  })
}

// 审核企业实名认证
export function doEntVerify (param) {
  return fetch({
    url: http.prefix + '/ent/verify/toverify',
    method: http.post,
    params: param
  })
}

// 获取企业签约审核
export function getEntSignInfo (param) {
  return fetch({
    url: http.prefix + '/ent/sign/info',
    method: http.post,
    params: param
  })
}
// 签约审核通过
export function doEntSign (param) {
  return fetch({
    url: http.prefix + '/ent/sign/tosign',
    method: http.post,
    params: param
  })
}

// 获取企业充值订单记录
export function getEntRechargeOrder (param) {
  return fetch({
    url: http.prefix + '/ent/recharge/getrecord',
    method: http.post,
    params: param
  })
}
// 充值订单审核 添加joc订单id
export function doEntRechargeOrderVerify (param) {
  return fetch({
    url: http.prefix + '/ent/recharge/addorderid',
    method: http.post,
    params: param
  })
}

// 获取企业发薪批次
export function getEntSalaryList (param) {
  return fetch({
    url: http.prefix + '/table/salary/record/salaryinfo',
    method: http.post,
    params: param
  })
}

// 获取企业发薪批次
export function getSalaryDetailList (param) {
  return fetch({
    url: http.prefix + '/table/salary/record/salarydetail',
    method: http.post,
    params: param
  })
}

// 发薪批次导出
export function exportSalaryList (param) {
  return fetch({
    url: http.prefix + '/table/salary/record/exportlist',
    method: http.post,
    params: param,
    responseType: 'arraybuffer'
  })
}

// JF交易信息查询
export function getJFTradeList (param) {
  return fetch({
    url: http.prefix + '/open/checkflow',
    method: http.get,
    params: param
  })
}
