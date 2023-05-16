import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import components from '@/components/index.js'
import commonJS from '@/utils'
import plugins from '@/plugins'
import './assets/style/index.scss' // 公共css
const app = createApp(App)
// import '@/permission.js'
app.use(components) //注册所有的公共组件
app.use(plugins)
app.use(commonJS)
app.use(store)
app.use(router)
app.mount('#app')
