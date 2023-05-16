import { loginsso, getMenu } from '@/api/user.js'
import { resetRouter } from '@/router/index.js'
import { transtListToTree } from '@/utils/public.js'
const state = () => ({
  code: '',
  userInfo: {}
})
const mutations = {
  setCode(state, code) {
    state.code = code
  },
  setUserInfo(state, result) {
    state.userInfo = result
  },
  removeUseInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    // 调用登录，获取状态码
    const { code } = await loginsso(data)
    context.commit('setCode', code)
    return code
  },
  // 获取系统菜单
  async getSysmenu(context) {
    const { data } = await getMenu()
    context.commit('setUserInfo', data.user)
    // let arr = data.resourceList.map(item => {
    //   return {
    //     resname: item.resname,
    //     url: item.url ? item.url : 'a'
    //   }
    // })
    // let a = arr.slice(3)
    // context.commit('setMenuUrl', a)
    let treeResult = transtListToTree(data.resourceList.slice(1), data.resourceList[0].resid)
    console.log('login里面', treeResult)
    return treeResult
  },
  // 登录过期退出时候
  logout(context) {
    // 删除用户资料
    context.commit('removeUseInfo')
    // 重置路由
    resetRouter()
    // 去设置权限模块下路由为初始状态
    context.commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
