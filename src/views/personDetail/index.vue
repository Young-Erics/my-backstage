<template>
  <!-- 按人员查看详情 -->
  <com-table ref="child" :form="form" :queryApi="getPersonList">
    <template #formItem>
      <el-form-item label="姓名:" prop="pname">
        <el-input v-model.trim="form.pname" placeholder="" type="text" />
      </el-form-item>
      <el-form-item label="业务日期:" prop="stime">
        <el-date-picker v-model="form.stime" type="date" value-format="YYYY-MM-DD" placeholder="请选择日期" size="default" />
      </el-form-item>
      <el-form-item label="业务类型:" prop="busitype">
        <el-select v-model="form.busitype" placeholder="请选择业务类型">
          <el-option v-for="item in busyOptions" :key="item.busitype" :label="item.businm" :value="item.busitype" />
        </el-select>
      </el-form-item>
    </template>
    <template #tableColumn>
      <el-table-column prop="seq" label="序号" width="50" />
      <el-table-column prop="jzlsh" label="就诊流水号" width="150" />
      <el-table-column prop="deptnm" label="科室名称" width="150" />
      <el-table-column prop="pname" label="姓名" width="100" />
      <el-table-column prop="cardno" label="证件号码" width="150" />
      <el-table-column prop="busitime" label="业务时间" width="100" />
      <el-table-column prop="diagnm" label="诊断" width="100" />
      <el-table-column prop="wzxflag" label="完整性问题标志" width="120">
        <template v-slot:default="{ row }">
          <!-- <el-link type="primary" :underline="false" @click="goDetail(0, row)">{{
            row.wzxflag != null ? (row.wzxflag == '1' ? '有' : '无') : '未知'
          }}</el-link> -->
          <span>{{ row.wzxflag != null ? (row.wzxflag == '1' ? '有' : '无') : '未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hascf" label="有无处方" width="100">
        <template v-slot:default="{ row }">
          <!-- <el-link type="primary" :underline="false" @click="goDetail(1, row)">
            {{ row.hascf != null ? (row.hascf == '1' ? '有' : '无') : '未知' }}
          </el-link> -->
          <span>{{ row.hascf != null ? (row.hascf == '1' ? '有' : '无') : '未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hasjy" label="有无检验" width="100">
        <template v-slot:default="{ row }">
          <!-- <el-link type="primary" :underline="false" @click="goDetail(2, row)">
            {{ row.hasjy != null ? (row.hasjy == '1' ? '有' : '无') : '未知' }}
          </el-link> -->
          <span>{{ row.hasjy != null ? (row.hasjy == '1' ? '有' : '无') : '未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hasyz" label="有无医嘱" width="100">
        <template v-slot:default="{ row }">
          <!-- <el-link type="primary" :underline="false" @click="goDetail(3, row)">
            {{ row.hasyz != null ? (row.hasyz == '1' ? '有' : '无') : '未知' }}
          </el-link> -->
          <span>{{ row.hasyz != null ? (row.hasyz == '1' ? '有' : '无') : '未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hasjc" label="有无检查" width="100">
        <template v-slot:default="{ row }">
          <!-- <el-link type="primary" :underline="false" @click="goDetail(3, row)">
            {{ row.hasjc != null ? (row.hasjc == '1' ? '有' : '无') : '未知' }}
          </el-link> -->
          <span>{{ row.hasjc != null ? (row.hasjc == '1' ? '有' : '无') : '未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mzzybz" label="门诊住院标志" width="100" fixed="right">
        <template v-slot:default="{ row }">
          <el-link type="primary" :underline="false" @click="goDetail(row)">
            {{ row.mzzybz == 1 ? '门诊' : row.mzzybz == 2 ? '住院' : '手术' }}
          </el-link>
        </template>
      </el-table-column>
    </template>
  </com-table>
</template>

<script setup>
import { getPersonList, getBusiType } from '@/api'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const route = useRoute()
const store = useStore()
const id = store.state.business.idxcd //指标编码
// 获取业务类型
const busyOptions = reactive([])
function initBusiType() {
  getBusiType({ idxcd: id }).then(res => {
    busyOptions.push(res.data)
    console.log('busyOptions.value', busyOptions)
  })
}
initBusiType()
let month = route.query.smonth
const form = reactive({
  stime: proxy.$dayjs(month).format('YYYY-MM-DD'),
  pname: '',
  orgcd: route.query.orgcd,
  deptcd: route.query.deptcd,
  busitype: '1',
  pagesize: 20,
  page: 1
})
// console.log('form', form.stime)
const router = useRouter()
function goDetail(row) {
  // console.log('row.mzzybz', row.mzzybz, row)
  const route = {
    1: () =>
      router.push({
        name: 'outpatient',
        query: {
          // jzlsh: row.jzlsh,
          // orgcd: row.orgcd,
          // busitype: row.mzzybz,
          // pname: row.pname,
          // busitime : row.busitime
          row: JSON.stringify(row)
        }
      }),
    2: () =>
      router.push({
        name: 'inHospital',
        query: {
          row: JSON.stringify(row)
        }
      }),
    5: () =>
      router.push({
        name: 'operation',
        query: {
          row: JSON.stringify(row)
        }
      })
  }
  route[row.mzzybz] ? route[row.mzzybz]() : console.log('不存在此路由')
  // router.push({ name: 'inHospital' })
}
</script>

<style lang="scss" scoped>
:deep() {
  .el-date-editor {
    width: 200px !important;
  }
}
</style>
