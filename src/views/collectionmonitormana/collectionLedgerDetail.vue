<template>
  <!-- 采集台账 -->
  <com-table ref="child" :queryApi="getDetailLedger" :form="form">
    <template #tableColumn>
      <el-table-column prop="seq" label="序号" width="50" />
      <el-table-column prop="tabcnm" label="表中文名称" width="200" />
      <el-table-column prop="tabenm" label="表英文名称" :show-overflow-tooltip="true" />
      <el-table-column prop="hosnum" label="医院上报数据量" width="120" />
      <el-table-column prop="qzjnum" label="前置机数据量" width="100" />
      <el-table-column prop="yqznum1" label="云前置机数据量1" width="120" />
      <el-table-column prop="yqznum2" label="云前置机数据量2" width="120" />
      <el-table-column prop="corenum" label="中心库数据量" width="100" />
      <el-table-column prop="sharenum" label="共享库数据量" width="100" />
      <el-table-column prop="abnormal" label="异常标志" width="70">
        <template v-slot:default="{ row }">
          <span :class="{ abnormal: row.abnormal == '异常' }">{{ row.abnormal }}</span>
        </template>
      </el-table-column>
    </template>
  </com-table>
</template>

<script setup>
import { getDetailLedger } from '@/api/index.js'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const route = useRoute()
// console.log('route', route.query)
const form = reactive({
  orgcd: route.query.orgcd, //
  stime: route.query.stime,
  abnormal: route.query.abnormal, //route.query.abnormal
  page: 1,
  pagesize: 10
})
</script>

<style lang="scss" scoped></style>
