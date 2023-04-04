import request from 'supertest'
import server from '../../server'
import { getResults } from '../../db/results'
import checkJwt, {JwtRequest} from '../../auth0'
jest.mock('../../auth0.ts')

jest.mock('../../db/results')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const getResultsMockData = [
  {
    id: 111,
    auth0Id: '1',
    imageId: '4',
    created: 'dateString',
    imageUrl: 'image string',
  },
]

jest.mocked(checkJwt).mockImplementation(async (req, res, next) => {
  const reqAuth = req as JwtRequest
  reqAuth.auth = {
    sub: 'auth0|123',
  }
  next()
})

describe('/GET /api/v1/results/', () => {
  it('should recieve data from results table', async () => {
    // Arrange
    expect.assertions(2)
    jest.mocked(getResults).mockResolvedValue(getResultsMockData)
    // Act
    const response = await request(server).get('/api/v1/results/')
    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toEqual(getResultsMockData)
  })
  it('should return status 500 and an error message when database fails.', async () => {
    expect.assertions(1)
    // Arrange
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(getResults).mockRejectedValue(new Error('Mock error message'))

    // Act

    const response = await request(server).get('/api/v1/results/')

    // Assert
    expect(response.status).toBe(500)
  })
})
