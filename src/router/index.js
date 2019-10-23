import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../views/login')
    },
    {
      path: '/',
      component: () => import('../views/home'),
      hidden: true
    },
    {
      path: '/bind-shop',
      component: () => import('../views/bind-shop')
    }
  ]
})
