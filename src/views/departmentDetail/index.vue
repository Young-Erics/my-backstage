<template>
  <!-- 按科室查看详情 -->
  <com-table ref="child" :form="form" :queryApi="checkDepDetail" queryName="checkDep">
    <template #formItem>
      <el-form-item label="科室名称:" prop="detpnm">
        <el-input v-model.trim="form.detpnm" placeholder="" type="text" />
      </el-form-item>
      <el-form-item label="月份:" prop="smonth">
        <el-date-picker v-model="form.smonth" value-format="YYYYMM" type="month" placeholder="请选择一个月份" />
      </el-form-item>
    </template>
    <template #tableColumn> </template>
  </com-table>
</template>

<script setup>
import { checkDepDetail } from '@/api/index.js'
const route = useRoute()
const form = reactive({
  areacd: route.query.areacd,
  detpnm: '',
  orgcd: route.query.orgcd,
  idxcd: route.query.idxcd, //
  smonth: route.query.smonth, //proxy.$dayjs().format('YYYYMM')
  pagesize: 20,
  page: 1
})
const store = useStore()
store.commit('business/setID', form.idxcd)
// const router = useRouter()
// function goPersonDetail() {
//   router.push({ name: 'perdetail' })
// }
</script>

<style lang="scss" scoped></style>
