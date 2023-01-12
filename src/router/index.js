import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/videos/:id',
    name: 'Videos',
    component: () => import('../components/videos/container.vue')
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: () => import('../components/Account.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
