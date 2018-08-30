<template>
  <el-container
    class="layouts-mobile el-project-theme el-container--root"
  >
    <el-header>
      <el-col :span="8">
        Mobile layout!
      </el-col>
      <el-col :span="16">
        <prototype-navigation />
      </el-col>
    </el-header>

    <el-main>
      <nuxt />
    </el-main>

  </el-container>
</template>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';
@import '~element-ui/packages/theme-chalk/src/mixins/utils.scss';
.el-footer {
  color: $--color-text-primary;
}
.el-container--root {
  @include utils-clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: var(--branding-primary);
  color: #fff;
  line-height: 60px;
}
</style>
