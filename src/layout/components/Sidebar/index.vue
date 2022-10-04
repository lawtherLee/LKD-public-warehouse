<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" class="aaa" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        :unique-opened="false"
        mode="vertical"
        text-color="#000"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :base-path="route.path" :item="route" />
      </el-menu>

      <!--  -->

    </el-scrollbar>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }

  }

}
</script>
<style lang="scss">
.aaa {
  margin-bottom: 15px;
}

.el-menu-item {
  background-color: #fff;
}

.scrollbar-wrapper {
  width: 189px !important;

  el-menu {
    width: 100%;
  }

}

</style>
