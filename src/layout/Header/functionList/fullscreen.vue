<template>
  <div :title="isFullscreen ? '退出全屏' : '全屏'">
    <icon-ep-full-screen v-if="!isFullscreen" class="custom-icon" @click="toggle" />
    <icon-user-exit-screen v-else class="custom-icon" @click="toggle" />
    <!-- <icon-teenyicons-area-chart-solid /> -->
    <!-- <i class="sfont" :class="isFullscreen ? 'system-quanping' : 'system-quanping1'" @click="toggle"></i> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'

export default defineComponent({
  name: 'fullscreen',
  setup() {
    const { isFullscreen, toggle } = useFullscreen()
    return {
      isFullscreen,
      toggle
    }
  }
})
</script>

<style lang="scss" scoped>
// .screen-icon,
// .exit-icon {
//   width: 100%;
//   vertical-align: middle;
// }
// i {
//   cursor: pointer;
//   font-size: 18px;
//   &:focus {
//     outline: none;
//   }
// }
</style>
