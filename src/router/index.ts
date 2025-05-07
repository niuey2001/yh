import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {
                hideHeader: true,
                hideFooter: true
            }
        },
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/orders',
            name: 'orders',
            component: () => import('../views/OrdersView.vue')
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('../views/UsersView.vue')
        },
        {
            path: '/reports',
            name: 'reports',
            component: () => import('../views/ReportsView.vue')
        },
        {
            path: '/internal',
            name: 'internal',
            component: () => import('../views/InternalView.vue')
        },
        {
            path: '/notices',
            name: 'notices',
            component: () => import('../views/NoticesView.vue')
        },
        {
            path: '/history',
            name: 'history',
            component: () => import('../views/HistoryView.vue')
        },
        {
            path: '/lottery',
            name: 'lottery',
            component: () => import('../views/LotteryView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router 