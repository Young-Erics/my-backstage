const state = () => ({
  testName: '张三',
  broName: '王五'
})
const getters = {
  son(state, getters, rootState, rootGetters) {
    return state.testName + '的儿子是张小三'
  },
  // 通过方法访问getters, 可以传参
  wife: state => wife => {
    return state.testName + '的妻子是' + wife
  }
}
const mutations = {
  handleName(state, payload) {
    state.testName = payload
  },
  changeBro(state, payload) {
    state.broName = payload.name
  }
}
const actions = {
  modify({ state, commit, rootState }, uname) {
    commit('handleName', uname)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
