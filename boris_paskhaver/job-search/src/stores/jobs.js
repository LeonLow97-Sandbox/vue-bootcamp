import { defineStore } from 'pinia'

import getJobs from '@/api/getJobs'

export const FETCH_JOBS = 'FETCH_JOBS' // to prevent typo in component when we import pinia store actions

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: []
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs()
      this.jobs = jobs
    }
  }
})
