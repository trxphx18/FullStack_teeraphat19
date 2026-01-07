import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

// views
import Main from '../views/main.vue'
import NotFound from '../views/notfound.vue'
import EvaluationForm from '../views/evaluationform.vue'

// pages
import ProfilePage from '../pages/ProfilePage.vue'
import SignUp from '../pages/signup.vue'
import SignIn from '../pages/signin.vue'

// components
import EvaluatorAssignments from '../components/evaluator/evaluatorAssignment.vue'
import TeachersAssignments from '../components/teacher/teachersAssignments.vue'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/signup',
    component: SignUp
  },
  {
    path: '/profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/evaluator',
    component: EvaluatorAssignments,
    meta: { requiresAuth: true }
  },
  {
    path: '/teachers',
    component: TeachersAssignments,
    meta: { requiresAuth: true }
  },
  {
    path: '/evaluator/assignments/:id',
    component: EvaluationForm,
    props: true
  },
  {
  path: '/reports',
  component: () => import('../components/evaluator/reports.vue'),
  meta: { requiresAuth: true }
},
  {
    path: '/dashboard',
    component: () => import('../pages/dashboard.vue')
  },
  {
    path: '/:ca11tchAll(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLogin) {
    return '/signin'
  }

  if (to.meta.adminOnly && auth.role !== 'admin') {
    return '/'
  }
})

export default router
