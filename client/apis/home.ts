import request from 'superagent'
import { Image } from '../../models/image'

export async function getHomeImage(): Promise<Image> {
  const response = await request.get('/api/v1/home')
  return response.body
}
