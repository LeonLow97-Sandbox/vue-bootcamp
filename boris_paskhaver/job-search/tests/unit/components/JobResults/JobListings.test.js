import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import axios from 'axios'

import JobListings from '@/components/JobResults/JobListings.vue'

vi.mock('axios') // replaced every method in actual 'axios' with a mock method

describe('JobListings', () => {
  it('fetches jobs', () => {
    // mockResolveValue: asynchronous function
    axios.get.mockResolvedValue({ data: [] })
    render(JobListings)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs')
  })

  it('displays maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({ data: Array(10).fill({}) })

    render(JobListings, {
        global: {
            stubs: {
                RouterLink: RouterLinkStub
            }
        }
    })

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })
})
