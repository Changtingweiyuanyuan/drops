import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ElementResistanceTable from '../views/ElementResistanceTable.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/element-resistance-table',
    name: 'ElementResistanceTable',
    component: ElementResistanceTable,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  gtag('config', 'G-XXXXXX', {
    page_path: to.fullPath,
  })
})

export default router