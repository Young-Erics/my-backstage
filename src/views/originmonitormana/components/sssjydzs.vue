<template>
  <!-- 实时数据源端总数 -->
  <com :section="section"></com>
</template>

<script setup>
import com from './com.vue'
let section = reactive({
  list: [
    {
      leftTitle: '检验检查互联互通',
      child: [
        {
          rightSmallTitle: '医疗机构'
        }
      ]
    },
    {
      leftTitle: '基础协同门诊、住院实时接口',
      child: [
        {
          rightSmallTitle: '医疗机构'
        }
      ]
    }
  ]
})
</script>

<style lang="scss" scoped></style>
