<template>
  <com-table ref="child" :form="req" :queryApi="getOrgLedger">
    <template #formItem>
      <!--  -->
      <el-form-item label="行政区划:" prop="areacd">
        <el-select v-model="req.areacd" placeholder="请选择行政区划" @change="setOrgByArea">
          <el-option v-for="item in tabs" :key="item.areacd" :label="item.areanm" :value="item.areacd" />
        </el-select>
      </el-form-item>
      <el-form-item label="数据源名称:" prop="orgcd">
        <el-select v-model="req.orgcd" placeholder="">
          <el-option v-for="item in orgcdOptions" :key="item.orgcd" :label="item.orgnm" :value="item.orgcd" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期:" prop="stime">
        <el-date-picker v-model="req.stime" type="date" value-format="YYYY-MM-DD" placeholder="请选择日期" size="default" :shortcuts="shortcuts" />
      </el-form-item>
      <el-form-item label="异常标志:" prop="abnormal">
        <el-select v-model="req.abnormal" placeholder="请选择异常标志">
          <el-option v-for="item in abnormalOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </template>
    <template #state>
      <div class="state">
        <span>正常</span>
        <span>异常</span>
        <span>业务暂停</span>
      </div>
    </template>
    <template #tableColumn>
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="orgnm" label="数据源名称" :show-overflow-tooltip="true">
        <template v-slot:default="{ row }">
          <span @click="goDetail(row.orgcd, row.abnormal)">{{ row.orgnm }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tabcnt1" label="应传表单数量" width="100">
        <template v-slot:default="{ row }">
          <span @click="goDetail(row.orgcd, row.abnormal)">{{ row.tabcnt1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tancnt2" label="实传表单数量" width="100">
        <template v-slot:default="{ row }">
          <span @click="goDetail(row.orgcd, row.abnormal)">{{ row.tancnt2 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hosnum" label="医院上报数据量" width="100">
        <template v-slot:default="{ row }">
          <span @click="goDetail(row.orgcd, row.abnormal)">{{ row.hosnum }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="qzjnum" label="前置机数据量" width="100">
        <template v-slot:default="{ row }">
          <span @click="goDetail(row.orgcd, row.abnormal)">{{ row.qzjnum }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="yqznum1" label="云前置机库数据量" width="120">
        <template v-slot:default="{ row }">
          <span @click="goDetail(row.orgcd, row.abnormal)">{{ row.yqznum1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sharenum" label="共享库数据量" width="100">
        <template v-slot:default="{ row }">
          <span @click="goDetail(row.orgcd, row.abnormal)">{{ row.sharenum }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="corenum" label="中心库数据量" width="100">
        <template v-slot:default="{ row }">
          <span @click="goDetail(row.orgcd, row.abnormal)">{{ row.corenum }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="jgmc" label="机构前置机" width="300">
        <template v-slot:default="{ row }">
          <span :style="stateColor(row.state)">{{ row.jgmc }}</span>
        </template>
      </el-table-column> -->
    </template>
  </com-table>
</template>

<script setup>
// import { queryDemandPlan } from '@/api/mock.js'
import { getOrgLedger, getOrgByArea } from '@/api'
const proxy = getCurrentInstance().proxy
const store = useStore()
const shortcuts = [
  {
    text: '今天',
    value: new Date()
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
]

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
// 选择区划后获取对应区划的机构
function setOrgByArea(val) {
  setOrgOptions(val)
  req.orgcd = ''
}
// 异常标识
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
const req = reactive({
  areacd: tabs[0].areacd,
  orgcd: '',
  stime: proxy.$dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
  abnormal: '0',
  page: 1,
  pagesize: 10
})
const stateColor = state => {
  if (state == 0) {
    return {
      display: 'inline-block',
      padding: '1px 0',
      color: '#fff',
      width: '100%',
      height: '100%',
      backgroundColor: '#70b603'
    }
  } else if (state == 1) {
    // 异常
    return {
      display: 'inline-block',
      padding: '1px 0',
      color: '#fff',
      width: '100%',
      height: '100%',
      backgroundColor: '#d7001a'
    }
  } else {
    return {
      display: 'inline-block',
      padding: '1px 0',
      color: '#fff',
      width: '100%',
      height: '100%',
      backgroundColor: '#aaaaaa'
    }
  }
}
// 点击单元格去详情页
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
</script>

<style lang="scss" scoped>
.state {
  padding: 0px 10px 10px;
  text-align: left;
  span {
    font-size: 14px;
    margin-right: 15px;
    padding: 2px 10px;
    color: #fff;
  }
  & span:first-child {
    background-color: #70b603;
  }
  & span:nth-child(2) {
    background-color: red;
  }
  & span:last-child {
    background-color: #aaaaaa;
  }
}
:deep {
  .el-table--small {
    .el-table__cell {
      padding: 0 !important;
    }
    .cell {
      padding: 0 !important;
    }
  }
}
</style>
