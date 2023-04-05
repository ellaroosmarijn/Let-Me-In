import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from '../App'
import { initialiseStore } from '../../store'

import { useAuth0 } from '@auth0/auth0-react'

jest.mock('@auth0/auth0-react')

beforeEach(() => {
  jest.resetAllMocks()
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
  it('successfully shows the users uploaded images', async () => {
    // Arrange
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => mockedSub),
      isAuthenticated: true,
    }
    const scope = nock('http://localhost')
      .get('/api/v1/uploads')
      .reply(200, uploadUserMockData)

    jest.mocked(useAuth0).mockReturnValue(mockAuth as any)
    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/uploads']}>
          <App />
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const uploadData = screen.getByAltText(uploadUserMockData[0].description)

    // Assert
    expect(uploadData).toHaveAttribute('src', uploadUserMockData[0].imageUrl)
  })

  
})
