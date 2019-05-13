import 'lib-flexible/flexible.js';

import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.prototype.axios = axios

import router from './router/index.js'

import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
