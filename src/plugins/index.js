import * as echarts from 'echarts'
import _ from 'lodash'
import dayjs from 'dayjs'
// 引入md5加密
import md5 from 'js-md5'
export default {
  install(app) {
    app.config.globalProperties.$echarts = echarts
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$md5 = md5
    app.config.globalProperties.$lodash = _
  }
}
