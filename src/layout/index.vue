<template>
  <el-container style="height: 100vh">
    <div class="mask" v-show="!isCollapse && !contentFullScreen" @click="hideMenu"></div>
    <el-aside :width="isCollapse ? '60px' : '250px'" :class="isCollapse ? 'hide-aside' : 'show-side'" v-show="!contentFullScreen">
      <Logo v-if="showLogo" />
      <Menu />
    </el-aside>
    <el-container>
      <el-header v-show="!contentFullScreen">
        <Header />
      </el-header>
      <Tabs v-show="showTabs" />
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade-transform'" mode="out-in">
            <div>
              <!-- include 只有名称匹配的组件会被缓存。 -->
              <keep-alive v-if="keepAliveComponentsName" :include="keepAliveComponentsName">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
              <component v-else :is="Component" :key="route.fullPath" />
            </div>
          </transition>
        </router-view>
      </el-main>
      <footer>
        <div>深圳市卫生健康发展研究和数据管理中心</div>
        <div>技术支持：万达信息股份有限公司</div>
      </footer>
    </el-container>
  </el-container>
</template>
<script>
import { defineComponent, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useEventListener } from '@vueuse/core'
import Menu from './Menu/index.vue'
import Logo from './Logo/index.vue'
import Header from './Header/index.vue'
import Tabs from './Tabs/index.vue'
export default defineComponent({
  components: {
    Menu,
    Logo,
    Header,
    Tabs
  },
  setup() {
    const store = useStore()
    // computed
    const isCollapse = computed(() => store.state.app.isCollapse)
    const contentFullScreen = computed(() => store.state.app.contentFullScreen)
    const showLogo = computed(() => store.state.app.showLogo)
    const showTabs = computed(() => store.state.app.showTabs)
    const keepAliveComponentsName = computed(() => store.getters['keepAlive/keepAliveComponentsName'])
    console.log('keepAliveComponentsName', keepAliveComponentsName)
    // 页面宽度变化监听后执行的方法
    const resizeHandler = () => {
      if (document.body.clientWidth <= 1000 && !isCollapse.value) {
        store.commit('app/isCollapseChange', true)
      } else if (document.body.clientWidth > 1000 && isCollapse.value) {
        store.commit('app/isCollapseChange', false)
      }
    }
    // 初始化调用
    resizeHandler()
    // beforeMount
    onBeforeMount(() => {
      // 监听页面变化
      useEventListener('resize', resizeHandler)
    })
    // methods
    // 隐藏菜单
    const hideMenu = () => {
      store.commit('app/isCollapseChange', true)
    }
    return {
      isCollapse,
      showLogo,
      showTabs,
      contentFullScreen,
      keepAliveComponentsName,
      hideMenu
    }
  }
})
</script>
<style lang="scss" scoped>
.el-header {
  padding-left: 0;
  padding-right: 0;
  height: 40px;
}
.el-aside {
  display: flex;
  flex-direction: column;
  transition: 0.2s;
  overflow-x: hidden;
  transition: 0.3s;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
.el-main {
  // background-color: var(--system-container-background);
  background-color: #fff;
  padding: 0;
  flex: 1;
  &::-webkit-scrollbar {
    display: none;
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(144, 147, 153, 0.3);
  }
  &:hover {
    &::-webkit-scrollbar {
      display: block;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(144, 147, 153, 0.3);
      &:hover {
        background: rgba(144, 147, 153, 0.5);
      }
    }
  }
}
footer {
  background-color: var(--system-container-background);
  height: 50px;
  color: #7e7e7e;
  text-align: center;
  font-size: 13px;
  padding-top: 10px;
  & > div:first-child {
    margin-bottom: 5px;
  }
}
.el-main-box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
@media screen and (max-width: 1000px) {
  .el-aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    &.hide-aside {
      left: -250px;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
