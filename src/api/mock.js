// 采集需求计划表格
export function queryDemandPlan() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用有概率出错
      if (Math.random() > 0.1) {
        resolve({
          datas: [
            {
              jgmc: '人民医院',
              state: '1',
              cjxq: '《深圳全民健康信息平台_数据采集标准规范（医疗服务部分）试行-V3.0版》'
            }
          ]
        })
      } else {
        reject(new Error('不小心出错了！'))
      }
    }, 2000)
  })
}
