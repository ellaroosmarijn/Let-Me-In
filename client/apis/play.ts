import request from 'superagent'
import { Image } from '../../models/image'

export async function getWinningImage(): Promise<Image> {
  const response = await request.get('/api/v1/play')
  return response.body
}
