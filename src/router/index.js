
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

import { getAuth } from "firebase/auth";

const auth = getAuth();
// null if no user

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: () => import('@/pages/authentication/login.vue')
  },
  {
    path: '/',
    redirect: '/app/search/address',
  },
  {
    path: '/auth',
    name: 'auth',
    children: [
      { path: '/login',  component: () => import('@/pages/authentication/login.vue') },
      { path: '/signup', component: () => import('@/pages/authentication/signup.vue'), },
      { path: '/forgot', component: () => import('@/pages/authentication/forgotPassword.vue')}
    ],
    component: () => import('@/layouts/auth.vue')
  },
  {
    path: '/app',
    name: 'app',
    children: [
      { path: '/search/address', component: () => import('@/views/singleAddressSearch.vue') },
    ],
    component: () => import('@/layouts/app.vue'),
    meta: {
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
  if (requiresAuth && !user) {
    next('/auth/login')
  }
  else if (!requiresAuth) {
    next();
  }
  // else if (!requiresAuth && user && to.path != '/search/address') next('/search/address');
  else next()
})

export default router
