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
  {
    path: '/training',
    name: 'Training',
    component: () => import('../components/Training.vue')
  },
  {
    path: '/meal',
    name: 'Meal',
    component: () => import('../components/Meal.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
