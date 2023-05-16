<template>
  <!-- 共享记录 -->
  <com-table ref="child" :form="form">
    <template #formItem>
      <el-form-item label="证件号码:" prop="form">
        <el-input v-model.trim="form.form" placeholder="" type="text" />
      </el-form-item>
    </template>
    <template #tableColumn>
      <el-table-column prop="jyjls" label="诊断科室名称" width="150" />
      <el-table-column prop="bzwm" label="姓名" width="100" />
      <el-table-column prop="bzwm" label="证件号码" width="200" />
      <el-table-column prop="bzwm" label="就诊日期" width="150" />
      <el-table-column prop="bzwm" label="入院诊断" :show-overflow-tooltip="true" />
      <el-table-column prop="bzwm" label="诊断流水号" width="150" />
      <el-table-column prop="bzwm" label="共享日期" width="150" />
      <el-table-column prop="bzwm" label="数据源所属机构编码" width="150" />
    </template>
  </com-table>
</template>

<script setup>
const form = reactive({
  form: ''
})
</script>

<style lang="scss" scoped></style>
