<template>
  <!-- 数据来源全景 -->
  <div class="page-container">
    <header>
      <div class="btn" v-for="(item, index) in tabs" :key="index" @click="toggleBtn(item)">
        <div>
          <icon-system-medical1 class="custom-icon" v-if="item.icon === 1" />
          <icon-system-medical2 class="custom-icon" v-else-if="item.icon === 2" />
          <icon-system-medical3 class="custom-icon" v-else />
        </div>
        <div>
          <div class="btn-name">
            {{ item.name }}
          </div>
          <div class="btn-num" :class="item.numColor">123</div>
        </div>
      </div>
      <div :class="{ 'underline': isactive == 2, 'underline2': isactive == 3 }"></div>
    </header>
    <KeepAlive>
      <component :is="currentTab.tabCom"></component>
    </KeepAlive>
  </div>
</template>

<script setup>
import left from './components/sjydzs.vue'
import center from './components/sssjydzs.vue'
import right from './components/qtsjydzs.vue'
// 动态组件
const tabs = reactive([
  // proxy会代理reactive中的所有内容
  // 无需对组件进行proxy代理
  // 必须使用markRaw跳过对组件的代理，否则vue会给警告
  {
    name: 'T+1 数据源端总数(个)',
    tabCom: markRaw(left),
    icon: 1,
    numColor: 'num-color1'
  },
  {
    name: '实时数据源端总数(个)',
    tabCom: markRaw(center),
    icon: 2,
    numColor: 'num-color2'
  },
  {
    name: '其他数据源端总数(个)',
    tabCom: markRaw(right),
    icon: 3,
    numColor: 'num-color3'
  }
])
let currentTab = reactive({
  tabCom: tabs[0].tabCom
})
let isactive = ref(1)
const toggleBtn = item => {
  isactive.value = item.icon
  currentTab.tabCom = item.tabCom
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  justify-content: space-around;
  position: relative;
  & > div:last-child {
    position: absolute;
    bottom: 10px;
    left: 110px;
    width: 240px;
    height: 3px;
    background-color: #ec7d8a;
    transition: 0.5s;
  }
  .underline {
    transform: translateX(410px);
  }
  .underline2 {
    transform: translateX(820px);
  }
  .btn {
    display: flex;
    align-items: center;
    text-align: center;
    cursor: pointer;

    & > div:first-child {
      margin-right: 15px;
    }
    .btn-name {
      margin-bottom: 10px;
      color: #888888;
      font-weight: 700;
    }
    .btn-num {
      font-weight: 700;
    }
    .num-color1 {
      color: #0000ff;
    }
    .num-color2 {
      color: #cd97ff;
    }
    .num-color3 {
      color: #f7b258;
    }
  }
  .custom-icon {
    height: 4em;
    // margin-right: 15px;
  }
}
</style>
