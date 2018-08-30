<template>
  <div
    class="navbar themeRadius bordred"
  >
    <el-menu
      :default-active="$route.path"
      :router="true"
    >
      <el-menu-item
        :route="{path: '/'}"
        index="home"
        class="navbar-logo"
      >
        <img
          src="~/assets/img/logo.svg"
          width="167"
          height="71"
        >
      </el-menu-item>
      <div
        v-for="menu in menuItems"
        :key="menu.id"
      >
        <el-submenu
          v-if="menu.children && menu.children.length"
          :index="menu.url || menu.name"
        >
          <template slot="title">
            <i
              v-if="menu.icon"
              :class="menu.icon"
            />
            <span v-t="menu.name" />
          </template>
          <nuxt-link
            v-for="subMenu in menu.children"
            :key="subMenu.id"
            :to="subMenu.url"
            exact
          >
            <el-menu-item :index="subMenu.url || subMenu.name">
              <i
                v-if="subMenu.icon"
                :class="subMenu.icon"
              />
              <span v-t="subMenu.name" />
            </el-menu-item>
          </nuxt-link>
        </el-submenu>
        <nuxt-link
          v-else
          :to="menu.url"
          exact
        >
          <el-menu-item
            :index="menu.url || menu.name"
          >
            <i
              v-if="menu.icon"
              :class="menu.icon"
            />
            <span v-t="menu.name" />
          </el-menu-item>
        </nuxt-link>
      </div>
    </el-menu>
  </div>
</template>

<script>
import {
  mapState,
} from 'vuex'

export default {
  computed: {
    menuItems () {
      return [] // VueX. TODO.
    },
  },
}
</script>
