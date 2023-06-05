const state = () => ({
  buyNum: 0
})
const getters = {
  getMoney(state, getters, rootState, rootGetters) {
    // 在命名空间内访问全局内容
    return rootGetters['test/son'] + '购买了' + state.buyNum * 15
  }
}
const mutations = {
  addBuy(state, payload) {
    state.buyNum += payload.num
  }
}
const actions = {
  addAsync({ state, commit, dispatch, rootState }) {
    commit('addBuy', { num: 10 })
    // 全局命名空间内分发 action 或提交 mutation
    dispatch('test/modify', '李四改' + Math.random(), { root: true })
  },
  // 对象风格的提交mutations
  objCommit({ commit }) {
    commit({
      type: 'addBuy',
      // 传参载荷
      num: 15
    })
  },
  // 在带命名空间的模块注册全局 action
  globalAction: {
    root: true,
    handler(context, payload) {
      context.commit('test/handleName', payload.name, { root: true })
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
