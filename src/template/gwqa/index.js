import Vue from 'Vue'
import cell from './index.vue'
import zantui from 'zantui'
import 'zantui/dist/styles/zantui.css'
import VueFullPage from 'vue-fullpage.js';
import Video from "video.js";
import "video.js/dist/video-js.min.css"
Vue.prototype.$video = Video

Vue.use(VueFullPage);

/* 安装插件 */
Vue.use(zantui)

//获取页面初始化的值
var DATASOURCE = JSON.parse(document.getElementById('bx-shield-datasource').innerHTML);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: DATASOURCE,
    render: h => h(cell)
})
