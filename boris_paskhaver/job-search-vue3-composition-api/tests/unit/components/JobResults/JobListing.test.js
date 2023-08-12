import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobResults/JobListing.vue'

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue Developer',
    organization: 'AirBnB',
    locations: ['Singapore'],
    minimumQualifications: ['Code'],
    ...jobProps
  })

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: {
          ...jobProps
        }
      }
    })
  }

  it('renders job title', () => {
    const jobProps = createJobProps({ title: 'Vue Programmer' })
    renderJobListing(jobProps)
    expect(screen.getByText('Vue Programmer')).toBeInTheDocument()
  })

  it('renders job organizaiton', () => {
    const jobProps = createJobProps({ organization: 'Google' })
    renderJobListing(jobProps)
    expect(screen.getByText('Google')).toBeInTheDocument()
  })

  it('renders job locations', () => {
    const jobProps = createJobProps({
      locations: ['Orlando', 'Jacksonville']
    })
    renderJobListing(jobProps)
    expect(screen.getByText('Orlando')).toBeInTheDocument()
    expect(screen.getByText('Jacksonville')).toBeInTheDocument()
  })

  it('renders job qualifications', () => {
    const jobProps = createJobProps({
      minimumQualifications: ['Code', 'Develop']
    })
    renderJobListing(jobProps)
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('Develop')).toBeInTheDocument()
  })
})
