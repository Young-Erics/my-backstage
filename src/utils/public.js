// 将当前时间转换为long型
export function transformLong(nowDate) {
  // var nowDate = new Date();
  let year = nowDate.getFullYear()
  let month = nowDate.getMonth() + 1
  let today = nowDate.getDate()
  let hours = nowDate.getHours()
  let minutes = nowDate.getMinutes()
  let seconds = nowDate.getSeconds()

  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (today >= 1 && today <= 9) {
    today = '0' + today
  }
  let currentdate = year + '-' + month + '-' + today + ' ' + hours + ':' + minutes + ':' + seconds
  let currentDateLong = new Date(currentdate.replace(new RegExp('-', 'gm'), '/')).getTime()
  return currentDateLong
}
// 转换树形数据
export function transtListToTree(list, rootValue) {
  var arr = []
  list.forEach(item => {
    // 找到之后 就要通过递归函数去找 item 下面有没有子节点
    if (item.pid === rootValue) {
      const children = transtListToTree(list, item.resid)
      // children数组大于0，说明找到了子节点，就把当前children赋值给父节点
      if (children.length) {
        item.children = children
      }
      // 只要满足if条件就要吧item加进数组
      arr.push(item)
    }
  })
  return arr
}
