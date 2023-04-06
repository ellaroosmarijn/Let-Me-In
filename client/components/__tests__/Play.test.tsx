import nock from 'nock'
import { MemoryRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { useAuth0 } from '@auth0/auth0-react'
import App from '../App'
import { initialiseStore } from '../../store'
jest.mock('@auth0/auth0-react')

afterAll(() => {
  jest.restoreAllMocks()
})

jest.mocked(useAuth0 as jest.Mock).mockReturnValue({getAccessTokenSilently: jest.fn(async ()=> 'mockAccessToken')})
const store = initialiseStore()

const playImageMockData = {
  id: 1001,
  isWinning: false,
  imageUrl: 'images/wrong1.gif',
  uploaderId: 'developers',
  name: 'placeholder-image',
  description: 'placeholder-description',
}

describe('Test Play Component', ()=> {
  test('display the correct header', async () => {
    
    const scope1 = nock('http://localhost').get('/api/v1/play').reply(200, playImageMockData)

    render(

        <Router initialEntries={['/play']}>
          <Provider store={store}>
            <App/>
          </Provider>
        </Router>
      
    )

    await waitFor(()=> expect(scope1.isDone()).toBeTruthy())
    
    const header = screen.getByRole('heading', {name: /click on a square to find the winning meme!/i})
  
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Winning')
  })
  test('display the correct header when pressed', async ()=> {
   
    const scope2 = nock('http://localhost').get('/api/v1/play').reply(200, playImageMockData)
    render(
      <Router initialEntries={['/play']}>
        <Provider store={store}>
          <App/>
        </Provider>
      </Router>
    )

    await waitFor(()=> expect(scope2.isDone()).toBeTruthy())
    
    const card = screen.getAllByRole('button')
    act(()=> {userEvent.click(card[2])})
    const header = screen.getByRole('heading', {name: /Wrong One, Try Again!/i})
    expect(header).toHaveTextContent('Wrong')
   })
  })
  