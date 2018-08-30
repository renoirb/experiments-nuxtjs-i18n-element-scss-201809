<template>
  <section class="page">
    <page-card
      :title="title"
    >
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            :filters="filterDateFilters"
            :filter-method="filterHandler"
            prop="date"
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
            :formatter="formatter"
            prop="address"
            label="Address"
          />
          <el-table-column
            :filters="filterTagFilters"
            :filter-method="filterTag"
            prop="tag"
            label="Tag"
            width="100"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === 'Home' ? 'primary' : 'success'"
                disable-transitions
              >
                {{ scope.row.tag }}
              </el-tag>
            </template>
          </el-table-column>
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

  async asyncData ({
    app,
  }) {
    const tableData = await app.$axios.$get('/mocking-api/bravo/table.json')

    return {
      tableData,
    }
  },

  computed: {
    filterTagFilters () {
      const items = new Map()
      this.tableData.forEach(i => {
        const tag = Reflect.has(i, 'tag') ? i.tag : false
        if (tag) {
          items.set(tag, {
            text: tag,
            value: tag,
          })
        }
      })

      const list = [...items].map(i => i[1])

      return list
    },
    filterDateFilters () {
      const items = new Map()
      this.tableData.forEach(i => {
        const date = Reflect.has(i, 'date') ? i.date : false
        if (date) {
          items.set(date, {
            text: date,
            value: date,
          })
        }
      })

      /**
       * ```js
       * [
       *   ['2016-05-03', {
       *     text: '2016-05-03',
       *     value: '2016-05-03'
       *   }],
       *   // ...
       * ]
       */
      const list = [...items].map(i => i[1])

      return list
    },
  },

  methods: {
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
  },
}
</script>

<i18n>
{
  "en": {
    "page": {
      "title": "Bravo"
    }
  }
}
</i18n>
