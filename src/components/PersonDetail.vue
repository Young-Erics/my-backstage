<template>
  <div class="layout-container">
    <div class="form-card">
      <div class="left-info">
        <span>{{ info.pname }}</span>
        <span>业务日期: {{ proxy.$dayjs(info.busitime).format('YYYY-MM-DD') }}</span>
        <span>就诊流水号: {{ info.jzlsh }}</span>
        <span>诊断: {{ info.diagnm }}</span>
      </div>
      <div class="right-info">
        <span>有数据</span>
        <span>应传无数据</span>
        <span>非应传表单</span>
      </div>
    </div>
    <div class="chart-card">
      <div id="tree"></div>
      <div>
        <el-button type="primary" plain @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPersonDetail } from '@/api'
const { proxy } = getCurrentInstance()
const router = useRouter()
const { info, form } = defineProps({
  info: {
    type: Object
  },
  form: {
    type: Object,
    default: reactive({
      jzlsh: '',
      orgcd: '',
      busitype: ''
    })
  }
})

let tree
// 向上的数据
const topData = ref({})
const bottomData = ref({})

onMounted(() => {
  initPersonDetail()
})

function initPersonDetail() {
  let sendTime = proxy.$Long(new Date())
  let sign = proxy.$md5(form + sendTime)
  let bodyData = {
    req: form,
    sign,
    sendTime
  }
  getPersonDetail(bodyData).then(res => {
    let children = []
    res.data.childrens.forEach(item => {
      if (item.childrens != null) {
        let grandSon = []
        item.childrens.forEach(obj => {
          let son = {
            name: `${obj.tabcnm}\n(${obj.tabenm})`,
            label: {
              padding: [5, 10],
              // backgroundColor: obj.must == 0 ? '#aaaaaa' : obj.cnt == 0 ? '#d9001b' : '#70b603'
              backgroundColor: obj.must == 0 ? (obj.cnt == 0 ? '#aaaaaa' : '#70b603') : obj.cnt == 0 ? '#d9001b' : '#70b603'
            }
          }
          grandSon.push(son)
        })
        let child = {
          name: `${item.tabcnm}\n(${item.tabenm})`,
          label: {
            padding: [5, 10],
            backgroundColor: item.must == 0 ? (item.cnt == 0 ? '#aaaaaa' : '#70b603') : item.cnt == 0 ? '#d9001b' : '#70b603'
          },
          children: grandSon
        }
        children.push(child)
      } else {
        let child = {
          name: `${item.tabcnm}\n(${item.tabenm})`,
          label: {
            padding: [5, 10],
            backgroundColor: item.must == 0 ? (item.cnt == 0 ? '#aaaaaa' : '#70b603') : item.cnt == 0 ? '#d9001b' : '#70b603'
          }
        }
        children.push(child)
      }
    })
    let topChildren = children.slice(0, children.length / 2)
    let bottomChildren = children.slice(children.length / 2)
    topData.value = {
      name: `${res.data.tabcnm}\n(${res.data.tabenm})`,
      label: {
        padding: [10, 400],
        backgroundColor: res.data.must == 0 ? (res.data.cnt == 0 ? '#aaaaaa' : '#70b603') : res.data.cnt == 0 ? '#d9001b' : '#70b603'
      },
      children: topChildren
    }
    bottomData.value = {
      name: ``, //${res.data.tabcnm}\n(${res.data.tabenm})
      label: {
        padding: [10, 400],
        backgroundColor: res.data.must == 0 ? (res.data.cnt == 0 ? '#aaaaaa' : '#70b603') : res.data.cnt == 0 ? '#d9001b' : '#70b603'
      },
      children: bottomChildren
    }
    // console.log('children', children, topData.value)
    initTree()
  })
}
function initTree() {
  // Echarts在第二次路由跳转的时候不显示，但是刷新可以显示的问题
  // 只需要在每次进入的时候清一下该标签标签绑定的echarts属性
  document.getElementById('tree').setAttribute('_echarts_instance_', '')
  if (tree != null && tree != '' && tree != undefined) {
    tree.dispose() //解决echarts dom已经加载的报错
  }
  tree = proxy.$echarts.init(document.getElementById('tree'))

  let label = {
    position: 'inside',
    verticalAlign: 'middle',
    backgroundColor: '#70b603',
    color: '#fff',
    padding: [5, 10], //标签文字内边距
    fontSize: 12,
    borderWidth: 1,
    // borderColor: '#0070d9',
    fontWeight: 'normal'
  }
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}'
    },
    series: [
      {
        type: 'tree',
        edgeShape: 'curve', //链接线是折现还是曲线
        edgeForkPosition: '1%',
        orient: 'TB', //向下
        data: [bottomData.value],
        width: '100%',
        // height:200,
        top: '50%',
        bottom: '15%',
        left: 'center',
        symbolSize: 2,
        symbolOffset: [0, 0],
        initialTreeDepth: 10,
        itemStyle: {
          borderCap: 'round',
          borderType: 'dashed'
        },
        label: label,
        lineStyle: {
          color: '#333',
          width: 1
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      },
      {
        type: 'tree',
        edgeShape: 'curve', //链接线是折现还是曲线
        edgeForkPosition: '1%',
        orient: 'BT', //向上
        top: '15%',
        bottom: '50%',
        left: 'center',
        data: [topData.value],
        width: '100%',
        // height:200,
        symbolSize: 2,
        symbolOffset: [0, 0],
        initialTreeDepth: 10,
        itemStyle: {
          borderCap: 'round',
          borderType: 'dashed'
        },
        label: label,
        lineStyle: {
          color: '#333',
          width: 1
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  }
  tree && tree.setOption(option)
  //
  // const eleArr = Array.from(new Set(tree._chartsViews[0]._data._graphicEls))
  // const itemHeight = 50
  // const currentHeight = itemHeight * (eleArr.length - 1) || itemHeight
  // const newHeight = Math.max(currentHeight, itemHeight)
  // chartWidth = newHeight
  // tree.resize({
  //   width: newHeight
  // })
  // document.querySelector('.chart-card').scrollLeft = newHeight / 2 - 900

  window.onresize = function () {
    tree.resize()
  }
}
// 返回按钮
function back() {
  router.back()
}
</script>
<style lang="scss" scoped>
.form-card {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 14px;
    margin-right: 30px;
  }
  .left-info {
    padding-left: 20px;
  }
  .right-info {
    span {
      color: #fff;
      padding: 3px 15px;
    }
    & span:first-child {
      background-color: #70b603;
    }
    & span:nth-child(2) {
      background-color: #d7001a;
    }
    & span:nth-child(3) {
      background-color: #aaaaaa;
    }
    & span:last-child {
      color: #fff;
    }
  }
}
.chart-card {
  height: calc(100% - 40px);
  background-color: #fff;
  padding: 10px 10px 0;
  overflow-x: auto;
  overflow-y: hidden;
  #tree {
    height: 90%;
  }
  div:last-child {
    height: 10%;
    .el-button {
      width: 6em;
    }
  }
}
</style>
