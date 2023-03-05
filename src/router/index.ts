import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/anychart',
    name: 'Anychart',
    component: () => import('../views/Anychart.vue')
  },
  {
    path: '/d3',
    name: 'D3',
    component: () => import('../views/D3.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
