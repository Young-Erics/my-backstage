<template>
  <div>孙子组件的zoo是{{ zoo }}</div>
</template>

<script setup>
defineProps({
  zoo: String
})
</script>

<style lang="scss" scoped></style>
