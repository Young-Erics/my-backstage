<template>
  <div class="layout-container">
    <div class="form-card">
      <el-form :model="form" ref="elform" :inline="true" label-position="left" size="default" :label-width="labelWidth">
        <slot name="formItem">
          <el-form-item label="姓名:" prop="uname">
            <el-input v-model.trim="form.uname" placeholder="" type="text" />
          </el-form-item>
          <el-form-item label="选择器:" prop="choose">
            <el-select v-model="form.choose" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="查询日期:" prop="date">
            <el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" placeholder="请选择日期" :shortcuts="dateShortcuts" />
          </el-form-item>
          <el-form-item class="date-range-item" label="范围日期:" prop="range">
            <el-date-picker v-model="form.range" value-format="YYYY-MM-DD" type="daterange" range-separator="至" :shortcuts="dateRangeShortcuts" />
          </el-form-item>
        </slot>
        <el-button @click="queryButton" type="primary" :icon="Search">查询</el-button>
        <el-button @click="reset" style="width: 80px; margin-left: 20px"><icon-system-reset class="custom-icon" />&nbsp重置</el-button>
      </el-form>

      <slot name="rightFigure"></slot>
      <slot name="state"></slot>
    </div>
    <div class="table-card">
      <el-table :data="tableData" :border="true" header-cell-class-name="header-cell" cell-class-name="cell-class" style="width: 100%" size="small">
        <slot name="tableColumn">
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :show-overflow-tooltip="item.tooltip"
          >
          </el-table-column>
        </slot>
        <el-table-column v-if="showOperate" label="操作" width="140" fixed="right">
          <template v-slot:default="{ row }">
            <el-row justify="space-around">
              <el-link type="primary" :underline="false">查看</el-link>
              <el-link type="primary" :underline="false">编辑</el-link>
              <el-link type="primary" :underline="false">删除</el-link>
            </el-row>
          </template>
        </el-table-column>
        <template #empty>
          <icon-system-empty />
          <div>暂无数据</div>
        </template>
      </el-table>
      <el-pagination
        v-model:current-page="form.pageNum"
        v-model:page-size="form.pageSize"
        :page-sizes="[10, 20, 30]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue' //引入图标
import { queryDefaultData } from '@/api/mock.js'
import { dateShortcuts, dateRangeShortcuts } from '@/utils/constant.js'
onMounted(() => {
  let formCard = document.querySelector('.form-card')
  let tableCard = document.querySelector('.table-card')
  // console.log('formCard', formCard.offsetHeight)
  tableCard.style.height = `calc(100% - ${formCard.offsetHeight}px)`
  // 查询数据
  queryData()
})
// 定义props
const { form, queryApi } = defineProps({
  form: {
    type: Object,
    default: reactive({
      date: '',
      uname: '',
      choose: '',
      range: '',
      pageNum: 1,
      pageSize: 10
    })
  },
  queryApi: {
    type: Function,
    default: queryDefaultData
  },
  columns: {
    default: [
      {
        label: '姓名',
        prop: 'uname',
        width: '80'
      },
      {
        label: '住址',
        prop: 'address',
        tooltip: true,
        width: 'auto'
      },
      {
        label: '日期',
        prop: 'date',
        width: '100'
      }
    ]
  },
  showOperate: {
    default: true
  },
  labelWidth: {
    default: '90px'
  }
})
// watch(form, (newval, oldval) => console.log('form', newval))
const options = [
  {
    label: '西瓜',
    value: 0
  },
  {
    label: '香蕉',
    value: 1
  },
  {
    label: '苹果',
    value: 2
  }
]
// ----------查询----------
const tableData = ref([])
const total = ref(0)
const queryData = async () => {
  const { data } = await queryApi(2)
  tableData.value = data.list
  total.value = data.total
}
// 查询按钮
const queryButton = () => {
  form.pageNum = 1
  queryData()
}
defineExpose({
  queryData
})
// ----------重置按钮----------
const elform = ref(null)
const reset = () => {
  elform.value.resetFields()
  form.pageNum = 1
  form.pageSize = 10
  queryData()
}
// ----------分页逻辑----------
// 改变显示的条数
const handleSizeChange = val => {
  form.pageSize = val
  queryData()
}
// 改变页码
const handleCurrentChange = newPage => {
  form.pageNum = newPage
  queryData()
}
</script>

<style lang="scss" scoped>
.form-card {
  margin-bottom: 10px;
  padding: 15px 15px 0;
  background-color: #fff;
  .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      margin-bottom: 10px !important;
      :deep() {
        .el-form-item__label {
          font-weight: 400;
        }
        .el-form-item__content {
          width: 180px;
        }
      }
    }
    .date-range-item {
      & > :deep() {
        .el-form-item__content {
          width: 240px;
        }
      }
    }
  }
}
.table-card {
  height: calc(100% - 60px);
  background-color: #fff;
  padding: 10px 10px 0;
  .el-table {
    height: 90%;
  }
  .el-pagination {
    height: 10%;
    justify-content: center;
    align-items: center;
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
  // .el-date-editor {
  //   width: 300px !important;
  // }
  // /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  // ::-webkit-scrollbar {
  //   width: 6px; /*滚动条宽度*/
  //   height: 8px; /*滚动条高度*/
  //   background-color: white;
  // }

  // /*定义滑块 内阴影+圆角*/
  // ::-webkit-scrollbar-thumb {
  //   -webkit-box-shadow: inset 0 0 0px white;
  //   background-color: rgb(193, 193, 193); /*滚动条的背景颜色*/
  //   border-radius: 30px;
  // }
}
</style>
