// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import flexible from 'utils/flexible'
import utils from 'utils/utils'
import store from 'store/store'
import element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'styles/reset.css'

Vue.use(flexible);
Vue.use(element);

Vue.config.productionTip = false;

Object.assign(Vue.prototype, utils);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
