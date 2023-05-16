<template>
  <div>
    <a class="iconify-href" href="https://icon-sets.iconify.design/teenyicons/alarm-solid/">iconify.design官网:</a>
    <icon-teenyicons-alarm-solid style="font-size: 2em; color: red" />
    <p>使用原始svg</p>
    <span v-html="RawMdiAlarmOff2" />
    <span v-html="AttachmentSolid" />
    <icon-user-user />
    <icon-park-adobe-photoshop />
    <h2>图标选择器</h2>
    <el-input v-model="selectIcon.iconName" :prefix-icon="selectIcon.icon" placeholder="请选择图标" @click="openDialog" size="large"> </el-input>
    <choose-icon v-model:show-dialog="showDialog" v-model:selectIcon="selectIcon" />
  </div>
</template>

<script setup>
import RawMdiAlarmOff2 from '@/assets/svg/user/user.svg?raw'
// ~icons就代表@iconify-json，attachment-solid代表图标名称
import AttachmentSolid from '~icons/teenyicons/attachment-solid?raw&width=4em&height=4em'
import ChooseIcon from './components/chooseIcon.vue'
const showDialog = ref(false)
const selectIcon = ref({})
const openDialog = () => {
  showDialog.value = true
}
</script>

<style lang="scss" scoped>
.iconify-href {
  color: blue;
  &:hover {
    text-decoration: underline;
  }
}
.el-input {
  width: 50%;
}
</style>
