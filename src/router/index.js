import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AttributeTable from '../views/AttributeTable.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/attribute-table',
    name: 'AttributeTable',
    component: AttributeTable,
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