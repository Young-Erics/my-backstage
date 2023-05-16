<template>
  <!-- 其他数据源端总数 -->
  <com :section="section"></com>
</template>

<script setup>
import com from './com.vue'
let section = reactive({
  list: [
    {
      leftTitle: '省平台前置机',
      child: [
        {
          rightSmallTitle: '数据类'
        }
      ]
    },
    {
      leftTitle: '市资源共享平台',
      child: [
        {
          rightSmallTitle: '数据类'
        }
      ]
    },
    {
      leftTitle: '卫健其他业务系统',
      child: [
        {
          rightSmallTitle: '系统名称'
        }
      ]
    }
  ]
})
</script>

<style lang="scss" scoped></style>
