import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import  "./assets/css/globecss.css";
//引入字体图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText }
 from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

import axios from 'axios'
Vue.prototype.axios = axios //后面通过this.axios调用

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
