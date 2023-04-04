import request from 'supertest'
import server from '../../server'
import { uploads } from '../../db/uploads'

jest.mock('../../db/uploads')

beforeEach(() => {
  jest.resetAllMocks
})

afterAll(() => {
  jest.restoreAllMocks
})

const getMockUserUploads = [
  {
    id: 111,
    uploaderId: 'MockUploaderId',
    name: 'MockName',
    description: 'MockDescription',
    imageUrl: 'MockImageUrl',
  },
  {
    id: 222,
    uploaderId: 'MockUploaderId',
    name: 'whatever',
    description: 'second MockDescription',
    imageUrl: 'MockImageUrl2',
  },
]

describe('Get /api/v1/uploads/MockUploaderId', () => {
  it('should return status 200 and return mockuploaderId', async () => {
    // Arrange
    expect.assertions(2)
    jest.mocked(uploads).mockResolvedValue(getMockUserUploads)
    
    // Act
    const response = await request(server).get('/api/v1/uploads/MockUploaderId')  
   
    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toEqual(getMockUserUploads)
  })
} )