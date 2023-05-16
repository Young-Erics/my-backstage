<template>
  <!-- 14项重点指标检测 -->
  <com-table ref="child" :form="form" :queryApi="getKeyIndex">
    <template #formItem>
      <el-form-item label="行政区划名称:" prop="areacd">
        <el-select v-model="form.areacd" placeholder="请选择行政区划" @change="setOrgByArea">
          <el-option v-for="item in areacdOptions" :key="item.areacd" :label="item.areanm" :value="item.areacd" />
        </el-select>
      </el-form-item>
      <el-form-item label="月份:" prop="smonth">
        <el-date-picker v-model="form.smonth" value-format="YYYYMM" type="month" placeholder="请选择一个月份" />
      </el-form-item>
      <el-form-item label="机构名称:" prop="orgcd">
        <el-select v-model="form.orgcd" placeholder="请选择机构名称">
          <el-option v-for="item in orgcdOptions" :key="item.orgcd" :label="item.orgnm" :value="item.orgcd" />
        </el-select>
      </el-form-item>
      <el-form-item label="起始差异值:" prop="sdiff">
        <el-input v-model.number="form.sdiff" placeholder="" type="text" />
      </el-form-item>
      <el-form-item label="截止差异值:" prop="ediff">
        <el-input v-model.number="form.ediff" placeholder="" type="text" />
      </el-form-item>
    </template>
  </com-table>
</template>

<script setup>
import { getKeyIndex, getOrgByArea } from '@/api'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const store = useStore()
const areacdOptions = []
store.state.business.allArea.forEach(item => {
  areacdOptions.push(item)
})
const orgcdOptions = ref([])
// 根据行政区划获取机构
function setOrgOptions(areacd) {
  getOrgByArea({ areacd: areacd }).then(res => {
    orgcdOptions.value = res.datas
  })
}
setOrgOptions(areacdOptions[0].areacd)
// 选择区划后获取对应区划的机构
function setOrgByArea(val) {
  setOrgOptions(val)
  form.orgcd = ''
}
const form = reactive({
  areacd: areacdOptions[0].areacd,
  smonth: proxy.$dayjs().format('YYYYMM'),
  orgcd: '',
  sdiff: '',
  ediff: '',
  page: 1,
  pagesize: 20
})
// 去科室详情
// const router = useRouter()
// function goDepDetail() {
//   router.push({ name: 'depdetail' })
// }
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px !important;
  margin-right: 20px;
}
:deep() {
  .el-date-editor {
    width: 200px !important;
  }
}
</style>
