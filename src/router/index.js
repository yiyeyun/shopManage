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
      children: [
        {
          path: '',
          component: () => import('@/views/home/default')
        },
        {
          path: '/goods-list',
          component: () => import('@/views/goods-manage/goods-list')
        },
        {
          path: '/voucher-list',
          component: () => import('@/views/voucher-manage/voucher-list')
        }
      ]
    },
    {
      path: '/bind-shop',
      component: () => import('../views/bind-shop')
    }
  ]
})
