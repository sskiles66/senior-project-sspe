import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginSignupView from '@/views/LoginSignupView.vue'
import ExamView from '@/views/ExamView.vue'
import ExamResultsView from '@/views/ExamResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginSignupView
    },
    {
      path: '/exam/:id',
      name: 'exam',
      component: ExamView
    },
    {
      path: '/exam-results',
      name: 'exam results',
      component: ExamResultsView
    },
  ]
})

export default router
