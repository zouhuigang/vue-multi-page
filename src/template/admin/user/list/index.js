import Vue from 'Vue'
import App from './app.vue'
import cell from './index.vue'
import zantui from 'zantui'
import 'zantui/dist/styles/zantui.css'
import router from './router'
import Router from 'vue-router'

/* 安装插件 */
Vue.use(Router);
Vue.use(zantui);

/* eslint-disable no-new */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App,cell)
}).$mount('#app')