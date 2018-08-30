import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'

// import IonIconsPlugin from '~ionicons/ionicons' // TOO HEAVY!!

import '@/assets/styles/index.scss'

import PrototypeNavigation from '~/components/PrototypeNavigation'

import enMessages from 'element-ui/lib/locale/lang/en'

const namingThingsAreHard = {
  lbl_OPERATOR_EQ: 'Heeekwalz',
}

const en = Object.assign({}, enMessages, namingThingsAreHard)

Vue.use(VueI18n)
Vue.component('prototype-navigation', PrototypeNavigation)

// Vue.use(IonIconsPlugin) // TOO HEAVY!!

export default async ({
  app,
}) => {
  // http://element.eleme.io/#/en-US/component/i18n#compatible-with-2
  app.i18n = new VueI18n({
    locale: 'en',
    messages: {
      en,
    },
  })
  Vue.use(Element, {
    i18n: (key, value) => app.i18n.t(key, value),
  })
}
