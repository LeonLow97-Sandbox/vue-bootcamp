import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import JobResultsView from '@/views/JobResultsView.vue'
import JobView from '@/views/JobView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/jobs/results',
    name: 'JobResults',
    component: JobResultsView
  },
  {
    // portion (wildcard) of url that is dynamic, e.g., jobs/results/100
    path: '/jobs/results/:id',
    name: 'JobListing',
    component: JobView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // scrolling to the top of the screen
  scrollBehavior() {
    return {
      top: 0, left: 0, behavior: "smooth"
    }
  }
})

export default router
