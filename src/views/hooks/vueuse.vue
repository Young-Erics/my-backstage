<template>
  <div></div>
</template>

<script setup>
import { useDark, useTitle } from '@vueuse/core'
const isDark = useDark()
console.log('isDark', isDark.value)
const title = computed(() => (isDark.value ? '🌙 Good evening!' : '☀️ Good morning!'))
useTitle(title)
</script>

<style lang="scss" scoped></style>
