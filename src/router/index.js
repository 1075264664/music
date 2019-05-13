import Vue from 'vue'

import Router from 'vue-router'


import routes from './routes'

import { Row, Col, Icon } from 'vant'

Vue.use(Row).use(Col).use(Icon)

Vue.use(Router)

export default new Router ({
  routes	
})
