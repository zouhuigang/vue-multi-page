import Vue from 'vue'
import App from './index.vue'
import router from './router'

// 引入阿里云字体，采用Symbol形式引入svg图标
import 'assets/iconfont/iconfont.css'
import 'assets/iconfont/iconfont.js'

//swiper
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'

import Vant from 'vant';
import 'vant/lib/index.css';

/* 安装插件 */
Vue.use(Vant)
//Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})