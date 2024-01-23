<template>
  <div>子组件的名字：{{ uname }}</div>
  <div>子组件的attrs:{{ $attrs }}</div>
  <grandson v-bind="$attrs" />
</template>

<script setup>
import grandson from './grandson.vue'
defineProps({
  uname: String
})
</script>

<style lang="scss" scoped></style>
