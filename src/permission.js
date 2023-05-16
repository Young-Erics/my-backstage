// 权限拦截在路由跳转  导航守卫
import Layout from '@/layout/index.vue'
import router from '@/router'
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
import store from '@/store'
let flag = true
function changeTitle(name) {
  document.title = `${name}-全链路监控系统`
}
router.beforeEach(async (to, from, next) => {
  // console.log('to.meta', to.meta)
  nprogress.start()
  to.meta.title ? changeTitle(to.meta.title) : ''
  // let userid = store.state.loginsso.userInfo?.userid
  // console.log('userid', userid)
  // 如果没有id才表示当前用户资料没有获取过
  if (flag) {
    let searchURL = window.location.search //tgt=ycccc
    let targetTgt = searchURL.split('=')[1] //ycccc
    console.log('targetTgt', targetTgt)
    if (targetTgt) {
      const code = await store.dispatch('loginsso/login', { tgt: targetTgt })
      if (code != '0') {
        // ElMessageBox({
        //   title: '登录过期',
        //   message: '您的登录已过期，请重新登录',
        //   confirmButtonText: '确定',
        //   type: 'error',
        //   center: true,
        //   showClose: false,
        //   closeOnClickModal: false
        // })
        store.dispatch('loginsso/logout')
        let fullPath = window.location.href.split('?')[0]
        window.location.href = `/sso/login?service=${fullPath}`
      } else {
        // 获取菜单
        const menu = await store.dispatch('loginsso/getSysmenu')
        store.dispatch('business/getAllArea')
        const routes = await store.dispatch('permission/generateRoutes', menu)
        // 404路由加到最后面
        routes.push({
          // 找不到路由重定向到404页面
          path: '/:pathMatch(.*)',
          // path: '*', // vue2的写法
          component: Layout,
          redirect: '/404',
          hideMenu: true
        })
        // 新版VueRouter废除了addRoutes();//添加的数组
        // 改为addRoute(RouteRecordRaw);//添加的为对象
        routes.forEach(item => {
          router.addRoute(item)
        })
        console.log('可用路由', routes)
        flag = false
        next({ ...to, replace: true }) // 这里相当于push到一个页面 不在进入路由拦截
      }
    } else {
      // await ElMessageBox({
      //   title: '登录过期',
      //   message: '您的登录已过期，请重新登录',
      //   confirmButtonText: '确定',
      //   type: 'error',
      //   center: true,
      //   showClose: false,
      //   closeOnClickModal: false
      // })
      let fullPath = window.location.href.split('?')[0]
      store.dispatch('loginsso/logout')
      window.location.href = `/sso/login?service=${fullPath}`
    }
    //
  } else {
    next()
  }
  nprogress.done()
})
// 后置守卫
router.afterEach((to, from) => {
  const keepAliveComponentsName = store.getters['keepAlive/keepAliveComponentsName'] || []
  // matched是个数组，包含当前匹配的路径中的路由配置参数对象，取matched数组的最后一个对象，拿到路由的name
  // console.log('to.matched', to.matched)
  // const name = to.matched[to.matched.length - 1].components.default.name
  const name = to.matched[to.matched.length - 1].name
  if (to?.meta?.cache && name && !keepAliveComponentsName.includes(name)) {
    store.commit('keepAlive/addKeepAliveComponentsName', name)
  }
  nprogress.done()
})
