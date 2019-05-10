import Vue from 'Vue'
import cell from './index.vue'
import zantui from 'zantui'
import 'zantui/dist/styles/zantui.css'

/* 安装插件 */
Vue.use(zantui)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(cell)
})