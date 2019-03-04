import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'using.props',
      component: () => import('./views/UsingProps.vue')
    },
    {
      path: '/using-slot',
      name: 'using.slot',
      component: () => import('./views/UsingSlot.vue')
    },
    {
      path: '/using-api',
      name: 'using.api',
      component: () => import('./views/UsingApi.vue')
    }
  ]
})
