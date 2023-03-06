
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"



Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/search/bulk',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/bulkAddressSearch.vue')
  // },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('./../pages/authentication/signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../pages/authentication/login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('./../pages/authentication/forgotPassword.vue')
  },
  {
    path: '/search/address',
    name: 'singleAddressSearch',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/singleAddressSearch.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {

  switch (to.name){
    case "login":
      next()
      break;
    default:
      switch (store.getAuthStatus){
        case "loggedIn":
          next()
          break;
        default:
          next('/login')
      }
  }



 
})

export default router
