<template>
  <div class="tabs">
    <el-scrollbar class="scroll-container tags-view-container" ref="scrollbarDom">
      <Item
        v-for="(menu, index) in menuList"
        :key="index"
        :menu="menu"
        :active="activeMenu.path === menu.path"
        @close="delMenu(menu)"
        @reload="pageReload"
      />
    </el-scrollbar>
    <div class="handle">
      <el-dropdown placement="bottom">
        <!-- <span>下拉</span> -->
        <icon-ep-arrow-down-bold />
        <!-- <div class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div> -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="refresh" @click="pageReload">重新加载</el-dropdown-item>
            <el-dropdown-item :icon="circleClose" :disabled="currentDisabled" @click="closeCurrentRoute">关闭当前标签</el-dropdown-item>
            <el-dropdown-item :icon="circleClose" :disabled="menuList.length < 3" @click="closeOtherRoute">关闭其他标签</el-dropdown-item>
            <el-dropdown-item :icon="circleClose" :disabled="menuList.length <= 1" @click="closeAllRoute">关闭所有标签</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip class="item" effect="dark" :content="contentFullScreen ? '退出全屏' : '内容全屏'" placement="bottom">
        <!-- <i class="el-icon-full-screen" @click="onFullscreen"></i> -->
        <icon-ep-full-screen @click="onFullscreen" style="margin-left: 15px" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { RefreshRight, CircleClose } from '@element-plus/icons-vue' //引入图标
import { defineComponent, computed, unref, watch, reactive, ref, nextTick } from 'vue'
import Item from './item.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import tabsHook from './tabsHook'
export default defineComponent({
  components: {
    Item
  },
  setup() {
    // 引入的图标组件
    const refresh = markRaw(RefreshRight)
    const circleClose = markRaw(CircleClose)
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const scrollbarDom = ref(null)
    // const allRoutes = router.options.routes //静态菜单
    // let defaultPath = store.state.permission.routes[1].children[0]
    const defaultMenu = {
      path: '/homepage',
      meta: { title: '首页', hideClose: true }
    }
    const contentFullScreen = computed(() => store.state.app.contentFullScreen)
    const currentDisabled = computed(() => route.path === defaultMenu.path)

    let activeMenu = reactive({ path: '' })
    let menuList = ref(tabsHook.getItem())
    if (menuList.value.length === 0) {
      // 判断之前有没有调用过
      addMenu(defaultMenu)
    }
    watch(menuList.value, newVal => {
      tabsHook.setItem(newVal)
    })
    watch(menuList, newVal => {
      tabsHook.setItem(newVal)
    })
    router.afterEach(() => {
      addMenu(route)
      initMenu(route)
    })

    // 全屏
    function onFullscreen() {
      store.commit('app/contentFullScreenChange', !contentFullScreen.value)
    }
    // 当前页面组件重新加载
    function pageReload() {
      // const self = route.matched[route.matched.length - 1].instances.default
      // self.handleReload()
      const { fullPath, meta, name } = unref(route)
      if (meta.cache && name) {
        store.commit('keepAlive/delKeepAliveComponentsName', name)
      }
      router.replace({
        path: '/redirect' + fullPath
      })
    }

    // 关闭当前标签，首页不关闭
    function closeCurrentRoute() {
      if (route.path !== defaultMenu.path) {
        delMenu(route)
      }
    }
    // 关闭除了当前标签之外的所有标签
    function closeOtherRoute() {
      menuList.value = [defaultMenu]
      if (route.path !== defaultMenu.path) {
        addMenu(route)
      }
      setKeepAliveData()
    }

    // 关闭所有的标签，除了首页
    function closeAllRoute() {
      menuList.value = [defaultMenu]
      setKeepAliveData()
      router.push(defaultMenu.path)
    }

    // 添加新的菜单项
    function addMenu(menu) {
      let { path, meta, name } = menu
      if (meta.hideTabs) {
        return
      }
      let hasMenu = menuList.value.some(obj => {
        return obj.path === path
      })
      if (!hasMenu) {
        menuList.value.push({
          path,
          meta,
          name
        })
      }
    }

    // 删除菜单项
    function delMenu(menu) {
      let index = 0
      if (!menu.meta.hideClose) {
        if (menu.meta.cache && menu.name) {
          store.commit('keepAlive/delKeepAliveComponentsName', menu.name)
        }
        index = menuList.value.findIndex(item => item.path === menu.path)
        menuList.value.splice(index, 1)
      }
      if (menu.path === activeMenu.path) {
        index - 1 > 0 ? router.push(menuList.value[index - 1].path) : router.push(defaultMenu.path)
      }
    }

    // 初始化activeMenu
    function initMenu(menu) {
      activeMenu = menu
      // nextTick(() => {
      //   setPosition()
      // })
    }
    // 设置当前滚动条应该在的位置
    function setPosition() {
      if (scrollbarDom.value) {
        const domBox = {
          scrollbar: scrollbarDom.value.scrollbar.querySelector('.el-scrollbar__wrap'),
          activeDom: scrollbarDom.value.scrollbar.querySelector('.active'),
          activeFather: scrollbarDom.value.scrollbar.querySelector('.el-scrollbar__view')
        }
        for (let i in domBox) {
          if (!domBox[i]) {
            return
          }
        }
        const domData = {
          scrollbar: domBox.scrollbar.getBoundingClientRect(),
          activeDom: domBox.activeDom.getBoundingClientRect(),
          activeFather: domBox.activeFather.getBoundingClientRect()
        }
        const num = domData.activeDom.x - domData.activeFather.x + (1 / 2) * domData.activeDom.width - (1 / 2) * domData.scrollbar.width
        domBox.scrollbar.scrollLeft = num
      }
    }

    // 配置需要缓存的数据
    function setKeepAliveData() {
      let keepAliveNames = []
      menuList.value.forEach(menu => {
        menu.meta && menu.meta.cache && menu.name && keepAliveNames.push(menu.name)
      })
      store.commit('keepAlive/setKeepAliveComponentsName', keepAliveNames)
    }

    // 初始化时调用：1. 新增菜单 2. 初始化activeMenu
    addMenu(route)
    initMenu(route)
    return {
      contentFullScreen,
      onFullscreen,
      pageReload,
      scrollbarDom,
      // 菜单相关
      menuList,
      activeMenu,
      delMenu,
      closeCurrentRoute,
      closeOtherRoute,
      closeAllRoute,
      currentDisabled,
      refresh,
      circleClose
    }
  }
})
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: var(--system-header-background);
  border-bottom: 1px solid var(--system-header-border-color);
  border-top: 1px solid var(--system-header-border-color);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  .handle {
    min-width: 95px;
    height: 100%;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      margin-top: 5px;
      border-left: 1px solid var(--system-header-border-color);
      height: 25px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    i {
      color: var(--system-header-text-color);
    }
  }
}
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  :deep(.el-scrollbar__wrap) {
    height: 40px;
  }
  :deep(.el-scrollbar__view) {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
.tags-view-container {
  height: 40px;
  flex: 1;
  width: 100%;
  display: flex;
}
.el-icon-full-screen {
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
  &:focus {
    outline: none;
  }
}
</style>
