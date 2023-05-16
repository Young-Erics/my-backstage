// 专门处理权限路由的模块
import Layout from '@/layout/index.vue'
import { constantRoutes } from '@/router/index.js'
const state = {
  routes: constantRoutes
}
const mutations = {
  // 定义修改routes的mutations
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 生成动态路由
  generateRoutes(context, data) {
    const modules = import.meta.glob('@/views/*/*.vue') // 引入所有的页面组件
    // console.log('modules', modules)
    const routes = []
    data.forEach(item => {
      if (item.children) {
        const childRes = []
        item.children.forEach(child => {
          // 判断三级
          if (child.children) {
            const grandsonRes = []
            child.children.forEach(grandson => {
              const grandsonMenu = {
                path: grandson.url.substr(7),
                name: grandson.url.substr(7),
                component: modules[`/src/views/${item.keyword.substr(8).toLowerCase()}${grandson.url.substr(6)}.vue`],
                meta: { title: grandson.resname, cache: true }
              }
              grandsonRes.push(grandsonMenu)
            })
            const p = {
              path: `${child.keyword.substr(8).toLowerCase()}`,
              name: `${child.keyword.substr(8).toLowerCase()}`,
              component: modules[`/src/views/${item.keyword.substr(8).toLowerCase()}/${child.keyword.substr(8).toLowerCase()}.vue`],
              meta: { title: child.resname },
              children: grandsonRes
            }
            childRes.push(p)
          } else {
            // 二级菜单
            const childMenu = {
              path: child.url.substr(7),
              name: child.url.substr(7),
              // component: () => import(`@/views${child.resContent}.vue`),
              component: modules[`/src/views/${item.keyword.substr(8).toLowerCase()}${child.url.substr(6)}.vue`],
              meta: { title: child.resname, cache: true }
            }
            childRes.push(childMenu)
          }
        })
        const parentMenu = {
          path: `/${item.keyword.substr(8).toLowerCase()}`,
          component: Layout,
          // redirect: item.resContent + '/' + childRes[0].path,
          meta: { title: item.resname },
          alwayShow: true,
          children: childRes
        }
        routes.push(parentMenu)
      } else {
        if (item.url === '/pages/homepage') {
          const homeMenu = {
            path: '/',
            component: Layout,
            redirect: `/homepage`,
            meta: { title: '' },
            children: [
              {
                path: 'homepage',
                name: 'homepage',
                component: () => import('@/views/homepage/index.vue'),
                // hideClose 是否隐藏关闭按钮，默认false
                meta: { title: '首页', hideClose: true, cache: true }
              }
            ]
          }
          routes.unshift(homeMenu)
        } else {
          const menu = {
            path: item.url.substr(6),
            component: Layout,
            meta: { title: '' },
            children: [
              {
                path: '',
                name: item.url.substr(7),
                component: modules[`/src/views${item.url.substr(6)}/index.vue`],
                meta: {
                  title: item.resname,
                  cache: true
                }
              }
            ]
          }
          routes.push(menu)
        }
      }
    })
    // routes.push({
    //   path: '/',
    //   component: Layout,
    //   redirect: `/homepage`, //${routes[0].path}/${routes[0].children[0].path}
    //   hideMenu: true,
    //   meta: { title: '首页' }
    // })
    context.commit('setRoutes', routes)
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
