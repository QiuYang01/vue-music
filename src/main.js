import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import  "./assets/css/globecss.css";
//引入字体图标
import 'font-awesome/css/font-awesome.css'  //引入字体图标
//http://www.fontawesome.com.cn/faicons

import axios from 'axios'
axios.defaults.baseURL="http://122.51.65.4:4001" 
Vue.prototype.$axios = axios //后面通过this.axios调用


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  render: h => h(App)
})
