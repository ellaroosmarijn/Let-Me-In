import request from 'supertest'
import server from '../../server'
import { addWinnerResults, getById } from '../../db/winner'

jest.mock('../../db/winner')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const addResultTestData = [
  { id: 4, auth0Id: '3', imageId: 2, created: '1630565951369' },
]

const newResults = [
  {
    id: 4,
    auth0_id: '3',
    image_id: 2,
    created: '1630565951369',
  },
]

describe('POST /api/vi/winner/', () => {
  it('should return status 200 and the new result', async () => {
    expect.assertions(2)
    jest.mocked(addWinnerResults).mockResolvedValue(addResultTestData)
    jest.mocked(getById).mockResolvedValue(newResults)
    const imageId = '7'
    const response = await request(server).post('/api/v1/winner/').send(imageId)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(newResults)
  })
})
