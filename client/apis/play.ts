import request from 'superagent'
import { Image } from '../../models/image'

export async function getWinningImage(token: string): Promise<Image> {
  const response = await request
    .get('/api/v1/play')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
