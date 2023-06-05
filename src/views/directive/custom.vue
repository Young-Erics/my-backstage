<template>
  <div class="custom-box">
    <h1>自定义指令</h1>
    <!-- abc参数，yc修饰符，值 -->
    <p v-test:abc.yc="{ fontSize: '36px' }">directive</p>
    <h2>权限自定义指令</h2>
    <div class="btns">
      <el-button v-permisson="'artical:add'">新增</el-button>
      <el-button v-permisson="'artical:edit'">编辑</el-button>
      <el-button v-permisson="'artical:delet'">删除</el-button>
      <h2>拖拽自定义指令</h2>
      <div class="drag-box" v-move>
        <div class="header">标题</div>
        <div class="section">内容</div>
      </div>
    </div>
    <br />
    <h2>图片懒加载指令</h2>
    <img v-for="(val, index) in imageArr" :key="index" v-lazy="val" :src="val" alt="" />
  </div>
</template>
<script setup>
const vTest = {
  created() {
    console.log('=======>created')
  },
  beforeMount() {
    console.log('=======>beforeMount')
  },
  mounted(el, arg) {
    // console.log('=======>mounted', args)
    // arg中就包括了 参数，修饰符和value值
    console.log('=======>mounted', el, arg)
    el.style.fontSize = arg.value.fontSize
  }
}
/**
 *  封装一个权限指令,鉴权
 */
// mock数据
sessionStorage.setItem('userId', 'yc')
const permissionData = ['yc:artical:add', 'yc:artical:edit']
// 函数简写的形式，在 mounted 和 updated 时触发相同行为
const userId = sessionStorage.getItem('userId') || ''
const vPermisson = (el, bindings) => {
  if (!permissionData.includes(userId + ':' + bindings.value)) {
    el.style.display = 'none'
  }
}
/**
 *  拖拽指令
 */
const vMove = el => {
  const dragElement = el.firstElementChild
  const mouseDown = e => {
    // X代表 页面可视区域坐标偏移减去被拖拽盒子的左偏移，等于拖拽鼠标在盒子内的偏移
    let X = e.clientX - el.offsetLeft
    let Y = e.clientY - el.offsetTop
    const mouseMove = e => {
      el.style.left = e.clientX - X + 'px'
      el.style.top = e.clientY - Y + 'px'
    }
    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove)
    }
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }
  dragElement.addEventListener('mousedown', mouseDown)
}
/**
 *  图片懒加载
 */
// 1.glob 是懒加载模式，相当于
// let modules = {
//   'xxxx': () => import('xxxxx') //会代码分包
// }
// 2.globEager 是静态加载模式，直接加载，相当于
// import modules from 'xxxx'
let imageList = import.meta.glob('@/assets/images/*.png', { eager: true })
console.log('imageList', imageList)
let imageArr = Object.values(imageList).map(v => v.default)
let vLazy = async (el, bindings) => {
  // 默认显示的图片
  const def = await import('@/assets/images/404.png')
  el.src = def.default
  const observer = new IntersectionObserver(entry => {
    console.log('entry', entry[0])
    // intersectionRatio表示监听的dom元素占视口的比例，若大于0，则表示出现在我们视野中了
    setTimeout(() => {
      if (entry[0].intersectionRatio > 0) {
        el.src = bindings.value
        //  赋值完之后，就可以注销监听
        observer.unobserve(el)
      }
    }, 2000)
  })
  observer.observe(el) //监听dom
}
</script>

<style lang="scss" scoped>
p {
  color: red;
}
.btns {
  .el-button {
    margin: 10px;
  }
}
.drag-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 300px;
  transform: translate(-50%, -50%);
  border: 1px solid #333;
  .header {
    background-color: #ccc;
    width: 100%;
    height: 50px;
    line-height: 50px;
    cursor: move;
  }
  .section {
    width: 100%;
    height: 250px;
  }
}
</style>
