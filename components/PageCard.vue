<template>
  <el-row
    :gutter="0"
    type="flex"
    justify="center"
  >
    <el-card
      style="width:98%"
    >
      <div
        slot="header"
        class="card-header"
      >
        <div class="card-header-left">
          <span>{{ title }}</span>
        </div>
        <div
          class="card-header-right"
        >
          <slot name="top-buttons" />
        </div>
      </div>
      <el-row type="flex">
        <el-col
          :span="24"
        >
          <slot />
        </el-col>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
