import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import '@testing-library/jest-dom'

import { getResults } from '../../apis/results'

jest.mock('../../apis/results')

import Results from '../Results'

describe('<Results />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show a loading indicator to start', async () => {
    jest.mocked(getResults).mockResolvedValue({
      id: number
  auth0Id: string
  imageId: string
  created: string,
      },
    })

    render(<Results />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitForElementToBeRemoved(screen.queryByText(/loading/i))
  })
  it('should show the name and image when done loading', async () => {
    jest.mocked(getResults).mockResolvedValue({
      name: 'Pikachu',
      sprites: {
        front_shiny: 'https://image.Results.cool',
      },
    })

    render(<Results />)

    screen.getByText(/loading/i)

    // Not so useful: because a promise takes _some_ time to resolve
    // await waitFor(() => expect(getResults).toHaveBeenCalledTimes(1))

    // A bit more useful:
    // await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    // Easiest:
    await screen.findByRole('heading', { name: /pikachu/i })
  })
  it('should show an error when it fails the fetch', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.mocked(getResults).mockRejectedValue(new Error('it was a ditto'))

    render(<Results />)

    screen.getByText(/loading/i)

    await screen.findByText(/something went wrong/i)
  })
})

// Queries:

// getBy... look for an element in the DOM, if it is there: return it, if it's not: throw an error

// findBy... look for an element in the DOM, if it is there: return it, if it's not: wait (timeout after 5 seconds and throw an error)

// queryBy... look for an element in the DOM, if it is there: return it, if it's not: return null (useful for asserting things are NOT in the DOM)
