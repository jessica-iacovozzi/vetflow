import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pets',
      name: 'pets',
      component: () => import('@/views/PetListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pets/:id',
      name: 'pet-detail',
      component: () => import('@/views/PetDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/questionnaire/new',
      name: 'questionnaire-new',
      component: () => import('@/views/QuestionnaireFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/questionnaire/:id',
      name: 'questionnaire-detail',
      component: () => import('@/views/QuestionnaireDetailView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
