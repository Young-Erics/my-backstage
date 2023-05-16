<template>
  <header>
    <div class="left-box">
      <!-- 收缩按钮 -->
      <div class="menu-icon" @click="opendStateChange">
        <icon-ep-fold v-if="!isCollapse" />
        <icon-ep-expand v-else />
        <!-- <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i> -->
      </div>
      <Breadcrumb />
    </div>
    <div class="right-box">
      <!-- 快捷功能按钮 -->
      <div class="function-list">
        <div class="function-list-item hidden-sm-and-down"><FullScreen /></div>
        <!-- <div class="function-list-item"><SizeChange /></div> -->
        <div class="function-list-item hidden-sm-and-down"><Theme /></div>
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <el-avatar size="small">{{ fullName.substr(0, 1) }}</el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ fullName }}
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          </span>
          <!-- <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="showPasswordLayer">修改密码</el-dropdown-item>
              <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template> -->
        </el-dropdown>
      </div>
      <!-- <password-layer :layer="layer" v-if="layer.show" /> -->
    </div>
  </header>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FullScreen from './functionList/fullscreen.vue'
import SizeChange from './functionList/sizeChange.vue'
import Theme from './functionList/theme.vue'
import Breadcrumb from './Breadcrumb.vue'
// import PasswordLayer from './passwordLayer.vue'
export default defineComponent({
  components: {
    FullScreen,
    Breadcrumb,
    SizeChange,
    Theme
    // PasswordLayer
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const fullName = store.state.loginsso.userInfo?.username || '1'
    const layer = reactive({
      show: false,
      showButton: true
    })
    const isCollapse = computed(() => store.state.app.isCollapse)
    // isCollapse change to hide/show the sidebar
    const opendStateChange = () => {
      store.commit('app/isCollapseChange', !isCollapse.value)
    }

    // login out the system
    // const loginOut = () => {
    //   store.dispatch('user/loginOut')
    // }

    const showPasswordLayer = () => {
      layer.show = true
    }
    return {
      isCollapse,
      layer,
      opendStateChange,
      // loginOut,
      showPasswordLayer,
      fullName
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: var(--system-header-background);
  padding-right: 22px;
}
.left-box {
  height: 100%;
  display: flex;
  align-items: center;
  .menu-icon {
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 100;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      background-color: var(--system-header-item-hover-color);
    }
    i {
      color: var(--system-header-text-color);
    }
  }
}
.right-box {
  display: flex;
  justify-content: center;
  align-items: center;
  .function-list {
    display: flex;
    .function-list-item {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      :deep(i) {
        color: var(--system-header-text-color);
      }
    }
  }
  .user-info {
    margin-left: 20px;
    .el-dropdown-link {
      color: var(--system-header-breadcrumb-text-color);
    }
  }
}
.el-avatar {
  background-color: #1890ff;
}
.el-dropdown {
  margin-left: 10px;
  vertical-align: middle;
}
</style>
