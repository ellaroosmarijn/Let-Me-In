import request from 'supertest'
import server from '../../server'
import checkJwt, { JwtRequest } from '../../auth0'
jest.mock('../../db/winner')
jest.mock('../../auth0')

import { addWinnerResults } from '../../db/winner'

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const addResultTestData = [
  { id: 4, auth0Id: '3', imageId: 2, created: '1630565951369' },
]

const newResults = {
  id: 4,
  auth0Id: '3',
  imageId: 2,
  created: '1630565951369',
}

describe('POST /api/vi/winner/', () => {
  it('should return status 200 and the new result', async () => {
    expect.assertions(2)
    jest.mocked(addWinnerResults).mockResolvedValue(addResultTestData)

    jest.mocked(checkJwt).mockImplementation(async (req, res, next) => {
      const reqAuth = req as JwtRequest
      reqAuth.auth = {
        sub: 'auth0|123',
      }
      next()
    })

    const imageId = 7
    const response = await request(server)
      .post('/api/v1/winner')
      .send({ imageId: imageId })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(newResults)
  })
})
