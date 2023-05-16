<template>
  <el-dialog :model-value="showDialog" title="查看详情" @close="closeDialog" center>
    <el-table :data="gridData" :border="true" style="width: 100%" size="small">
      <el-table-column property="date" label="字段中文名" />
      <el-table-column property="name" label="字段名" width="200" />
      <el-table-column property="address" label="值" width="150" />
      <el-table-column property="address" label="是否错误" width="150" />
    </el-table>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  showDialog: Boolean,
  gridData: Array
})
const emit = defineEmits(['update:showDialog'])
function closeDialog() {
  emit('update:showDialog', false)
}
</script>

<style lang="scss" scoped></style>
