import Layout from '@/layout/index.vue'
// import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/',
    component: Layout,
    redirect: '/homepage',
    meta: { title: '', icon: 'icon-ep-menu' },
    children: [
      {
        path: 'homepage',
        name: 'homepage',
        component: () => import('@/views/homepage/index.vue'),
        // hideClose 是否隐藏关闭按钮，默认false
        meta: { title: '首页', icon: 'icon-ep-menu', hideClose: true, cache: true }
      }
    ]
  }
]

export default route
