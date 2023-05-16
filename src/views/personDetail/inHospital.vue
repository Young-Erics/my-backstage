<template>
  <!-- 按人员查问题(住院信息) -->
  <PersonDetail :form="form" :info="info"></PersonDetail>
</template>

<script setup>
const route = useRoute()
const form = reactive({
  jzlsh: JSON.parse(route.query.row).jzlsh,
  orgcd: JSON.parse(route.query.row).orgcd,
  busitype: JSON.parse(route.query.row).mzzybz
})
const info = reactive({
  jzlsh: JSON.parse(route.query.row).jzlsh,
  pname: JSON.parse(route.query.row).pname,
  busitime: JSON.parse(route.query.row).busitime,
  diagnm: JSON.parse(route.query.row).diagnm
})
</script>

<style lang="scss" scoped></style>
