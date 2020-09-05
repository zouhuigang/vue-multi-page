import Vue from 'Vue'
import cell from './index.vue'
/* 安装插件 */
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant)

//获取页面初始化的值
var DATASOURCE = JSON.parse(document.getElementById('datasource').innerHTML);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: DATASOURCE,
    render: h => h(cell)
})
