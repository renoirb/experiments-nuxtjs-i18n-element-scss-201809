<template>
  <el-container
    class="layouts-default el-project-theme el-container--root"
  >
    <el-aside
      width="200px"
      class="el-aside--menu"
    >
      <el-menu
        :default-openeds="openedMenuItems"
        :router="true"
      >
        <el-menu-item
          :route="{path: '/'}"
          index="index"
          class="navbar-logo"
          style="height:80px;"
        >
          <img
            src="~/assets/img/logo.svg"
            width="167"
            height="71"
          >
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message" />Navigator One</template>
          <el-menu-item-group>
            <template slot="title">Group 1</template>
            <el-menu-item
              index="1-1"
              :route="{path: '/alpha'}"
            >
              Alpha
            </el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-2">
            <template slot="title">Option 2</template>
            <el-menu-item
              index="1-2-1"
              :route="{path: '/bravo'}"
            >
              Bravo
            </el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i
            class="el-icon-setting"
            style="margin-right: 15px"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>View</el-dropdown-item>
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>Tom</span>
      </el-header>

      <el-main>
        <nuxt />
      </el-main>

      <el-footer>
        <el-col :span="24">
          <prototype-navigation />
        </el-col>
      </el-footer>

    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      openedMenuItems: ['1'],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';
@import '~element-ui/packages/theme-chalk/src/mixins/utils.scss';
.el-footer {
  // color: var(--branding-primary);
  color: $--color-text-primary;
}
.el-container--root {
  @include utils-clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.el-aside--menu {
  background-color: var(--branding-primary);
  color: #333;
}
.el-header {
  background-color: var(--branding-primary);
  color: #fff;
  line-height: 60px;
}
.el-header .el-dropdown {
  // Instead of using Element's $--color-text-regular, inherit from parent!
  color: inherit;
  cursor: crosshair;
}
</style>
