import { createStore, createLogger } from 'vuex'
import Presistent from './plugins/persistent'
const debug = import.meta.env.VITE_APP_ENV !== 'production'
// eager: true表示直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用）
const files = import.meta.glob('./modules/*.js', { eager: true })
let modules = {}
Object.keys(files).forEach(c => {
  const module = files[c].default
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  // 以上正则表示    ^./.*/.*.vue+$
  modules[moduleName] = module
})

const presistent = Presistent({
  key: 'vuex',
  modules,
  modulesKeys: {
    local: Object.keys(modules),
    session: []
  }
})
// console.log('modules', modules)
export default createStore({
  modules: {
    ...modules
  },
  strict: debug,
  plugins: debug ? [createLogger(), presistent] : [presistent]
})
