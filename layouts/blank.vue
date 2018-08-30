<template>
  <el-container
    class="layouts-blank el-project-theme el-container--root"
  >
    <el-header>
      <heading-top />
    </el-header>
    <el-container>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
    <el-footer>
      <el-col :span="24">
        <prototype-navigation />
      </el-col>
    </el-footer>
  </el-container>
</template>

<script>
import Headbar from '@/components/Headbar'

export default {
  components: {
    'heading-top': Headbar,
  },
  head () {
    return {
      title: 'Home',
    }
  },
}
</script>

<style lang="scss">
@import '~/styles/_variables.scss';
.el-header {
  background-color: var(--branding-ice); // CSS Variables, defined in ~/styles/_variables.scss
  color: $--color-primary; // SCSS variable
}
.el-footer {
  color: $--color-text-primary;
  // color: var(--branding-primary);
}
</style>
