<template>
  <el-container class="Hst" v-auth="'login_coconut_background'">
    <el-header class="Df Aic bgh Header">
      <a href="/" class="Lhcr Curp">
        <svg class="logo"><use xlink:href="#logo_lite"></use></svg>
      </a>

      <el-dropdown class="Mla" trigger="click">
        <div v-if="isLoggedIn" class="Curp">
          <span>{{ getUsername() }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <div v-else class="Curp">
          <a href="/login/">请登录</a>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="Px0">
            <a class="Db Px20" href="/changepwd/">修改密码</a>
          </el-dropdown-item>
          <el-dropdown-item class="Px0">
            <a class="Db Px20" href="/logout/">退出</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container class="Ovh">
      <el-aside :width="menuCollapse ? '65px' : '216px'" class="Posr Pb56">
        <el-menu
          router
          :default-active="getActiveRouter()"
          :collapse="menuCollapse"
          :collapse-transition="false"
          class="Hst Ova BasicWrapperMenu"
        >
          <AsideMenu
            v-for="(item, index) in menuItems"
            :key="index"
            :item="item"
          />
        </el-menu>

        <div class="Df Aic Posa B0 Start0 End0 CollapseContainer">
          <i
            style="color:#845bea;"
            class="Px16 Fz24 Curp"
            :class="[menuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
            @click="menuCollapse = !menuCollapse"
          ></i>
        </div>
      </el-aside>

      <el-main class="bg" id="main_anchor">
        <HeaderBoard
          v-if="breadMeta"
          class="SubHeader"
          :title="breadMeta.title"
          :items="breadMeta.breadcrumb"
        />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AsideMenu from '@/components/AsideMenu.vue'
import HeaderBoard from '@/components/HeaderBoard.vue'
import menusConfig from './menusConfig'

export default {
  name: 'BasicWrapper',

  components: {
    AsideMenu,
    HeaderBoard,
  },

  data() {
    return {
      menuCollapse: false,
    }
  },

  computed: {
    ...mapGetters('user', ['username', 'isLoggedIn']),

    menuItems() {
      return menusConfig(this)
    },

    breadMeta() {
      const { meta } = this.$route
      return meta ? { title: meta.title, breadcrumb: meta.breadcrumb } : null
    },
  },

  methods: {
    getUsername() {
      return this.username
    },

    getActiveRouter() {
      return this.$route.name
    },
  },
}
</script>

<style lang="scss">
.bgh {
  // background-color: #0b6fd6;
  background-color: #fff;
}

.bg {
  background-color: #f7f9fc;
}

.Header {
  height: 64px !important;
  border-bottom: 1px solid #e6e6e6;

  .logo {
    width: 136px;
    height: 38px;
    color: #845bea;
  }
}

.SubHeader {
  margin: -24px -20px 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.CollapseContainer {
  height: 56px;
  border-right: 1px solid #e6e6e6;
  background-color: #f7f9fc;
}

.BasicWrapperMenu {
  li.el-submenu > ul.el-menu {
    padding-left: 24px;
  }

  .el-submenu .svgIcon {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    color: #909399;
  }

  .el-submenu .el-menu-item {
    padding: 0;
    min-width: 150px;
  }
}
</style>
