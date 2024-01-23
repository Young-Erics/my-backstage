<template>
  <div></div>
  <!-- renderless components -->
  <OnClickOutside @trigger="close">
    <div id="insideDiv">Click Outside of Me</div>
  </OnClickOutside>
</template>

<script setup>
import { useDark, useTitle } from '@vueuse/core'
import { OnClickOutside } from '@vueuse/components'
const isDark = useDark()
console.log('isDark', isDark.value)
const title = computed(() => (isDark.value ? '🌙 Good evening!' : '☀️ Good morning!'))
useTitle(title)
// 无渲染组件
function close() {
  console.log('点击#insideDiv以外的区域会触发')
}
</script>

<style lang="scss" scoped></style>
