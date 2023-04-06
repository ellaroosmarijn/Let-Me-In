import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'
import { initialiseStore } from '../../store'
import { useAuth0 } from '@auth0/auth0-react'

jest.mock('@auth0/auth0-react')

beforeEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const mockedSub = 'auth0|123'

const uploadUserMockData = [
  {
    id: 111,
    uploaderId: 'auth0|123',
    name: 'MockName',
    description: 'MockDescription',
    imageUrl: 'MockImageUrl',
  },
]

describe('<Uploads />', () => {
  // first test //

  it('successfully shows the users uploaded images', async () => {
    // Arrange
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => mockedSub),
      isAuthenticated: true,
    }
    const scope = nock('http://localhost')
      .get('/api/v1/uploads')
      .reply(200, uploadUserMockData)

    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/uploads']}>
          <App />
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const uploadData = screen.getAllByAltText(uploadUserMockData[0].description)

    // Assert
    expect(uploadData[0]).toHaveAttribute('src', uploadUserMockData[0].imageUrl)
  })

  // Seconed test //

  it('should fail to access the page if not authenticated.', async () => {
    // Arrange
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => ''),
      isAuthenticated: false,
    }
    const scope = nock('http://localhost').get('/api/v1/uploads').reply(401)

    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/uploads']}>
          <App />
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const uploadData = await screen.findByText(
      /You need to log in to access this page/i
    )

    // Assert
    expect(await uploadData).toBeInTheDocument()
  })
})
