<template>
  <div>
    <img id="woman1" width="300" height="400" src="@/assets/images/woman1.png" alt="" />
  </div>
</template>

<script setup>
import useToBase64 from '@/hooks/imgToBase64.js'
useToBase64({ el: '#woman1' }).then(res => {
  console.log('base64Url', res.baseUrl)
})
</script>

<style lang="scss" scoped></style>
