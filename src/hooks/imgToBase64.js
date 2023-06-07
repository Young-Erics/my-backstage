import { onMounted } from 'vue'
export default function imgToBase64(options) {
  return new Promise(resolve => {
    onMounted(() => {
      let el = document.querySelector(options.el)
      el.onload = () => {
        resolve({
          baseUrl: toBase64(el)
        })
      }
    })
    const toBase64 = el => {
      // 创建canvas
      let canvas = document.createElement('canvas')
      // 获取 2D 绘图上下文; 3d：webgl 。
      // ctx对象就是 JavaScript 操作 Canvas 的接口
      const ctx = canvas.getContext('2d')
      canvas.width = el.width
      canvas.height = el.height
      // 图像源；x,y坐标位置；图像源的 宽高；
      ctx.drawImage(el, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/png')
    }
  })
}
