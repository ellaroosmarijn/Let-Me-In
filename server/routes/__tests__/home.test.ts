import request from 'supertest'
import server from '../../server'
import { getHomeImage } from '../../db/home'

jest.mock('../../db/home')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const getHomeImageMockData = {
  id: 111,
  uploaderId: 'MockUploaderId',
  name: 'MockName',
  description: 'MockDescription',
  imageUrl: 'MockImageUrl',
}

describe('GET /api/v1/home/', () => {
  it('should return status 200 and a contenders when database is successful.', async () => {
    // Arrange
    expect.assertions(2)

    jest.mocked(getHomeImage).mockResolvedValue(getHomeImageMockData)

    // Act
    const response = await request(server).get('/api/v1/home/')

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toEqual(getHomeImageMockData)
  })

  it('should return status 500 and an error message when database fails.', async () => {
    // Arrange
    expect.assertions(1)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(getHomeImage).mockRejectedValue(new Error('Mock error message'))

    // Act
    const response = await request(server).get('/api/v1/home/')

    // Assert
    expect(response.status).toBe(500)
  })
})
