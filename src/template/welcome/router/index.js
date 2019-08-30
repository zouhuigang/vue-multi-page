import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/hello'
import User from '@/components/user'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'actived',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})