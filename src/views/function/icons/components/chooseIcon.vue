<template>
  <el-dialog :model-value="showDialog" title="选择图标" @close="closeDialog" top="50px" center width="66%">
    <el-input v-model="searchIcon" @input="search" placeholder="搜索图标" :prefix-icon="icons.Search"> </el-input>
    <el-scrollbar height="400px" v-if="iconList.length > 0">
      <div class="icon-list">
        <div class="icon-item" v-for="(item, index) in iconList" :key="index" @click="select(item)">
          <component :is="item.icon"></component>
          <span>{{ item.iconName }}</span>
        </div>
      </div>
    </el-scrollbar>
    <template #footer>
      <el-button type="primary" @click="closeDialog">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import * as icons from "@element-plus/icons-vue";
import { getCurrentInstance } from "vue";
import { cloneDeep } from "lodash-es";
const { proxy } = getCurrentInstance();
const props = defineProps({
  showDialog: Boolean
});
// 将导入的所有ele图标组成数组形式来遍历渲染
const iconList = ref([]);
Object.keys(icons).forEach(key => {
  let item = {
    iconName: key,
    icon: markRaw(icons[key])
  };
  iconList.value.push(item);
});
const emit = defineEmits(["update:showDialog", "update:selectIcon"]);
// 实现图标搜索
const searchIcon = ref("");
let deep = cloneDeep(iconList.value);
const search = value => {
  if (!value) return (iconList.value = deep);
  iconList.value = deep.filter(item => {
    return item.iconName.toLowerCase().indexOf(value.toLowerCase()) > -1;
  });
};
function closeDialog() {
  emit("update:showDialog", false);
}
// 选择图标
const select = item => {
  emit("update:selectIcon", item);
  closeDialog();
};
</script>
<style lang="scss" scoped>
.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 115px);
  justify-content: space-evenly;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 42px;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: content-box;
  &:hover {
    transform: scale(1.3);
  }
  span {
    margin-top: 5px;
    line-height: 20px;
    text-align: center;
    width: 115px;
  }
}
</style>
