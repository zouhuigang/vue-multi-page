import Vue from 'vue'
import Router from 'vue-router'
import Accompanist from '../invite.vue'
import cell from '../index.vue'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'actived',
  routes: [  {
    path: '/',
    name: 'cell',
    component: cell
  },{
      path: '/invite/accompanist',
      name: 'Accompanist',
      component: Accompanist
    }
  ]
})