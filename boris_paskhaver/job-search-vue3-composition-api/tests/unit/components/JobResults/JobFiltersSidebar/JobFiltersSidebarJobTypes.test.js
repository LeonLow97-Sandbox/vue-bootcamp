import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

describe('JobFiltersSidebarJobTypes', () => {
  const renderJobFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()
    const jobsStore = useJobsStore()
    const $router = { push: vi.fn() }

    render(JobFiltersSidebarJobTypes, {
      global: {
        mocks: {
          $router
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { jobsStore, userStore, $router }
  }

  it('renders unique list of job types from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarJobTypes()
    jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-Time', 'Part-Time'])

    const button = screen.getByRole('button', { name: /job types/i })
    await userEvent.click(button)

    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListItems.map((node) => node.textContent)
    expect(jobTypes).toEqual(['Full-Time', 'Part-Time'])
  })

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for job types', async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarJobTypes()
      jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-Time', 'Part-Time'])

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)

      const fullTimeCheckBox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckBox)

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith(['Full-Time'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const { jobsStore, $router } = renderJobFiltersSidebarJobTypes()
      jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-Time'])

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)

      const fullTimeCheckBox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckBox)

      expect($router.push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
