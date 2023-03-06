
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

import { getAuth } from "firebase/auth";

const auth = getAuth();
 // null if no user

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/search/bulk',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/bulkAddressSearch.vue')
  // },
  {
    path: '*',
    component: () => import('./../pages/authentication/login.vue')
  },
  {
    path: '/',
    redirect: '/search/address',
    meta:{
      requiresAuth: true
    }
  },

  {
    path: '/signup',
    name: 'signup',
    component: () => import('./../pages/authentication/signup.vue'),
    meta:{
      layout: "authLayout"
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../pages/authentication/login.vue'),
    meta:{
      layout: "authLayout"
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('./../pages/authentication/forgotPassword.vue'),
    meta:{
      layout: "authLayout"
    }

  },
  {
    path: '/search/address',
    name: 'singleAddressSearch',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/singleAddressSearch.vue'),
    meta:{
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
   console.log(to, from)
  if(requiresAuth && !user){
    next('/login')
  }
  else if(!requiresAuth){
    next();
  }
  // else if (!requiresAuth && user && to.path != '/search/address') next('/search/address');
  else next()
})

export default router
