import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'
import { initialiseStore } from '../../store'

import { useAuth0 } from '@auth0/auth0-react'
jest.mock('@auth0/auth0-react')

beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const mockAuth = {
  getAccessTokenSilently: jest.fn(async () => 'auth0Token'),
  isAuthenticated: false,
  loginWithRedirect: jest.fn(async () => null),
  logout: jest.fn(async () => null),
}

describe('<Navbar />', () => {
  it('Login button click calls loginWithRedirect', async () => {
    // Arrange
    expect.assertions(1)
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)

    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/notFound']}>
          <App />
        </MemoryRouter>
      </Provider>
    )

    const loginButton = screen.getByText(/Login/i)
    userEvent.click(loginButton)
    
    // Assert
    expect(mockAuth.loginWithRedirect).toHaveBeenCalledTimes(1)
  })
  it('Login button keydown enter calls loginWithRedirect', async () => {
    // Arrange
    expect.assertions(2)
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)

    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/notFound']}>
          <App />
        </MemoryRouter>
      </Provider>
    )

    const loginButton = screen.getByText(/Login/i)
    
    // Assert
    fireEvent.keyDown(loginButton, {key: 'o', code: 'KeyO', charCode: 79})
    expect(mockAuth.loginWithRedirect).toHaveBeenCalledTimes(0)

    fireEvent.keyDown(loginButton, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(mockAuth.loginWithRedirect).toHaveBeenCalledTimes(1)
  })
  it('Logout button click calls logout', async () => {
    // Arrange
    expect.assertions(1)
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue({ ...mockAuth, isAuthenticated: true })

    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/notFound']}>
          <App />
        </MemoryRouter>
      </Provider>
    )

    const logoutButton = screen.getByText(/Log out/i)
    userEvent.click(logoutButton)
    
    // Assert
    expect(mockAuth.logout).toHaveBeenCalledWith({ returnTo: window.location.origin })
  })
  it('Logout button keydown enter calls logout', async () => {
    // Arrange
    expect.assertions(2)
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue({ ...mockAuth, isAuthenticated: true })

    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter initialEntries={['/notFound']}>
          <App />
        </MemoryRouter>
      </Provider>
    )

    const logoutButton = screen.getByText(/Log out/i)
    
    // Assert
    fireEvent.keyDown(logoutButton, {key: 'o', code: 'KeyO', charCode: 79})
    expect(mockAuth.logout).toHaveBeenCalledTimes(0)

    fireEvent.keyDown(logoutButton, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(mockAuth.logout).toHaveBeenCalledWith({ returnTo: window.location.origin })
  })
})
