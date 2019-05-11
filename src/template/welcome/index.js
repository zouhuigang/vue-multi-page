import Vue from 'vue'
import App from './index.vue'
import router from './router'
import zantui from 'zantui'
import 'zantui/dist/styles/zantui.css'

/* 安装插件 */
Vue.use(zantui)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})