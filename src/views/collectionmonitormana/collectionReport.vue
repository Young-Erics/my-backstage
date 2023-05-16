<template>
  <!-- 采集报告页面 -->
  <com-table ref="child">
    <template #tableColumn>
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="jgmc" label="机构名称" :show-overflow-tooltip="true" />
      <el-table-column prop="bmc" label="表名称" :show-overflow-tooltip="true" width="150" />
      <el-table-column prop="bzwm" label="表中文名" :show-overflow-tooltip="true" width="150" />
      <el-table-column prop="tjsj" label="统计时间" width="150" />
      <el-table-column prop="jyjls" label="校验记录数" width="100" />
      <el-table-column prop="cwjls" label="错误记录数" width="100" />
      <el-table-column prop="cwl" label="错误率" width="100" />
      <el-table-column label="操作" fixed="right" width="100">
        <template v-slot:default="{ row }">
          <!-- <span>{{ row.jmjbxxid }}</span> -->
          <el-button link type="primary" size="small" @click="checkDetail(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </template>
  </com-table>
  <!-- 查看详情对话框 -->
  <audit-dialog v-model:showDialog="showDialog"></audit-dialog>
</template>

<script setup>
function checkDetail(row) {
  showDialog.value = true
}
const showDialog = ref(false)
</script>

<style lang="scss" scoped></style>
