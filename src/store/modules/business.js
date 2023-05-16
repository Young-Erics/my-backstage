import { getAllArea, getAuthArea } from '@/api'
const state = {
  allArea: [],
  authArea: [],
  idxcd: ''
}
const mutations = {
  setAllArea(state, result) {
    state.allArea = result
  },
  setAuthArea(state, result) {
    state.authArea = result
  },
  setID(state, result) {
    state.idxcd = result
  }
}
const actions = {
  async getAllArea(context) {
    const { datas } = await getAllArea()
    context.commit('setAllArea', datas)
  },
  async getAuthArea(context) {
    const { datas } = await getAuthArea()
    context.commit('setAuthArea', datas)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
