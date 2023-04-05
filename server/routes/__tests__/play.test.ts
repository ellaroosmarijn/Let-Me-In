import request from 'supertest'
import server from '../../server'
import * as db from '../../db/play'
import checkJwt, { JwtRequest } from '../../auth0'
jest.mock('../../db/play.ts')
jest.mock('../../auth0.ts')

afterAll(() => {
  jest.restoreAllMocks()
})

jest.mocked(checkJwt).mockImplementation(async (req: JwtRequest, res, next) => {
  req.auth = {
    sub: 'auth0|123',
  }
  next()
})

describe('GET /api/vi/play', () => {
  it('returns a random winning image', async () => {
    //ARANGE
    jest.mocked(db.getWinningImage).mockResolvedValue({
      id: 4,
      uploaderId: '2',
      name: "It's me",
      description: 'Can you buzz me in?',
      imageUrl: '/images/can-you-buzz-me-in.gif',
    })
    //ACT
    const response = await request(server).get('/api/v1/play')
    //ASSERT
    expect(response.body).toMatchInlineSnapshot(
      `
      {
        "description": "Can you buzz me in?",
        "id": 4,
        "imageUrl": "/images/can-you-buzz-me-in.gif",
        "name": "It's me",
        "uploaderId": "2",
      }
    `
    )
  })
  it('returns 500 when the database fails', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest
      .mocked(db.getWinningImage)
      .mockRejectedValue(new Error('database failed to GET'))
    const response = await request(server).get('/api/v1/play')
    expect(response.status).toBe(500)
    expect(response.body).not.toBe('database failed to GET')
    expect(response.body.error).toBe(
      'There was an error trying to get the image'
    )
  })
})
