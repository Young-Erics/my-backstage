<template>
  <!-- 采集需求计划 -->
  <com-table ref="child" :form="form">
    <template #formItem>
      <el-form-item label="机构名称:" prop="jgmc">
        <el-input v-model.trim="form.jgmc" placeholder="" type="text" />
      </el-form-item>
      <el-form-item label="状态:" prop="ly">
        <el-select v-model="form.state" placeholder="请选择状态">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="数据类型:" prop="">
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="(item, index) in checkBox" :key="index" :label="item.value">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </template>
    <template #tableColumn>
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="jgmc" label="机构名称" :show-overflow-tooltip="true" />
      <el-table-column prop="bmc" label="采集需求" width="250" />
      <el-table-column prop="bzwm" label="应采集内容" width="250" />
      <el-table-column prop="tjsj" label="采集时间" width="150" />
      <el-table-column prop="jyjls" label="状态" width="100" />
    </template>
  </com-table>
  <!-- 查看详情对话框 -->
  <audit-dialog v-model:showDialog="showDialog"></audit-dialog>
</template>

<script setup>
const form = reactive({
  jgmc: '',
  state: ''
})
const stateOptions = ref([
  {
    label: '采集中',
    value: '0'
  }
])
const checkList = ref([])
const checkBox = ref([
  {
    label: '医疗服务数据',
    value: 0
  },
  {
    label: '公卫服务数据',
    value: 1
  },
  {
    label: '基层卫生数据',
    value: 2
  },
  {
    label: '其它卫健数据',
    value: 3
  }
])
watch(checkList, (newVal, oldVal) => {
  console.log('newVal', newVal)
})
const showDialog = ref(false)
</script>

<style lang="scss" scoped>
:deep {
  .form-card {
    padding: 10px;
  }
  // .table-card {
  //   height: calc(100% - 94px);
  // }
}
</style>
