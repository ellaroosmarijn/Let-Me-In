import request from 'supertest'
import server from '../../server'
import { uploads } from '../../db/uploads'

import checkJwt, { JwtRequest } from '../../auth0'

jest.mock('../../db/uploads')
jest.mock('../../auth0')

beforeEach(() => {
  jest.resetAllMocks
})

afterAll(() => {
  jest.restoreAllMocks
})

const getMockUserUploads = [
  {
    id: 111,
    uploaderId: 'auth0|123',
    name: 'MockName',
    description: 'MockDescription',
    imageUrl: 'MockImageUrl',
  },
  {
    id: 222,
    uploaderId: 'auth0|123',
    name: 'whatever',
    description: 'second MockDescription',
    imageUrl: 'MockImageUrl2',
  },
]

describe('Get /api/v1/uploads/', () => {
  it('should return status 200 and return mockuploaderId', async () => {
    // Arrange
    expect.assertions(2)

    jest.mocked(checkJwt).mockImplementation(async (req, res, next) => {
      const reqAuth = req as JwtRequest
      reqAuth.auth = {
        sub: 'auth0|123',
      }
      next()
    })

    jest.mocked(uploads).mockResolvedValue(getMockUserUploads)

    // Act
    const response = await request(server).get('/api/v1/uploads/')

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toEqual(getMockUserUploads)
  })

  it('should return status 500 and an error message when database fails.', async () => {
    // Arrange
    expect.assertions(1)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(uploads).mockRejectedValue(new Error('Mock error message'))

    // Act
    const response = await request(server).get('/api/v1/uploads/')

    // Assert
    expect(response.status).toBe(500)
  })

  it('should return status 401 and an error message when we have the wrong auth0Id.', async () => {
    // Arrange
    // expect.assertions(2)
    jest.mocked(checkJwt).mockImplementation(async (req, res, next) => {
      const reqAuth = req as JwtRequest
      reqAuth.auth = {
        // sub: '',
      }
      next()
    })

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(uploads).mockResolvedValue(getMockUserUploads)

    // Act
    const response = await request(server)
      .get('/api/v1/uploads/')
      .set('Authorization', 'Bearer token')

    // Assert
    expect(response.status).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
})
