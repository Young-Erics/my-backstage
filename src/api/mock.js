// 采集需求计划表格
export function queryDefaultData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用有概率出错
      if (Math.random() > 0.1) {
        resolve({
          data: {
            list: [
              {
                uname: '张三',
                date: '2022-04-03',
                address: '四川省成都市'
              },
              {
                uname: '李四',
                date: '2023-05-03',
                address: '四川省绵阳市'
              }
            ],
            total: data
          }
        })
      } else {
        reject(new Error('不小心出错了！'))
      }
    }, 2000)
  })
}
