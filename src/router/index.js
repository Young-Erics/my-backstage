import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// 引入modules
import HomePage from './modules/homepage'
import Pages from './modules/pages'
import System from './modules/system'
import detail from './modules/detail'
export const constantRoutes = [...HomePage, ...Pages, ...System, ...detail] //静态
// export const constantRoutes = [...System, ...detail] //动态
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: constantRoutes
})
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由，解决登录到期后回退依然可以访问之前路由的问题
export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
  })
  router.matcher = newRouter.matcher
}
export default router
