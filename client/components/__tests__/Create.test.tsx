import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'
import { initialiseStore } from '../../store'
import imageUpload from '../../helpers/aws'
import { useAuth0 } from '@auth0/auth0-react'
jest.mock('@auth0/auth0-react')
jest.mock('../../helpers/aws')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const mockToken = 'bananas'

describe('<Create />', () => {
  it('should have heading "create your own entry"', async () => {
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => mockToken),
      isAuthenticated: true,
      logout: async () => {
        return null
      },
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )

    const header = await screen.findByRole('heading')
    expect(header).toHaveTextContent('Create your own entry')
  })
  it('should have 2 textbox for name and description', async () => {
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => mockToken),
      isAuthenticated: true,
      logout: async () => {
        return null
      },
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )

    const inputItems = await screen.findAllByRole('textbox')
    expect(inputItems).toHaveLength(2)
  })
  it('should have upload button', async () => {
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => mockToken),
      isAuthenticated: true,
      logout: async () => {
        return null
      },
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )
    const buttonItem = await screen.findByRole('button', {
      name: 'Upload',
    })
    expect(buttonItem).toHaveTextContent('Upload')
  })
})

describe('Form validation', () => {
  it('if all fields are empty the submit button should be disabled', async () => {
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => mockToken),
      isAuthenticated: true,
      logout: async () => {
        return null
      },
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )
    const buttonItem = await screen.findByRole('button', {
      name: 'Upload',
    })
    expect(buttonItem).toHaveAttribute('data-disabled', 'true')
  })

  it('if all fields are filled the submit button should be enabled', async () => {
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => mockToken),
      isAuthenticated: true,
      logout: async () => {
        return null
      },
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const nameInput = await screen.getByRole('textbox', { name: 'Title' })
    const descriptionInput = await screen.getByRole('textbox', {
      name: 'Description',
    })

    const fileUpload = screen.getByRole('button', { name: '' })

    act(() => {
      userEvent.type(nameInput, 'Test')
      userEvent.type(descriptionInput, 'Test')
      userEvent.upload(fileUpload, file)
    })
    const enabledButton = await screen.findByRole('button', {
      name: 'Upload',
    })
    expect(enabledButton).not.toHaveAttribute('data-disabled', 'true')
  })
})

describe('form submission', () => {
  it('should empty input fields and redirected to /uploads page', async () => {
    jest.mocked(imageUpload).mockResolvedValue('https://test.co.nz')
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => mockToken),
      isAuthenticated: true,
      logout: async () => {
        return null
      },
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)

    const homeImageMockData = {
      id: 111,
      uploader_id: 'MockUploaderId',
      name: 'MockName',
      description: 'MockDescription',
      image_url: 'MockImageUrl',
    }

    const scope = nock('http://localhost')
      .post('/api/v1/create')
      .reply(200, homeImageMockData)

    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )

    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const nameInput = await screen.getByRole('textbox', { name: 'Title' })
    const descriptionInput = await screen.getByRole('textbox', {
      name: 'Description',
    })

    const fileUpload = screen.getByRole('button', { name: '' })

    act(() => {
      userEvent.type(nameInput, 'Test')
      userEvent.type(descriptionInput, 'Test')
      userEvent.upload(fileUpload, file)
    })
    const enabledButton = await screen.findByRole('button', {
      name: 'Upload',
    })

    act(() => {
      userEvent.click(enabledButton)
    })

    await waitFor(() => expect(scope.isDone()).toBeTruthy())
    const nameInputAfterSummission = await screen.findByRole('textbox', {
      name: 'Title',
    })
    expect(nameInputAfterSummission).toHaveValue('')
  })
})
