<template>
  <div class="layout-container">
    <div class="form-card">
      <el-form :model="form" :rules="rules" ref="elform" :inline="true" label-position="left">
        <slot name="formItem">
          <el-form-item label="查询日期:" prop="stime">
            <el-date-picker v-model="form.stime" type="date" value-format="YYYY-MM-DD" placeholder="请选择日期" size="default" />
          </el-form-item>
        </slot>
        <el-button type="primary" :icon="Search" @click="queryButton(queryName)">查询</el-button>
        <el-button @click="reset" style="width: 80px"><icon-system-reset class="custom-icon" />&nbsp重置</el-button>
      </el-form>
      <slot name="rightFigure"></slot>
      <slot name="state"></slot>
    </div>
    <div class="table-card">
      <el-table :data="tableData" :border="true" header-cell-class-name="header-cell" cell-class-name="cell-class" style="width: 100%" size="small">
        <slot name="tableColumn">
          <template v-if="queryName == 'default'">
            <el-table-column label="序号" prop="seq" width="50" />
            <el-table-column prop="areanm" label="行政区名称" :show-overflow-tooltip="true" width="100" />
            <el-table-column prop="orgnm" label="机构名称" :show-overflow-tooltip="true" width="150" />
            <el-table-column v-for="(item, index) in tableHead" :key="index" :label="item.colnm">
              <el-table-column v-for="(child, ind) in item.childs" :key="ind" :prop="child.colcd" :label="child.colnm">
                <template v-slot:default="{ row }">
                  <el-link v-if="child.isjump == 1" type="primary" :underline="false" @click="goDepDetail(child.colcd, row.areacd, row.orgcd)">{{
                    row[child.colcd]
                  }}</el-link>
                  <span v-else>{{ row[child.colcd] }}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-for="(item, index) in tableHead" :key="index" :label="item.colnm" :prop="item.colcd">
              <template v-slot:default="{ row }">
                <el-link v-if="item.isjump == 1" type="primary" :underline="false" @click="goPerDetail(row.orgcd, row.deptcd)">{{
                  row[item.colcd]
                }}</el-link>
                <span v-else>{{ row[item.colcd] }}</span>
              </template>
            </el-table-column>
          </template>
          <!-- <my-table v-for="(item, index) in tableHead" :key="index" :col="item"> </my-table> -->
        </slot>
        <!-- table数据为空的插槽 -->
        <template #empty>
          <icon-system-empty />
          <div>暂无数据</div>
        </template>
      </el-table>
      <el-pagination
        v-model:current-page="form.page"
        v-model:page-size="form.pagesize"
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
const proxy = getCurrentInstance()?.proxy
onMounted(() => {
  let formCard = document.querySelector('.form-card')
  let tableCard = document.querySelector('.table-card')
  // console.log('formCard', formCard.offsetHeight)
  tableCard.style.height = `calc(100% - ${formCard.offsetHeight}px)`
  // 查询数据
  queryData(queryName)
})
// 定义props
const { form, queryName, queryApi } = defineProps({
  form: {
    type: Object,
    default: reactive({
      jgmc: '',
      sjfw: '',
      pagesize: 20,
      page: 1
    })
  },
  queryName: {
    type: String,
    default: 'default'
  },
  queryApi: {
    type: Function
  }
})
// watch(form, (newval, oldval) => console.log('form', newval))
// ----------查询----------
// 表格数据
const tableData = ref([
  // {
  //   jgmc: '中心医院',
  //   bmc: '123',
  //   jgztjs: '3334',
  //   cyl: '2%',
  //   pttjs: '44',
  //   cyl2: '3%',
  //   cybfb: '25%'
  // },
  // {
  //   jgmc: '中心医院',
  //   bmc: '123',
  //   jgztjs: '3334',
  //   cyl: '2%',
  //   pttjs: '44',
  //   cyl2: '3%',
  //   cybfb: '25%'
  // }
])
const total = ref(0)
const abnormalOptions = [
  {
    label: '全部',
    value: '0'
  },
  {
    label: '正常',
    value: '1'
  },
  {
    label: '异常',
    value: '2'
  }
]
// 表单校验
const rules = reactive({
  sdiff: [
    {
      min: 0,
      max: 100,
      type: 'number',
      message: '必须是0-100之间的数字',
      trigger: 'change'
    }
  ],
  ediff: [
    {
      min: 0,
      max: 100,
      type: 'number',
      message: '必须是0-100之间的数字',
      trigger: 'change'
    }
  ]
})
const tableHead = ref([])
const queryData = async queryName => {
  await elform._value.validate(async (valid, fields) => {
    if (valid) {
      let sendTime = proxy.$Long(new Date())
      let sign = proxy.$md5(form + sendTime)
      let bodyData = {
        req: form,
        sign,
        sendTime
      }
      const { datas, totalcnt, tabheads } = await queryApi(bodyData)
      if (tabheads && tabheads.length > 0 && queryName == 'checkDep') {
        tableHead.value = tabheads
      } else if (tabheads && tabheads.length > 0 && queryName == 'default') {
        tableHead.value = tabheads.filter(item => {
          return item.childs && item.childs.length > 0
        })
      }
      datas.forEach(item => {
        if (item.abnormal != null) {
          const abnormalRes = abnormalOptions.find(obj => obj.value == item.abnormal)
          abnormalRes ? (item.abnormal = abnormalRes.label) : (item.abnormal = '未知')
        }
        item.busitime != null ? (item.busitime = proxy.$dayjs(item.busitime).format('YYYY-MM-DD')) : (item.busitime = item.busitime)
      })
      total.value = parseInt(totalcnt)
      tableData.value = datas
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 查询按钮
const queryButton = queryName => {
  form.page = 1
  queryData(queryName)
}
defineExpose({
  queryData
  // tableHead
})
// 去科室详情
const router = useRouter()
function goDepDetail(idxcd, areacd, orgcd) {
  router.push({
    name: 'depdetail',
    query: {
      idxcd: idxcd,
      areacd: areacd,
      orgcd: orgcd,
      smonth: form.smonth
    }
  })
}
// 去人员列表
function goPerDetail(orgcd, deptcd) {
  router.push({
    name: 'perdetail',
    query: {
      orgcd: orgcd,
      deptcd: deptcd,
      smonth: form.smonth
    }
  })
}
// ----------重置按钮----------
const elform = ref(null)
const reset = () => {
  elform._value.resetFields()
  form.page = 1
  form.pagesize = 20
  queryData(queryName)
}
// ----------分页逻辑----------
// 改变显示的条数
const handleSizeChange = val => {
  form.pagesize = val
  queryData(queryName)
}
// 改变页码
const handleCurrentChange = newPage => {
  form.page = newPage
  queryData(queryName)
}
</script>

<style lang="scss" scoped>
.form-card {
  margin-bottom: 10px;
  padding: 10px 10px 0px;
  background-color: #fff;
  .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      margin-bottom: 10px !important;
      margin-right: 20px;
      :deep(.el-form-item__label) {
        font-weight: 400;
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
  .el-date-editor {
    width: 300px !important;
  }
  .abnormal {
    color: red;
  }
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
