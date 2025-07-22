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
    path: '/elements',
    name: 'ElementResistanceTable',
    component: ElementResistanceTable,
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    redirect: '/' 
  }
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