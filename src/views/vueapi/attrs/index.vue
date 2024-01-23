<template>
  <div>
    <!-- 父组件 -->
    <div>
      我是父组件
      <child :uname="uname" zoo="zoo-from父组件" />
    </div>
  </div>
</template>

<script setup>
import child from './components/child.vue'
const uname = '李世民'
</script>

<style lang="scss" scoped></style>
