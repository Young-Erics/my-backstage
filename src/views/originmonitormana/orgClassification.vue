<template>
  <!-- 来源机构分类 -->
  <div class="page-container">
    <div class="card">
      <div class="header">
        <div class="header-left">
          <div class="notice">
            <icon-home-notice class="custom-icon" />
          </div>
          <span>日历</span>
        </div>
      </div>
      <div class="body">
        <el-empty description="暂无数据" />
      </div>
    </div>
    <div class="card">
      <div class="header">
        <div class="header-left">
          <div class="notice">
            <icon-home-statistic class="custom-icon" />
          </div>
          <span>近一年异常机构趋势</span>
        </div>
      </div>
      <div class="body">
        <div id="lineChart"></div>
        <!-- <el-empty description="暂无数据" /> -->
      </div>
    </div>
    <div class="card">
      <div class="header">
        <div class="header-left">
          <div class="notice">
            <icon-home-statistic class="custom-icon" />
          </div>
          <span>异常机构数各类别占比</span>
        </div>
      </div>
      <div class="body">
        <div id="pie"></div>
        <!-- <el-empty description="暂无数据" /> -->
      </div>
    </div>
    <div class="card">
      <div class="header">
        <div class="header-left">
          <div class="notice">
            <icon-home-statistic class="custom-icon" />
          </div>
          <span>机构异常天数累计排名(前10名)</span>
        </div>
      </div>
      <div class="body">
        <el-table :data="tableData" :border="true" header-cell-class-name="header-cell" cell-class-name="cell-class" style="width: 100%" size="small">
          <el-table-column prop="" label="序号" type="index" width="100" />
          <el-table-column prop="jgmc" label="机构名称" :show-overflow-tooltip="true" />
          <el-table-column prop="ycts" label="异常天数(累计)" :show-overflow-tooltip="true" width="150" />
          <!-- table数据为空的插槽 -->
          <template #empty>
            <icon-system-empty />
            <div>暂无数据</div>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()
// 折线图
let lineChart
function initLineChart() {
  if (lineChart != null && lineChart != '' && lineChart != undefined) {
    lineChart.dispose() //解决echarts dom已经加载的报错
  }
  lineChart = proxy.$echarts.init(document.getElementById('lineChart'))
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      top: 20
    },
    xAxis: {
      type: 'category',
      boundaryGap: false, // 对齐刻度
      data: ['2022年2月', '2022年3月', '2022年4月', '2022年5月', '2022年6月', '2022年7月', '2022年8月'],
      axisLabel: {
        interval: 0, //横轴信息全部显示
        rotate: 60 //60度角倾斜显示
        // formatter: function (val) {
        //   return val.split('').join('\n')
        // } //横轴信息文字竖直显示
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        data: [43, 28, 29, 46, 79, 80, 65],
        type: 'line',
        smooth: true,
        itemStyle: {
          label: {
            show: true // 在折线拐点上显示数据
          }
          // lineStyle: {
          //   width: 3 // 设置虚线宽度
          // }
        }
      }
    ]
  }
  lineChart.setOption(option)
  window.onresize = function () {
    lineChart.resize()
  }
}
// 饼图
let pieChart
function initPieChart() {
  if (pieChart != null && pieChart != '' && pieChart != undefined) {
    pieChart.dispose() //解决echarts dom已经加载的报错
  }
  pieChart = proxy.$echarts.init(document.getElementById('pie'))
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: 5,
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: '60%', //饼图的半径
        height: 300,
        top: -50,
        // minAngle: 15, //最小角度
        // startAngle: 270, //起始角度
        data: [
          { value: 1048, name: '医院' },
          { value: 735, name: '杜康服务中心' },
          { value: 580, name: '民营诊所、门诊部' },
          { value: 484, name: '公卫机构' }
        ],
        label: {
          show: true,
          // alignTo: 'edge', // 延迟线条
          formatter: '{b}:\n({d}%)',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: '#999'
            }
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  pieChart.setOption(option)
  window.onresize = function () {
    pieChart.resize()
  }
}
onMounted(() => {
  initLineChart()
  initPieChart()
})
// 表格数据
const tableData = ref([
  {
    jgmc: '第一人民医院',
    ycts: '222'
  },
  {
    jgmc: '第一人民医院',
    ycts: '222'
  },
  {
    jgmc: '第一人民医院',
    ycts: '222'
  },
  {
    jgmc: '第一人民医院',
    ycts: '222'
  },
  {
    jgmc: '第一人民医院',
    ycts: '222'
  },
  {
    jgmc: '第一人民医院',
    ycts: '222'
  },
  {
    jgmc: '第一人民医院',
    ycts: '222'
  },
  {
    jgmc: '第一人民医院',
    ycts: '222'
  },
  {
    jgmc: '第一人民医院',
    ycts: '222'
  },
  {
    jgmc: '第一人民医院',
    ycts: '222'
  }
])
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px 0;
  .card {
    width: 45%;
    margin-bottom: 20px;
    .header {
      display: flex;
      justify-content: space-between;
      height: 38px;
      line-height: 38px;
      // border-bottom: 1px solid #f0f0f0;
      .header-left {
        position: relative;
        display: flex;
        & ::before {
          content: '';
          display: inline-block;
          height: 30px;
          width: 3px;
          background-color: #1890ff;
          margin-right: 5px;
          position: absolute;
          left: 0;
          top: 3px;
        }
        .notice {
          vertical-align: middle;
          margin: 0 10px 0 15px;
        }
      }
      .header-right {
        color: #6ea3ff;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .body {
      min-height: 200px;
      #lineChart,
      #pie {
        width: 100%;
        height: 250px;
        border: 1px solid #f0f0f0;
      }
      .el-empty {
        padding: 0;
      }
    }
  }
}
:deep() {
  // 表格表头样式
  .header-cell {
    background-color: #1e90ff !important;
    color: #fff !important;
    text-align: center;
  }
  // 所有单元格文字居中
  .cell-class {
    text-align: center;
  }
  .el-table__empty-text {
    line-height: 40px;
    margin-top: 20px;
    & > div {
      font-size: 18px;
    }
  }
}
.el-table {
  height: 250px;
}
</style>
