import { createRouter, createWebHistory } from 'vue-router'
import WifiTariffs from '../views/WifiTariffs.vue'

const routes = [
  {
    path: '/',
    redirect: '/wifi-tariffs'
  },
  {
    path: '/wifi-tariffs',
    name: 'Wifi Tariffs',
    component: WifiTariffs
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/wifi-tariffs'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router