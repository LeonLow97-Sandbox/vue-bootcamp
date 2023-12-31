import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useRouter } from 'vue-router'
vi.mock('vue-router')

describe('JobFiltersSidebarCheckboxGroup', () => {
  const createProps = (props = {}) => ({
    header: 'Some header',
    uniqueValues: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props
  })

  const renderJobFiltersSidebarCheckboxGroup = (props) => {
    const pinia = createTestingPinia()

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  it('renders unique list of values', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['Full-Time', 'Part-Time'])
    })
    renderJobFiltersSidebarCheckboxGroup(props)

    const button = screen.getByRole('button', { name: /job types/i })
    await userEvent.click(button)

    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListItems.map((node) => node.textContent)
    expect(jobTypes).toEqual(['Full-Time', 'Part-Time'])
  })

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      useRouter.mockReturnValue({ push: vi.fn() })

      const action = vi.fn()
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-Time', 'Part-Time']),
        action
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)

      const fullTimeCheckBox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckBox)

      expect(action).toHaveBeenCalledWith(['Full-Time'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })

      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-Time"])
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)

      const fullTimeCheckBox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckBox)

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
