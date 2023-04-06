import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from '../App'
import { initialiseStore } from '../../store'
import checkJwt from '../../../server/auth0'

import { useAuth0 } from '@auth0/auth0-react'

const mockGetAccessToken = jest.fn()

jest.mock('@auth0/auth0-react')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const ResultsMockData = [
  {
    id: 111,
    auth0Id: '1',
    imageId: '4',
    created: 'dateString',
    imageUrl: 'image string',
    description: 'Title of image',
  },
]

describe('<Results />', () => {
  it('successfully shows image from results table', async () => {
    // Arrange
    expect.assertions(4)

    const scope = nock('http://localhost')
      .get('/api/v1/results')
      .reply(200, ResultsMockData)

    const mockGetAccessToken = jest.fn()

    jest.mocked(useAuth0 as jest.Mock).mockReturnValue({
      getAccessTokenSilently: mockGetAccessToken,
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    })

    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/results']}>
          <App />
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const result = screen.getByAltText(ResultsMockData[0].description)

    // Assert
    expect(result).toHaveAttribute('src', ResultsMockData[0].imageUrl)
  })
  it.only('should display an error when there is not data matching auth0Id', async () => {
    expect.assertions(3)

    const scope = nock('http://localhost').get('/api/v1/results').reply(500)

    const mockGetAccessToken = jest.fn()

    jest.mocked(useAuth0 as jest.Mock).mockReturnValue({
      getAccessTokenSilently: mockGetAccessToken,
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    })

    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/results']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    // asserts
    await waitFor(() => expect(scope.isDone()).toBeTruthy())
    screen.debug()
    const errorMessage = screen.getByRole('paragraph')
    console.log(errorMessage)
    console.log(errorMessage.textContent)
    expect(errorMessage).toHaveTextContent('Internal Server Error')
  })
})
