import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'
import { initialiseStore } from '../../store'
import { useAuth0 } from '@auth0/auth0-react'
import { getUploads } from '../../apis/uploads'

jest.mock('@auth0/auth0-react')
jest.mock('../../apis/uploads')

beforeEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const mockedSub = 'auth0|123'

describe('<Uploads />', () => {
  it('should display an error message if fetchUploads fails', async () => {
    // Arrange
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => mockedSub),
      isAuthenticated: true,
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    jest.mocked(getUploads).mockRejectedValue({ anything: 'failed' })
    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/uploads']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    const uploadData = await screen.findByText(/An unknown error occurred/i)
    // Assert
    console.log((getUploads as jest.Mock).mock.calls)
    expect(getUploads).toHaveBeenCalledWith(mockedSub)
    expect(uploadData).toBeInTheDocument()
  })
})
