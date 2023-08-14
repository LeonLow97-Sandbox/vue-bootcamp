import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import type { Mock } from 'vitest'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { createJob } from '../../utils/createJob'

vi.mock('axios')

const axiosGetMock = axios.get as Mock

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores jobs listings', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('FETCH_JOBS', () => {
    it('makes APi request and stores received jobs', async () => {
      axiosGetMock.mockResolvedValue({ data: ['Job 1', 'Job 2'] }) // to ensure that the received jobs are saved into `jobs` state

      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['Job 1', 'Job 2'])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('finds unique organizations from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ organization: 'Google' }),
        createJob({ organization: 'Amazon' }),
        createJob({ organization: 'Google' })
      ]

      // store.jobs = [
      //   { organization: 'Google' },
      //   { organization: 'Amazon' },
      //   { organization: 'Google' }
      // ] as Job[]

      const result = store.UNIQUE_ORGANIZATIONS
      expect(result).toEqual(new Set(['Google', 'Amazon']))
    })
  })

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ jobType: 'Full-Time' }),
        createJob({ jobType: 'Full-Time' }),
        createJob({ jobType: 'Full-Time' })
      ]

      const result = store.UNIQUE_JOB_TYPES
      expect(result).toEqual(new Set(['Full-Time', 'Full-Time']))
    })
  })

  describe('INCLUDE_JOB_BY_ORGANIZATION', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const store = useJobsStore()

        const job = createJob({ organization: 'Google' })

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given organizations', () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Google', 'Microsoft']
      const store = useJobsStore()

      const job = createJob({ organization: 'Google' })

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

      expect(result).toBe(true)
    })
  })

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when the user has not selected any job types', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []
        const store = useJobsStore()

        const job = createJob({ jobType: 'Full-TIme' })

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)

        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given job types', () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full-Time', 'Part-Time']
      const store = useJobsStore()

      const job = createJob({ jobType: 'Part-Time' })

      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)

      expect(result).toBe(true)
    })
  })

  describe('INCLUDE_JOB_BY_DEGREE', () => {
    describe('when the user has not selected any job degrees', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = []
        const store = useJobsStore()

        const job = createJob()

        const result = store.INCLUDE_JOB_BY_DEGREE(job)

        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given degrees', () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ["'Master's"]
      const store = useJobsStore()

      const job = createJob({ degree: "Master's" })

      const result = store.INCLUDE_JOB_BY_DEGREE(job)

      expect(result).toBe(true)
    })
  })

  describe('INCLUDE_JOB_BY_SKILL', () => {
    it("identifies if job matchers user's skill", () => {
      const userStore = useUserStore()
      userStore.skillsSearchTerm = 'Vue'
      const store = useJobsStore()
      const job = createJob({ title: 'Vue Developer' })

      const result = store.INCLUDE_JOB_BY_SKILL(job)

      expect(result).toBe(true)
    })

    it('handles inconsistent character casing', () => {
      const userStore = useUserStore()
      userStore.skillsSearchTerm = 'vUe'
      const store = useJobsStore()
      const job = createJob({ title: 'Vue Developer' })

      const result = store.INCLUDE_JOB_BY_SKILL(job)

      expect(result).toBe(true)
    })

    describe('when the user has not entered any skill', () => [
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.skillsSearchTerm = ''
        const store = useJobsStore()
        const job = createJob({ title: 'Vue Developer' })

        const result = store.INCLUDE_JOB_BY_SKILL(job)

        expect(result).toBe(true)
      })
    ])
  })
})
