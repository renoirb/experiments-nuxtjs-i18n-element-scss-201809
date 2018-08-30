<template>
  <header
    class="headbar--component"
  >
    <el-row>
      <el-col
        :span="5"
      >
        <div
          class="nav-icon open is-toggle-hidden-toggler"
          @click="toggleHidden"
        >
          <i class="el-icon-more-outline" />
        </div>
      </el-col>
      <el-col
        v-if="isHidden === false"
        :offset="17"
        :span="2"
      >
        <el-badge
          :value="count"
          class="item"
        >
          <el-button
            size="small"
            type="text"
          >
            <i class="el-icon-info" />
            {{ displayName }}
          </el-button>
        </el-badge>
      </el-col>
    </el-row>
  </header>
</template>

<script>
const DISPLAY_NAME_DEFAULT = 'Anonymous'

export default {
  data () {
    return {
      count: 1,
      isHidden: false,
    }
  },
  computed: {
    displayName () {
      return DISPLAY_NAME_DEFAULT
    },
  },
  methods: {
    toggleHidden () {
      this.isHidden = !this.isHidden
    },
  },
}
</script>

<style lang="scss" scoped>
.headbar--component {
  padding: 20px 10px;
}
</style>
