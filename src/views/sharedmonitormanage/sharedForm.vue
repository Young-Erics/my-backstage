<template>
  <!-- 共享表单情况 -->
  <com-table ref="child" :form="form">
    <template #formItem>
      <el-form-item label="表名:" prop="form">
        <el-input v-model.trim="form.form" placeholder="" type="text" />
      </el-form-item>
    </template>
    <template #tableColumn>
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="jyjls" label="表单名称" width="200" />
      <el-table-column prop="jgmc" label="表单中文名称" :show-overflow-tooltip="true" />
      <el-table-column prop="jgmc" label="该表单已共享数据总量" width="150">
        <template v-slot:default="{ row }">
          <el-link type="primary" :underline="false" @click="goRecordDetail">{{ row.jgmc }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="本机构共享情况">
        <el-table-column prop="bzwm" label="共享量" width="150" />
        <el-table-column prop="bzwm" label="共享量占比" width="150" />
        <el-table-column prop="bzwm" label="上一日共享量" width="150" />
      </el-table-column>
    </template>
  </com-table>
</template>

<script setup>
const form = reactive({
  form: ''
})
const router = useRouter()
function goRecordDetail() {
  router.push({ name: 'sharedRecord' })
}
</script>

<style lang="scss" scoped></style>
