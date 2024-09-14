import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import BounceView from '@/views/BounceView.vue'
import Staging from '@/views/Staging.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/bounce',
    name: 'bounce',
    component: BounceView
  },
  {
    path: '/staging',
    name: 'staging',
    component: Staging
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomeView
  },

 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
