import * as Regex from './regex'

// 正整数 校验
export function validatorPositive (rule, value, callback) {
  debugger
  if (!value) {
    return callback(new Error('数值不能为空!'))
  }
  if (Regex.regPositive.test(value) === false) {
    return callback(new Error('数值输入不合法!'))
  }

  if (value !== '∞') {
    let v = parseInt(value)
    if (v.toString().length !== value.toString().length) {
     return callback(new Error('输入不合法!'))
    }
  }
  setTimeout(() => {
    callback()
  }, 100)
}

// 最大金额校验
export function validatorMaxAmount(rule, value, callback) {
  if (!value) {
    return callback(new Error('金额不能为空!'))
  }
  if (Regex.regMoney.test(value) === false) {
    return callback(new Error('输入金额不合法!'))
  }
  setTimeout(() => {
    let v = parseInt(value)
    if (v < 0) {
      callback(new Error('限额必须大于0'))
    } else {
      callback()
    }
  }, 100)
}

// 校验金额
export function validatorMoney (rule, value, callback) {
  if (!value) {
    return callback(new Error('金额不能为空!'))
  }
  if (Regex.regMoney.test(value) === false) {
    return callback(new Error('输入金额不合法!'))
  }
  setTimeout(() => {
    callback()
  }, 100)
}

// 校验密码
export function validatorPwd (rule, value, callback) {
  if (Regex.regPwd.test(value) === false) {
    return callback(new Error('密码为6-20位字母和数字组合!'))
  }
  setTimeout(() => {
    callback()
  }, 100)
}

// 校验用户名
export function validatorName (rule, value, callback) {
  if (Regex.regNameCN.test(value) === false && Regex.regNameEN.test(value) === false) {
    return callback(new Error('名称输入不合法'))
  }
  setTimeout(() => {
    callback()
  }, 100)
}
// 校验手机
export function validatorMobile (rule, value, callback) {
  if (Regex.regMobile.test(value) === false) {
    return callback(new Error('手机号输入有误'))
  }
  setTimeout(() => {
    callback()
  }, 100)
}
