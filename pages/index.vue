<template>
  <section class="page">
    <div>
      <logo />
      <h1 class="title normalize">
        Nuxt feature showcase <em>KitchenSink</em>
      </h1>
      <div>

        <dl>
          <dt>Reading data from Axios/Vuex</dt>
          <dd>API_PREFIX: "{{ getEnvValue('API_PREFIX') }}"</dd>
          <dd>repositories count: {{ $store.state.repositories.items.length }}</dd>
        </dl>

        <dl>
          <dt>
            <h2>Localization helpers</h2>
            <small>(translation read from present Vue file)</small>
          </dt>
          <dd>Using $t('hello') in template: "<em>{{ $t('hello') }}</em>"</dd>
          <dd>Using v-t="'hello'" directive: "<em v-t="'hello'">(nothing)</em>"</dd>
          <dt>Globally registered translation messages</dt>
          <dd>Using $t('lbl_OPERATOR_EQ') in template: "<em>{{ $t('lbl_OPERATOR_EQ') }}</em>"</dd>
          <dd>Using v-t="'lbl_OPERATOR_EQ'" directive: "<em v-t="'lbl_OPERATOR_EQ'">(nothing)</em>"</dd>
        </dl>

        <dl>
          <dt><h2>Icons</h2></dt>
          <dt>Icons using class names (from Element UI)</dt>
          <dd>
            <i class="icon icon-pencil2 el-icon-pencil2" />
            <i class="el-icon-edit" />
          </dd>
          <dd><i class="el-icon-edit" /></dd>
          <dd><i class="el-icon-share" /></dd>
          <dd><i class="el-icon-delete" /></dd>

          <dt>Icons using "ionicons"</dt>
          <dd>
            <ios-alert-icon
              w="30px"
              h="30px"
            />
            <logo-github
              w="100px"
              h="100px"
            />
          </dd>
        </dl>

        <dl>
          <dt><h2>Element UI</h2></dt>
          <dt>el-button</dt>
          <dd>
            <el-button
              type="primary"
              icon="el-icon-search"
            >
              Search
            </el-button>
          </dd>

          <dt>el-switch</dt>
          <dd>
            <el-switch
              v-model="someSwitch"
              style="display: block"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Pay by month"
              inactive-text="Pay by year"
              @change="(!someSwitch)"
            />
          </dd>
        </dl>
      </div>
    </div>
  </section>
</template>

<script>
const Logo = () => import(/* webpackChunkName: "logo" */ '~/components/Logo')
const IosAlertIcon = () => import(/* webpackChunkName: "ionicons-ios-alert" */ '~ionicons/ios-alert')
const LogoGithub = () => import(/* webpackChunkName: "ionicons-logo-github" */ '~ionicons/logo-github')

export default {
  layout ({
    isMobile = false,
  }) {
    return isMobile ? 'mobile' : 'default'
  },

  components: {
    Logo,
    IosAlertIcon,
    LogoGithub,
  },

  data () {
    return {
      someSwitch: true,
    }
  },

  computed: {
    getEnvValue () {
      return this.$store.getters['env/getValue']
    },
  },
}
</script>

<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界!"
  }
}
</i18n>
