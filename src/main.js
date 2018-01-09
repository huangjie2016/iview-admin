import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import iView from 'iview'
import axios from 'axios'
import {post} from './axios/index'
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.prototype.$post = post;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
