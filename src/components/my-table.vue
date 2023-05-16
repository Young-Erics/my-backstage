<template>
  <el-table-column :prop="col.colcd" :label="col.colnm" align="left">
    <template v-if="col.childs">
      <my-column v-for="(item, index) in col.childs" :key="index" :col="item"></my-column>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: 'MyColumn',
  props: {
    col: {
      type: Object
    }
  }
}
</script>
<style scoped></style>
