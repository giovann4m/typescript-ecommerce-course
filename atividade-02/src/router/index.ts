import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'

import ConsumerLayout from '../layouts/ConsumerLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [

    // Login — sem layout
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

    // Área do consumidor
    {
      path: '/',
      component: ConsumerLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'produto/:id', name: 'product', component: ProductView },
        {
          path: 'carrinho',
          name: 'cart',
          component: CartView,
          beforeEnter: () => {
            const isAuthenticated = localStorage.getItem('user') !== null
            if (!isAuthenticated) return { name: 'login' }
          }
        }
      ]
    },

    // Área do admin
    {
      path: '/admin',
      component: AdminLayout,
      beforeEnter: () => {
        const raw = localStorage.getItem('user')
        const user = raw ? JSON.parse(raw) : null
        if (!user || user.role !== 'ADMIN') return { name: 'login' }
      },
      children: [
        { path: '', name: 'admin', component: AdminView }
      ]
    }

  ]
})

export default router