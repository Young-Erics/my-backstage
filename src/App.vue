<script setup>
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' //中文
let locale = zhCn
</script>
<template>
  <!-- 此组件用于设置全局组件语言为中文 -->
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
