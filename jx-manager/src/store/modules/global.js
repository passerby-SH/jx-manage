import * as Api from 'api'
import * as vuexTypes from '../types'

const state = {
  provinces: []
}
const mutations = {
  [vuexTypes.SAVE_PROVINCE]: (state, obj) => {
    state.provinces = obj.provinces
  }
}
const actions = {
  getProvinces({commit}) {
    Api.getProvinces({}).then(response => {
      if (response.data.code === Api.ERR_OK) {
        commit(vuexTypes.SAVE_PROVINCE, {provinces: response.data.data})
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
