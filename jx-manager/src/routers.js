import Router from 'vue-router'
import Login from 'views/Login'
import Home from 'views/Home.vue'
import EnterpriseQuery from 'views/01Enterprise/_11EntInfoManage/EnterpriseQuery.vue'
import EntTradeQuery from 'views/01Enterprise/_12EntBusiness/EntTradeQuery.vue'
import EntBalanceQuery from 'views/01Enterprise/_13EntBalance/EntBalanceQuery.vue'
import EntRealNameAudit from 'views/01Enterprise/_14EntRealName/EntRealNameAudit.vue'
import EntSignAudit from 'views/01Enterprise/_15EntSign/EntSignAudit.vue'
import EntRechargeOrder from 'views/01Enterprise/_16EntOrder/EntRechargeOrder.vue'
import EntSalaryList from 'views/01Enterprise/_17EntSalary/EntSalaryListQuery.vue'
import EntSalaryDetail from 'views/01Enterprise/_17EntSalary/EntSalaryDetailQuery.vue'
import JFTrade from 'views/01Enterprise/_18JFTrade/JFEntTrade'

import UserInfo from 'views/02User/_01UserInfo/UserInfo'
import BusinessRule from 'views/02User/_02BusinessRules/BusinessRules'
import UserTrade from 'views/02User/_03UserTrade/UserTradeQuery'
import UserBalance from 'views/02User/_04UserBalance/UserBalanceQuery'
import UserOrder from 'views/02User/_05UserOrder/UserOrder'

import UserManage from 'views/03System/_01UserManage/UserManage'
import RoleManage from 'views/03System/_02RoleManage/RoleManage'
import SystemLog from 'views/03System/_09SystemLog/SystemLog'
import EntMenu from 'views/03System/_04EntMenuAuthority/EntMenuAuthority'
import AdminMenu from 'views/03System/_03AdminMenuAuthority/AdminMenuAuthority'
export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    }, {
      path: '/',
      component: Home
    }, {
      path: '/',
      component: Home,
      name: '企业管理',
      iconCls: 'el-icon-message',
      children: [
        {path: '/enterprise_query', component: EnterpriseQuery, name: '企业信息查询'},
        {path: '/enterprise_trade', component: EntTradeQuery, name: '交易查询'},
        {path: '/enterprise_balance', component: EntBalanceQuery, name: '余额查询'},
        {path: '/enterprise_accreditation', component: EntRealNameAudit, name: '实名认证审核'},
        {path: '/enterprise_sign', component: EntSignAudit, name: '签名审核'},
        {path: '/enterprise_recharge', component: EntRechargeOrder, name: '充值订单'},
        {path: '/enterprise_salary', component: EntSalaryList, name: '发放批次查询'},
        {path: '/enterprise_salary_detail', component: EntSalaryDetail, name: '发放明细查询'},
        {path: '/enterprise_jf_trade', component: JFTrade, name: 'JF交易明细查询'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '用户管理',
      iconCls: 'el-icon-message',
      children: [
        {path: '/user_info', component: UserInfo, name: '用户信息查询'},
        {path: '/user_business_rule', component: BusinessRule, name: '业务规则管理'},
        {path: '/user_trade', component: UserTrade, name: '用户交易查询'},
        {path: '/user_balance', component: UserBalance, name: '用户余额查询'},
        {path: '/user_order', component: UserOrder, name: '用户订单查询'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '系统管理',
      iconCls: 'el-icon-message',
      children: [
        {path: '/system_user', component: UserManage, name: '管理员管理'},
        {path: '/system_role', component: RoleManage, name: '角色管理'},
        {path: '/system_log', component: SystemLog, name: '日志管理'},
        {path: '/system_ent_menu', component: EntMenu, name: '企业端菜单管理'},
        {path: '/system_admin_menu', component: AdminMenu, name: '管理后台菜单管理'}
      ]
    }
  ]
})
