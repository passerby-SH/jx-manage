import storage from './storage'
import * as vueTypes from './types'
import store from './index'

const getters = {
  token: state => state.user.token,
  entId: state => state.user.entId,
  user: state => {
    if (JSON.stringify(state.user.user) === '{}') {
      let u = JSON.parse(storage.getItem('user'))
      if (u !== null && u !== undefined) {
        store.commit(vueTypes.SAVE_USER, {user: u})
      }
    }
    return state.user.user
  },
  provinces: state => {
    let provinces = state.global.provinces
    if (provinces.length < 1) {
      store.dispatch('getProvinces')
    }
    return state.global.provinces
  },
  get_btns: state => {
    if (state.menu.btns.length < 1) {
      store.dispatch('getBtn')
    }
    return state.menu.btns
  },
  getBtnIsShowByName: function(state) {
    return function (btnName) {
      let btns = state.menu.btns
      return btns.indexOf(btnName) !== -1
    }
  }
}

export default getters
