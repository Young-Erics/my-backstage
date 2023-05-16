<template>
  <div class="page-container">
    <div class="form-card">
      <el-form :model="req" ref="elform" :inline="true" label-position="left">
        <!-- <el-form-item label="行政区划编码:" prop="areacd">
            <el-select v-model="req.areacd" placeholder="请选择行政区划编码">
              <el-option v-for="item in areacdOptions" :key="item.areacd" :label="item.areacd" :value="item.areacd" />
            </el-select>
          </el-form-item> -->
        <el-form-item label="机构名称:" prop="orgcd">
          <!-- <el-input v-model.trim="req.orgcd" placeholder="" type="text" /> -->
          <el-select v-model="req.orgcd" placeholder="请选择机构名称">
            <el-option v-for="item in orgcdOptions" :key="item.orgcd" :label="item.orgnm" :value="item.orgcd" />
          </el-select>
        </el-form-item>
        <el-form-item label="查询日期:" prop="stime">
          <el-date-picker v-model="req.stime" type="date" value-format="YYYY-MM-DD" placeholder="请选择日期" size="default" />
        </el-form-item>
        <el-form-item label="异常标志:" prop="abnormal">
          <el-select v-model="req.abnormal" placeholder="请选择异常标志">
            <el-option v-for="item in abnormalOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-button type="primary" :icon="Search" @click="queryData">查询</el-button>
        <el-button style="width: 80px" @click="reset"><icon-system-reset class="custom-icon" />&nbsp重置</el-button>
      </el-form>
    </div>
    <el-tabs class="system-scrollbar" type="border-card" v-model="req.areacd" @tab-click="tabClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.areanm" :name="item.areacd">
        <!-- v-for="(child, ind) in item.children" :key="ind" -->
        <div class="box-card" v-if="showCard">
          <div v-for="(child, ind) in paneData" :key="ind" @click="goDetail(child.orgcd, child.abnormal)">
            <el-card :class="{ abnormal: child.abnormal == 2 }">
              <template #header>
                <div class="card-header">
                  <span>{{ child.orgnm }}</span>
                </div>
              </template>
              <div class="text item">应传表单数：{{ child.tabcnt1 }}</div>
              <div class="text item">实传表单数：{{ child.tancnt2 }}</div>
              <div class="text item">医院上报数据量：{{ child.hosnum }}</div>
              <div class="text item">前置机数据量：{{ child.qzjnum }}</div>
              <div class="text item">云前置机库数据量：{{ child.yqznum1 }}</div>
              <div class="text item">中心库数据量：{{ child.corenum }}</div>
              <div class="text item">共享库数据量：{{ child.sharenum }}</div>
            </el-card>
          </div>
        </div>
        <!-- <icon-system-empty />
            <div>暂无数据</div> -->
        <el-empty description="暂无数据" v-else />
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      v-model:current-page="req.page"
      v-model:page-size="req.pagesize"
      :page-sizes="[10, 20, 30]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue' //引入图标
import { getOrgLedger, getOrgByArea } from '@/api'
import { getCurrentInstance } from 'vue'
const proxy = getCurrentInstance().proxy
const store = useStore()
const router = useRouter()
onMounted(() => {
  let formCard = document.querySelector('.form-card')
  let elTabs = document.querySelector('.el-tabs')
  let pagination = document.querySelector('.el-pagination')
  // console.log('formCard', formCard.offsetHeight)
  elTabs.style.height = `calc(100% - ${formCard.offsetHeight}px - ${pagination.offsetHeight}px)`
})
// 生成行政区划tab
const tabs = []
store.state.business.allArea.forEach(item => {
  tabs.push(item)
})
// 生成机构名称选项
const orgcdOptions = ref([])
// 根据行政区划获取机构
function setOrgOptions(areacd) {
  getOrgByArea({ areacd: areacd }).then(res => {
    orgcdOptions.value = res.datas
  })
}
setOrgOptions(tabs[0].areacd)
const abnormalOptions = ref([
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
])
// 请求参数
const req = reactive({
  areacd: tabs[0].areacd,
  orgcd: '',
  stime: proxy.$dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
  abnormal: '0',
  page: 1,
  pagesize: 10
})
const total = ref(0)
// 点击tab选项事件方法
const tabClick = (pane, ev) => {
  // console.log('pane', pane.props.name)
  req.areacd = pane.props.name
  setOrgOptions(pane.props.name)
  queryData()
}
// const req = reactive({
//   orgcd: '455755442',
//   stime: '2023-02-01',
//   deptcd: '23',
//   busitype: '5',
//   pname: '',
//   page: 1,
//   pagesize: 10
// })
// 选项pane下的数据
const paneData = ref([])
const showCard = ref(true) //控制是否显示card
async function queryData() {
  let sendTime = proxy.$Long(new Date())
  let sign = proxy.$md5(req + sendTime)
  let bodyData = {
    req,
    sign,
    sendTime
  }
  try {
    const { datas, totalcnt } = await getOrgLedger(bodyData)
    // let a = []
    // a.push(...datas, ...datas, ...datas, ...datas)
    paneData.value = datas
    total.value = totalcnt
    if (datas.length > 0) {
      showCard.value = true
    } else {
      showCard.value = false
    }
  } catch {
    paneData.value = []
    showCard.value = false
  }
  // console.log('paneData.value', paneData.value)
}
// ----------重置按钮----------
const elform = ref(null)
function reset() {
  elform._value.resetFields()
  req.page = 1
  req.pagesize = 10
  req.abnormal = '0'
  queryData()
}
// 点击card去详情页
function goDetail(orgcd, abnormal) {
  router.push({
    name: 'collectionLedgerDetail',
    query: {
      orgcd,
      abnormal,
      stime: req.stime
    }
  })
}
// ----------分页逻辑----------
// 改变显示的条数
const handleSizeChange = val => {
  req.pagesize = val
  queryData()
}
// 改变页码
const handleCurrentChange = newPage => {
  req.page = newPage
  queryData()
}
queryData()
</script>

<style lang="scss" scoped>
.page-container {
  padding: 10px 20px;
  height: calc(100vh - 130px);
  .el-pagination {
    height: 10%;
    justify-content: center;
    align-items: center;
  }
}
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
.el-tabs {
  overflow-y: auto;
  .el-tab-pane {
    width: 100%;
    .box-card {
      display: flex;
      flex-wrap: wrap;
      & > div {
        width: 25%;
        padding: 10px;
      }
    }
    .el-empty {
      padding: 0;
    }
  }
}
// card背景色
.el-card {
  background-color: #70b603;
  color: #fff;
  text-align: left;
  cursor: pointer;
  :deep(.el-card__header) {
    text-align: center;
  }
}
.abnormal {
  background-color: red;
}
</style>
