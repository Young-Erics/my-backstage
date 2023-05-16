import { transformLong } from './public.js'
export default {
  install(app) {
    app.config.globalProperties.$Long = transformLong
  }
}
