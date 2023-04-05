import request from 'superagent'
import type { Image } from '../../models/image'

const url = '/api/v1/uploads'

export async function getUploads(token: string): Promise<Image[]> {
  const response = await request
    .get(url)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
