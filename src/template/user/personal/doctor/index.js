import Vue from 'Vue'
import cell from './index.vue'
import Vant from 'vant';
import 'vant/lib/index.css';

/* 安装插件 */
Vue.use(Vant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(cell)
})