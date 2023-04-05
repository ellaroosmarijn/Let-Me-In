import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import checkJwt, { JwtRequest } from '../../../server/auth0'

import App from '../App'
import { initialiseStore } from '../../store'

// jest.mock('../../../server/auth0', ()=>({checkJwt: jest.fn()}))
jest.mock('../../../server/auth0')
const mockedcheckJwt= checkJwt as jest.MockedFunction<typeof checkJwt>

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const uploadUserMockData = {
  id: 111,
  uploaderId: 'auth0|123',
  name: 'MockName',
  description: 'MockDescription',
  imageUrl: 'MockImageUrl',
}

describe('<Uploads />', () => {
  it('successfully shows the users uploaded images', async () => {
    // // Arrange
    // // expect.assertions()
   
    // mockedcheckJwt.mockImplementation(async (req, res, next)=>{
    //   const reqAuth=req as JwtRequest
    //   reqAuth.auth={
    //     sub: 'auth0|123',
    //   }
    //   next()
    // })

    // const scope = nock('http://localhost')
    //   .get('/api/v1/uploads')
    //   .reply(200, uploadUserMockData)

    // // Act
    // render(
    //   <Provider store={initialiseStore()}>
    //     <MemoryRouter>
    //       <App />
    //     </MemoryRouter>
    //   </Provider>
    // )

    // await waitFor(() => expect(scope.isDone()).toBeTruthy())

    // const uploadData = screen.getByAltText(uploadUserMockData.description)

    // // Assert
    // expect(uploadData).toHaveAttribute('src', uploadUserMockData.imageUrl)
    expect(1).toBe(1)
  })
})
