<template>
  <section class="page">
    <page-card
      :title="title"
    >
      <div>
        <h2 class="title normalize">
          Repositories
        </h2>
        <p>
          Here is something from an external service
        </p>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="created_at"
            label="Date"
            sortable
            width="180"
          />
          <el-table-column
            prop="name"
            label="Name"
            width="180"
          />
          <el-table-column
            prop="default_branch"
            label="Default Branch"
          />
          <el-table-column
            prop="forks"
            label="Forks"
          />
          <el-table-column
            prop="open_issues"
            label="Open issues"
          />
        </el-table>
      </div>
    </page-card>
  </section>
</template>

<script>
const PageCard = () => import(/* webpackChunkName: "page-card" */ '~/components/PageCard')

export default {
  layout ({
    isMobile = false,
  }) {
    return isMobile ? 'mobile' : 'default'
  },

  head () {
    return {
      title: this.title,
    }
  },

  components: {
    PageCard,
  },

  data () {
    return {
      title: this.$t('page.title'),
    }
  },

  computed: {
    tableData () {
      return this.$store.state.repositories.items
    },
  },

  async fetch ({
    store,
  }) {
    await store.dispatch('repositories/hydrate')
  },
}
</script>

<i18n>
{
  "en": {
    "page": {
      "title": "Alpha"
    }
  }
}
</i18n>
